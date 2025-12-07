import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

interface ClipRequest {
  viralMoments: Array<{
    startTime: number;
    endTime: number;
    score: number;
    reason: string;
    transcript: string;
    emotionType: string;
  }>;
  subtitleStyle: string;
  clipDuration: number;
}

interface GeneratedClip {
  id: string;
  startTime: number;
  endTime: number;
  duration: number;
  transcript: string;
  subtitles: Array<{
    text: string;
    startTime: number;
    endTime: number;
    isKeyword: boolean;
  }>;
  viralScore: number;
  emotionType: string;
  title: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const { viralMoments, subtitleStyle, clipDuration }: ClipRequest = await req.json();
    
    console.log('Generating clips from', viralMoments.length, 'viral moments');

    const clips: GeneratedClip[] = [];

    for (const moment of viralMoments) {
      // Generate optimized subtitles for each clip
      const subtitles = await generateSubtitles(moment.transcript, subtitleStyle);
      
      // Generate a catchy title for the clip
      const title = await generateClipTitle(moment.transcript, moment.emotionType);
      
      clips.push({
        id: crypto.randomUUID(),
        startTime: moment.startTime,
        endTime: Math.min(moment.endTime, moment.startTime + clipDuration),
        duration: Math.min(moment.endTime - moment.startTime, clipDuration),
        transcript: moment.transcript,
        subtitles,
        viralScore: moment.score,
        emotionType: moment.emotionType,
        title,
      });
    }

    // Sort by viral score
    clips.sort((a, b) => b.viralScore - a.viralScore);

    console.log('Generated', clips.length, 'clips');

    return new Response(
      JSON.stringify({
        success: true,
        clips,
        totalClips: clips.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in generate-clips:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function generateSubtitles(
  transcript: string,
  style: string
): Promise<Array<{ text: string; startTime: number; endTime: number; isKeyword: boolean }>> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert at creating viral TikTok/Shorts subtitles.
Style: ${style}

Break the transcript into short, punchy subtitle segments (2-5 words each).
Identify keywords that should be highlighted (emotional words, action words, surprising words).

Return a JSON array:
[{
  "text": "word or short phrase",
  "startTime": number (relative seconds),
  "endTime": number (relative seconds),
  "isKeyword": boolean (true if should be highlighted)
}]

Only return the JSON array.`
        },
        {
          role: 'user',
          content: transcript
        }
      ],
      temperature: 0.5,
    }),
  });

  if (!response.ok) {
    console.error('Failed to generate subtitles');
    // Return basic subtitles on error
    return [{
      text: transcript,
      startTime: 0,
      endTime: 5,
      isKeyword: false,
    }];
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  try {
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(content);
  } catch (e) {
    console.error('Failed to parse subtitles:', e);
    return [{
      text: transcript,
      startTime: 0,
      endTime: 5,
      isKeyword: false,
    }];
  }
}

async function generateClipTitle(transcript: string, emotionType: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Generate a short, catchy title (max 5 words) for a viral TikTok clip.
The clip has a ${emotionType} vibe.
Make it attention-grabbing and clickable.
Return only the title, no quotes.`
        },
        {
          role: 'user',
          content: transcript
        }
      ],
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    return 'Viral Clip';
  }

  const data = await response.json();
  return data.choices[0].message.content.trim().replace(/"/g, '');
}
