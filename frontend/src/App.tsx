import { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { ResultsDisplay } from './components/ResultsDisplay';
import { InterviewResources } from './components/InterviewResources';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/Tabs';
import { Loader2 } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    jd_skills: string[];
    matched_skills: string[];
    missing_skills: string[];
    resume_skills: string[];
    score: number;
  } | null>(null);

  const handleAnalyze = async (resumeFile: File, jobDescFile: File) => {
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('job_description', jobDescFile);

    try {
      const response = await fetch('https://ats-wpgh.onrender.com/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Resume Match
          </h1>
          <p className="text-gray-600 mt-1">
            Analyze how well your resume matches the job description
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="analyzer" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="analyzer">Resume Analyzer</TabsTrigger>
            <TabsTrigger value="resources">Interview Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analyzer">
            {!results && !isLoading && (
              <FileUploader onAnalyze={handleAnalyze} />
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center p-12">
                <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
                <p className="mt-4 text-gray-600 text-lg">Analyzing your documents...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <h3 className="text-red-700 font-medium mb-2">Error</h3>
                <p className="text-red-600">{error}</p>
                <button 
                  onClick={() => setError(null)} 
                  className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {results && !isLoading && (
              <div className="space-y-8">
                <ResultsDisplay results={results} />
                <div className="flex justify-center">
                  <button
                    onClick={() => setResults(null)}
                    className="px-6 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                  >
                    Analyze Another Resume
                  </button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resources">
            <InterviewResources />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Resume Match. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;