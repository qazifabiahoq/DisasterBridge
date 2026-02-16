import { useState } from 'react';
import { EmergencyForm } from './components/EmergencyForm';
import { ResponseDisplay } from './components/ResponseDisplay';

interface EmergencyFormData {
  location: string;
  emergencyType: string;
  description: string;
  peopleAffected: string;
  injuriesPresent: boolean;
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: EmergencyFormData) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await fetch('http://localhost:3001/api/triage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setAnalysis(data.analysis);
      } else {
        setError(data.error || 'An error occurred processing your request.');
      }
    } catch (err) {
      setError('Unable to connect to emergency coordination system. Please ensure the server is running.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadExample = () => {
    const exampleData: EmergencyFormData = {
      location: '450 Industrial Park Rd, Hamilton, ON',
      emergencyType: 'Fire',
      description: 'Large warehouse fire with heavy smoke visible from multiple blocks. Fire started in the southeast corner and is spreading rapidly. Multiple propane tanks stored on premises. Building is approximately 50,000 sq ft. Some employees may still be inside.',
      peopleAffected: '25',
      injuriesPresent: true,
    };
    handleSubmit(exampleData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3">
            DisasterBridge
          </h1>
          <p className="text-xl text-blue-100">
            AI-Powered Emergency Coordination
          </p>
        </header>

        <main>
          <EmergencyForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onLoadExample={loadExample}
          />

          {isLoading && (
            <div className="text-center mt-8">
              <div className="inline-block bg-white px-8 py-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-900"></div>
                  <p className="text-gray-900 font-semibold">
                    AI is analyzing your emergency report...
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-8 w-full max-w-3xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="text-red-800 font-semibold">Error</p>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          {analysis && <ResponseDisplay analysis={analysis} />}
        </main>

        <footer className="text-center mt-16 text-blue-200 text-sm">
          <p>Emergency Coordination System - For Authorized Personnel Only</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
