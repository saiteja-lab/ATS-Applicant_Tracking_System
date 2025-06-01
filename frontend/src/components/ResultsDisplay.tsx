import { useState } from 'react';
import { SkillsBarChart } from './charts/SkillsBarChart';
import { SkillsMatchPieChart } from './charts/SkillsMatchPieChart';
import { ScoreGauge } from './charts/ScoreGauge';
import { SkillsList } from './SkillsList';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

interface ResultsDisplayProps {
  results: {
    jd_skills: string[];
    matched_skills: string[];
    missing_skills: string[];
    resume_skills: string[];
    score: number;
  };
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Average Match';
    return 'Poor Match';
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Analysis Results</h2>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8">
          {/* Score Overview */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-lg font-medium text-gray-700">Your Resume Match Score</h3>
              <div className="mt-2 flex items-center justify-center md:justify-start">
                <span className={`text-5xl font-bold ${getScoreColor(results.score)}`}>
                  {results.score}%
                </span>
                <span className="ml-2 text-gray-500 text-lg">{getScoreText(results.score)}</span>
              </div>
              <p className="mt-2 text-gray-600 max-w-md">
                Based on the analysis of your resume and the job description, here's how well your skills match.
              </p>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-8 mb-12">
              <h3 className="text-lg font-medium text-gray-700">Score Gauge</h3>
              <div className="w-48 h-48">
                <ScoreGauge score={results.score} />
              </div>
            </div>

          </div>

          {/* Charts */}
          <div className="mt-8 grid md:grid-cols-2 gap-8 mb-12">
            <div className="h-64">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Skills Comparison</h3>
              <SkillsBarChart
                resumeSkills={results.resume_skills.length}
                jdSkills={results.jd_skills.length}
                matchedSkills={results.matched_skills.length}
              />
            </div>

            <div className="h-64">
              <h3 className="text-lg font-medium text-gray-700 mb-4 ml-64">Match Breakdown</h3>
              <SkillsMatchPieChart
                matched={results.matched_skills.length}
                missing={results.missing_skills.length}
              />
            </div>
          </div>

          {/* Toggle Button + Detailed Skills */}
          <div className="mt-8">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mt-6 flex items-center text-blue-600 hover:text-white border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              {showDetails ? (
                <>
                  <ArrowUpCircle className="w-5 h-5 mr-2" />
                  <span>Hide Detailed Skill Breakdown</span>
                </>
              ) : (
                <>
                  <ArrowDownCircle className="w-5 h-5 mr-2" />
                  <span>View Detailed Skill Breakdown</span>
                </>
              )}
            </button>

            {showDetails && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
                <SkillsList
                  title="Resume Skills"
                  skills={results.resume_skills}
                  color="bg-purple-100"
                  textColor="text-purple-800"
                />

                <SkillsList
                  title="JD Skills"
                  skills={results.jd_skills}
                  color="bg-blue-100"
                  textColor="text-blue-800"
                />

                <SkillsList
                  title="Matched Skills"
                  skills={results.matched_skills}
                  color="bg-green-100"
                  textColor="text-green-800"
                />

                <SkillsList
                  title="Missing Skills"
                  skills={results.missing_skills}
                  color="bg-red-100"
                  textColor="text-red-800"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
