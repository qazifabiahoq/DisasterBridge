# DisasterBridge
### AI-Powered Emergency Coordination for Operators and Coordinators

Live Demo: https://disaster-bridge-git-main-qazi-fabia-hoqs-projects.vercel.app


---

## The Problem

When a disaster hits, the people managing the response are often overwhelmed before the first hour is over.

A community emergency coordinator gets 30 incident reports at once and has three volunteers to deploy. A relief organization field officer arrives at a flood site with no background on what happened. A municipal emergency management office is fielding calls faster than staff can process them. A hospital intake coordinator needs to understand the severity of an incoming mass casualty situation in seconds.

These people are not untrained. But they are under-resourced, under pressure, and making decisions that affect lives with incomplete information.

The real problem is not the absence of people. It is the absence of a system that can rapidly process an unstructured incident report and turn it into actionable coordination guidance. That work currently takes training, experience, and time that coordinators do not always have.

DisasterBridge is that system.

---

## Who This Is For

DisasterBridge is built for the people who manage emergencies, not just the people caught in them.

- Emergency coordinators receiving multiple incident reports and needing rapid triage
- Community disaster response teams with limited trained staff
- Municipal emergency management offices handling high-volume incidents
- Non-profit relief organizations deploying volunteers across active situations
- Hospital intake coordinators receiving incoming emergency referrals
- Field supervisors who need a structured assessment before committing resources

---

## How It Works

A coordinator submits an incident report through the web form. They enter the location, type of emergency, description of what is happening, number of people affected, and whether injuries are present.

DisasterBridge sends that report to an Amazon Nova AI agent, which analyzes the situation in real time, searches the web for live local information, and returns a full structured coordination assessment within seconds.

The coordinator immediately knows the severity level, which agencies and assets are needed, what the on-ground team should do right now, and what the broader response team needs to prepare for. No guessing. No waiting for a senior officer to be reached by phone.

---

## The AI Agent

DisasterBridge runs on a custom agent built on the Amazon Nova 2 Lite reasoning model, configured and published through the Amazon Nova Agent Platform on AWS.

Nova 2 Lite is Amazon's fast, cost-effective reasoning model. The agent is given a strict professional system configuration that makes it behave like a trained emergency coordinator rather than a general AI assistant. It never guesses out loud, never shows uncertainty, and produces clean structured output every time.

Web search is enabled on the agent, meaning it pulls live real-world data into every response. When a gas leak is reported in Toronto, it finds the actual Enbridge emergency line. When a cardiac event is reported, it returns current EMS protocols. This is not static knowledge. It is live reasoning with real information.

Every response follows the format used by professional emergency management systems:

- Incident Classification
- Severity Level (1 to 5 with justification)
- Response Urgency
- Recommended Resources
- Situation Brief
- Immediate Guidance
- Coordination Notes

---

## Technical Components

**AI Layer**
- Amazon Nova 2 Lite accessed via the Amazon Nova Agent Platform
- Custom agent with professional emergency coordination system instructions
- Web search tool enabled for live data retrieval
- Integrated via Nova API at api.nova.amazon.com/v1 using the OpenAI-compatible SDK

**Frontend**
- React with TypeScript
- Tailwind CSS
- Vite build system
- Deployed on Vercel with automatic GitHub deployment

**Backend**
- Node.js with Express
- POST /api/triage endpoint formats form data into a structured emergency report before calling the Nova agent
- Deployed on Render as a persistent Node.js web service

**Security**
- Nova API key stored as a server-side environment variable on Render
- Never exposed to the browser or committed to the repository

---

## Deployment Architecture

The frontend is a React application on Vercel. It handles the form interface and displays the AI response.

The backend is a Node.js Express server on Render. It receives form submissions from the frontend, constructs a natural language emergency report, calls the Amazon Nova agent, and returns the structured triage response.

This architecture keeps the API key secure on the server side and allows the frontend to remain a fast, lightweight deployment.

---

## Built With Amazon Nova

All AI functionality runs exclusively through Amazon Nova foundation models via AWS. No other AI providers are used anywhere in the system.
