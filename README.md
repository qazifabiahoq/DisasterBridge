# DisasterBridge

AI-Powered Emergency Coordination System

A professional emergency management platform that uses AI to analyze and triage emergency incidents, providing rapid coordination guidance for first responders and emergency management personnel.

## Setup

### Prerequisites

- Node.js 18+ installed
- Amazon Nova API key

### Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Add your Nova API key to the `.env` file:
   ```
   NOVA_API_KEY=your_actual_key_here
   PORT=3001
   ```

### Installation

Install all dependencies:
```bash
npm install
```

## Running the Application

This application requires both a backend server and frontend to run simultaneously.

### Terminal 1 - Start the Backend Server

```bash
npm run server
```

The backend API will start on `http://localhost:3001`

### Terminal 2 - Start the Frontend

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Usage

1. Open your browser to the frontend URL
2. Fill out the emergency report form with incident details
3. Click "Request Emergency Coordination" to analyze the incident
4. Review the AI-generated triage report with:
   - Incident classification
   - Severity level
   - Response urgency
   - Recommended resources
   - Immediate guidance
   - Coordination notes

## Try the Demo

Click the "Try Example Incident" button to load a sample warehouse fire scenario and see the system in action.

## System Architecture

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express
- **AI Engine**: Amazon Nova via OpenAI SDK
- **Design**: Professional emergency management interface (no emojis, serious tone)

## Production Build

```bash
npm run build
```

## API Endpoints

- `POST /api/triage` - Submit emergency report for AI analysis
- `GET /api/health` - Check server status
