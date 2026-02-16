import { CheckCircle } from 'lucide-react';

interface ResponseDisplayProps {
  analysis: string;
}

export function ResponseDisplay({ analysis }: ResponseDisplayProps) {
  const parseAnalysis = (text: string) => {
    const sections = [
      'INCIDENT CLASSIFICATION',
      'SEVERITY LEVEL',
      'RESPONSE URGENCY',
      'RECOMMENDED RESOURCES',
      'SITUATION BRIEF',
      'IMMEDIATE GUIDANCE',
      'COORDINATION NOTES'
    ];

    const parsed: Record<string, string> = {};

    sections.forEach((section, index) => {
      const sectionPattern = new RegExp(`${section}[:\\s]*([\\s\\S]*?)(?=${sections[index + 1]}|$)`, 'i');
      const match = text.match(sectionPattern);
      if (match) {
        parsed[section] = match[1].trim();
      }
    });

    return parsed;
  };

  const sections = parseAnalysis(analysis);

  const getSeverityColor = (severity: string) => {
    const lower = severity.toLowerCase();
    if (lower.includes('critical') || lower.includes('high')) {
      return 'text-red-600 font-bold';
    } else if (lower.includes('medium')) {
      return 'text-orange-600 font-semibold';
    }
    return 'text-blue-600 font-semibold';
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-blue-900 text-white px-6 py-4 flex items-center space-x-3">
          <CheckCircle className="w-6 h-6" />
          <h2 className="text-xl font-bold">Emergency Analysis Complete</h2>
        </div>

        <div className="p-6 space-y-6">
          {Object.keys(sections).length > 0 ? (
            <>
              {sections['INCIDENT CLASSIFICATION'] && (
                <Section
                  title="INCIDENT CLASSIFICATION"
                  content={sections['INCIDENT CLASSIFICATION']}
                />
              )}

              {sections['SEVERITY LEVEL'] && (
                <Section
                  title="SEVERITY LEVEL"
                  content={sections['SEVERITY LEVEL']}
                  customClass={getSeverityColor(sections['SEVERITY LEVEL'])}
                />
              )}

              {sections['RESPONSE URGENCY'] && (
                <Section
                  title="RESPONSE URGENCY"
                  content={sections['RESPONSE URGENCY']}
                  customClass="text-red-600 font-bold"
                />
              )}

              {sections['RECOMMENDED RESOURCES'] && (
                <Section
                  title="RECOMMENDED RESOURCES"
                  content={sections['RECOMMENDED RESOURCES']}
                />
              )}

              {sections['SITUATION BRIEF'] && (
                <Section
                  title="SITUATION BRIEF"
                  content={sections['SITUATION BRIEF']}
                />
              )}

              {sections['IMMEDIATE GUIDANCE'] && (
                <Section
                  title="IMMEDIATE GUIDANCE"
                  content={sections['IMMEDIATE GUIDANCE']}
                />
              )}

              {sections['COORDINATION NOTES'] && (
                <Section
                  title="COORDINATION NOTES"
                  content={sections['COORDINATION NOTES']}
                />
              )}
            </>
          ) : (
            <div className="prose max-w-none text-gray-900">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {analysis}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  content: string;
  customClass?: string;
}

function Section({ title, content, customClass }: SectionProps) {
  return (
    <div className="border-l-4 border-blue-900 pl-4">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
        {title}
      </h3>
      <div className={`text-gray-900 leading-relaxed ${customClass || ''}`}>
        {content.split('\n').map((line, i) => (
          <p key={i} className="mb-1">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
