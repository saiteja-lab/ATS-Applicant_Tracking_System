import { useState } from 'react';
import { FileUp, File as FileIcon, X } from 'lucide-react';

interface FileUploaderProps {
  onAnalyze: (resumeFile: File, jobDescFile: File) => void;
}

export function FileUploader({ onAnalyze }: FileUploaderProps) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescFile, setJobDescFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent, type: string | null) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(type);
    } else if (e.type === "dragleave") {
      setDragActive(null);
    }
  };

  const handleDrop = (e: React.DragEvent, type: 'resume' | 'jobDesc') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], type);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'jobDesc') => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0], type);
    }
  };

  const handleFile = (file: File, type: 'resume' | 'jobDesc') => {
    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];
    
    if (!validTypes.includes(file.type)) {
      alert(`Invalid file type. Please upload a PDF or Word document.`);
      return;
    }

    if (type === 'resume') {
      setResumeFile(file);
    } else {
      setJobDescFile(file);
    }
  };

  const removeFile = (type: 'resume' | 'jobDesc') => {
    if (type === 'resume') {
      setResumeFile(null);
    } else {
      setJobDescFile(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resumeFile && jobDescFile) {
      onAnalyze(resumeFile, jobDescFile);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Upload Your Documents</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Resume Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Resume
            </label>
            {!resumeFile ? (
              <div 
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  dragActive === 'resume' 
                    ? 'border-blue-400 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                }`}
                onDragEnter={(e) => handleDrag(e, 'resume')}
                onDragLeave={(e) => handleDrag(e, null)}
                onDragOver={(e) => handleDrag(e, 'resume')}
                onDrop={(e) => handleDrop(e, 'resume')}
                onClick={() => document.getElementById('resume-upload')?.click()}
              >
                <FileUp className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 text-center">
                  <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">PDF or Word documents</p>
                <input
                  id="resume-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.doc"
                  onChange={(e) => handleFileChange(e, 'resume')}
                />
              </div>
            ) : (
              <div className="border rounded-lg p-4 bg-blue-50 flex items-center justify-between">
                <div className="flex items-center">
                  <FileIcon className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-700 truncate max-w-xs">
                    {resumeFile.name}
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={() => removeFile('resume')}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Job Description Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description
            </label>
            {!jobDescFile ? (
              <div 
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  dragActive === 'jobDesc' 
                    ? 'border-blue-400 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                }`}
                onDragEnter={(e) => handleDrag(e, 'jobDesc')}
                onDragLeave={(e) => handleDrag(e, null)}
                onDragOver={(e) => handleDrag(e, 'jobDesc')}
                onDrop={(e) => handleDrop(e, 'jobDesc')}
                onClick={() => document.getElementById('jobdesc-upload')?.click()}
              >
                <FileUp className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 text-center">
                  <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">PDF or Word documents</p>
                <input
                  id="jobdesc-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.doc"
                  onChange={(e) => handleFileChange(e, 'jobDesc')}
                />
              </div>
            ) : (
              <div className="border rounded-lg p-4 bg-blue-50 flex items-center justify-between">
                <div className="flex items-center">
                  <FileIcon className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-700 truncate max-w-xs">
                    {jobDescFile.name}
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={() => removeFile('jobDesc')}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={!resumeFile || !jobDescFile}
            className={`px-8 py-3 rounded-lg font-medium transition-all ${
              resumeFile && jobDescFile
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Analyze Match
          </button>
        </div>
      </form>
    </div>
  );
}