import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  baseURL: 'https://api.nova.amazon.com/v1',
  apiKey: process.env.NOVA_API_KEY
});

async function triage(emergencyReport) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{
        role: "user",
        content: emergencyReport
      }],
      model: "AGENT-8eb8daa4d9564b959fde0193c9539c75",
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Nova API:', error);
    throw error;
  }
}

app.post('/api/triage', async (req, res) => {
  try {
    const { location, emergencyType, description, peopleAffected, injuriesPresent } = req.body;

    const emergencyReport = `
EMERGENCY REPORT

Location: ${location}
Emergency Type: ${emergencyType}
Description: ${description}
Number of People Affected: ${peopleAffected || 'Unknown'}
Injuries Present: ${injuriesPresent ? 'Yes' : 'No'}

Please analyze this emergency situation and provide:
1. Incident Classification
2. Severity Level (Critical/High/Medium/Low)
3. Response Urgency (Immediate/Urgent/Standard)
4. Recommended Resources (specific emergency services and equipment needed)
5. Situation Brief (concise summary)
6. Immediate Guidance (specific actions for first responders)
7. Coordination Notes (inter-agency coordination requirements)

Format your response with clear section headers for emergency personnel.
    `.trim();

    const response = await triage(emergencyReport);

    res.json({
      success: true,
      analysis: response
    });
  } catch (error) {
    console.error('Triage error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process emergency report. Please try again.'
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'operational', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`DisasterBridge server running on port ${PORT}`);
});
