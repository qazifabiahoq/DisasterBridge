import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface EmergencyFormData {
  location: string;
  emergencyType: string;
  description: string;
  peopleAffected: string;
  injuriesPresent: boolean;
}

interface EmergencyFormProps {
  onSubmit: (data: EmergencyFormData) => void;
  isLoading: boolean;
  onLoadExample: () => void;
}

export function EmergencyForm({ onSubmit, isLoading, onLoadExample }: EmergencyFormProps) {
  const [formData, setFormData] = useState<EmergencyFormData>({
    location: '',
    emergencyType: '',
    description: '',
    peopleAffected: '',
    injuriesPresent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <div className="mb-6">
          <label htmlFor="location" className="block text-sm font-semibold text-gray-900 mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="123 Main St, Toronto"
            required
            disabled={isLoading}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="emergencyType" className="block text-sm font-semibold text-gray-900 mb-2">
            Emergency Type
          </label>
          <select
            id="emergencyType"
            name="emergencyType"
            value={formData.emergencyType}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Select emergency type</option>
            <option value="Fire">Fire</option>
            <option value="Medical Emergency">Medical Emergency</option>
            <option value="Flooding">Flooding</option>
            <option value="Structural Collapse">Structural Collapse</option>
            <option value="Gas Leak">Gas Leak</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the situation in detail..."
            required
            rows={5}
            disabled={isLoading}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent text-gray-900 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="peopleAffected" className="block text-sm font-semibold text-gray-900 mb-2">
            Number of People Affected
          </label>
          <input
            type="number"
            id="peopleAffected"
            name="peopleAffected"
            value={formData.peopleAffected}
            onChange={handleChange}
            placeholder="0"
            min="0"
            disabled={isLoading}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div className="mb-8">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="injuriesPresent"
              checked={formData.injuriesPresent}
              onChange={handleChange}
              disabled={isLoading}
              className="w-5 h-5 text-blue-900 border-gray-300 rounded focus:ring-2 focus:ring-blue-900 disabled:cursor-not-allowed"
            />
            <span className="text-sm font-semibold text-gray-900">
              Injuries Present
            </span>
          </label>
        </div>

        <div className="space-y-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-900 text-white font-bold py-4 px-6 rounded-md hover:bg-blue-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-lg"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5" />
                <span>Request Emergency Coordination</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onLoadExample}
            disabled={isLoading}
            className="w-full bg-white text-blue-900 font-semibold py-3 px-6 rounded-md border-2 border-blue-900 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Try Example Incident
          </button>
        </div>
      </form>
    </div>
  );
}
