import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

interface AnalysisRequest {
  videoUrl: string;
  transcription?: string;
}

interface ViralMoment {
  startTime: number;
  endTime: number;
  score: number;
  reason: string;
  transcript: string;
  emotionType: 'hype' | 'humor' | 'informative' | 'emotional' | 'debate';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const { videoUrl, transcription }: AnalysisRequest = await req.json();
    console.log('Analyzing video:', videoUrl);

    // For demo purposes, we'll use a mock transcription if not provided
    // In production, you'd extract audio and use Whisper API
    const transcript = transcription || await generateMockTranscription();
    
    console.log('Transcript received, analyzing for viral moments...');

    // Analyze transcript for viral moments using GPT
    const viralMoments = await detectViralMoments(transcript);
    
    console.log('Found viral moments:', viralMoments.length);

    return new Response(
      JSON.stringify({
        success: true,
        transcript,
        viralMoments,
        clipCount: viralMoments.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in analyze-video:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function detectViralMoments(transcript: string): Promise<ViralMoment[]> {
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
          content: `You are an expert at identifying viral-worthy moments in video transcripts.
Analyze the transcript and identify 3-5 moments that would make great short-form clips for TikTok/Shorts.

For each moment, look for:
- Emotional peaks and reactions
- Punchlines and humor
- Debates or strong opinions  
- Surprising information
- Quotable statements

Return a JSON array with this structure:
[{
  "startTime": number (seconds),
  "endTime": number (seconds),
  "score": number (1-100 viral potential),
  "reason": "brief explanation why this is viral-worthy",
  "transcript": "the exact text of this moment",
  "emotionType": "hype" | "humor" | "informative" | "emotional" | "debate"
}]

Only return the JSON array, no other text.`
        },
        {
          role: 'user',
          content: `Analyze this transcript for viral moments:\n\n${transcript}`
        }
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI API error:', errorText);
    throw new Error('Failed to analyze transcript');
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  try {
    // Parse the JSON response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(content);
  } catch (e) {
    console.error('Failed to parse viral moments:', e);
    return [];
  }
}

async function generateMockTranscription(): Promise<string> {
  // Mock transcription for demo purposes
  return `[00:00] Hey guys, welcome back to the channel!
[00:05] Today we're going to talk about something absolutely INSANE.
[00:12] So you know how everyone's been saying AI is going to take over? Well...
[00:18] I actually tested this and the results are CRAZY.
[00:25] Like seriously, I couldn't believe what happened next.
[00:32] So here's the thing - when you use AI for video editing...
[00:40] It literally saves you like 10 hours of work. No joke!
[00:48] And the best part? It's completely free to try.
[00:55] But wait, there's more - and this is where it gets really interesting.
[01:02] I showed this to my friend and he was like "No way, that's impossible!"
[01:10] And I said "Dude, just watch this" and his mind was BLOWN.
[01:18] The future is here guys, and it's absolutely wild.
[01:25] If you're not using this yet, you're literally leaving money on the table.
[01:33] Anyway, let me know in the comments what you think!
[01:40] And don't forget to smash that like button and subscribe!`;
}
