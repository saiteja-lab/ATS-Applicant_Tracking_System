import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Code, Brain } from 'lucide-react';

type ResourceType = 'tips' | 'questions' | 'brainteasers';

const jobTips = [
  {
    title: "Tailor Your Resume",
    content: "Customize your resume for each job application. Highlight relevant skills and experiences that match the job description."
  },
  {
    title: "Use Keywords",
    content: "Include industry-specific keywords from the job posting to help your resume pass through Applicant Tracking Systems (ATS)."
  },
  {
    title: "Quantify Achievements",
    content: "Use numbers and metrics to showcase your accomplishments. For example, 'Increased website traffic by 45%' is more impactful than 'Increased website traffic'."
  },
  {
    title: "Research the Company",
    content: "Before the interview, research the company's culture, values, products, and recent news to demonstrate your interest and preparation."
  },
  {
    title: "Prepare STAR Stories",
    content: "Develop stories using the STAR method (Situation, Task, Action, Result) to effectively answer behavioral questions."
  }
];

const interviewQuestions = [
  {
    category: "Technical Skills",
    questions: [
      "Explain the difference between REST and GraphQL APIs.",
      "What is the difference between let, const, and var in JavaScript?",
      "Explain how React's virtual DOM works.",
      "What are closures in JavaScript?",
      "Describe the box model in CSS."
    ]
  },
  {
    category: "Problem-Solving",
    questions: [
      "How would you optimize a website's performance?",
      "Describe a challenging technical problem you've solved recently.",
      "How do you approach debugging a complex issue?",
      "Explain how you would implement a caching system.",
      "How would you design a URL shortening service?"
    ]
  },
  {
    category: "Behavioral",
    questions: [
      "Tell me about a time you had to meet a tight deadline.",
      "Describe a situation where you had to work with a difficult team member.",
      "How do you handle criticism of your work?",
      "Give an example of how you've dealt with a major setback.",
      "Describe a project you're particularly proud of and why."
    ]
  }
];

const brainTeasers = [
  {
    question: "You have 9 balls, all identical in appearance, but one is slightly heavier than the others. Using a balance scale, how can you identify the heavier ball with only two weighings?",
    answer: "Divide the balls into 3 groups of 3. Weigh 2 groups against each other. If they balance, the heavy ball is in the third group. If not, it's in the heavier group. Then weigh 2 balls from the identified group. If they balance, the third ball is the heavy one. If not, the heavier one on the scale is the answer."
  },
  {
    question: "You have a 3-gallon jug and a 5-gallon jug. How can you measure exactly 4 gallons of water?",
    answer: "Fill the 5-gallon jug. Pour from it into the 3-gallon jug until the 3-gallon jug is full. This leaves 2 gallons in the 5-gallon jug. Empty the 3-gallon jug. Pour the 2 gallons from the 5-gallon jug into the 3-gallon jug. Fill the 5-gallon jug again and pour 1 more gallon into the 3-gallon jug (until it's full). That leaves exactly 4 gallons in the 5-gallon jug."
  },
  {
    question: "If you have a cake and need to cut it into 8 equal pieces, how many straight-line cuts do you need to make?",
    answer: "You need 3 cuts. Cut the cake into 4 equal pieces with 2 perpendicular cuts through the center. Then stack all 4 pieces and make 1 horizontal cut through the middle, giving you 8 equal pieces."
  },
  {
    question: "A farmer needs to cross a river with a fox, a chicken, and a bag of grain. The boat can only hold the farmer and one other item. The fox cannot be left alone with the chicken, and the chicken cannot be left alone with the grain. How does the farmer get everything across?",
    answer: "First, the farmer takes the chicken across and returns alone. Second, the farmer takes the fox across and brings the chicken back. Third, the farmer takes the grain across and returns alone. Finally, the farmer takes the chicken across. This way, the fox and chicken, or the chicken and grain, are never left alone together."
  }
];

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function CollapsibleSection({ title, icon, children }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden mb-6">
      <button
        className="w-full flex items-center justify-between p-4 bg-gray-50 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {icon}
          <h3 className="text-lg font-medium text-gray-800 ml-2">{title}</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      
      {isOpen && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
}

export function InterviewResources() {
  const [selectedType, setSelectedType] = useState<ResourceType>('tips');
  const [revealedAnswers, setRevealedAnswers] = useState<{ [key: number]: boolean }>({});

  const toggleAnswer = (index: number) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Interview Resources</h2>
      
      <div className="flex space-x-2 mb-6 border-b pb-4">
        <button
          onClick={() => setSelectedType('tips')}
          className={`px-4 py-2 rounded-md transition-colors ${
            selectedType === 'tips'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Job Tips
        </button>
        <button
          onClick={() => setSelectedType('questions')}
          className={`px-4 py-2 rounded-md transition-colors ${
            selectedType === 'questions'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Interview Questions
        </button>
        <button
          onClick={() => setSelectedType('brainteasers')}
          className={`px-4 py-2 rounded-md transition-colors ${
            selectedType === 'brainteasers'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Brain Teasers
        </button>
      </div>
      
      {selectedType === 'tips' && (
        <div className="space-y-4">
          {jobTips.map((tip, index) => (
            <div key={index} className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">{tip.title}</h3>
              <p className="text-gray-700">{tip.content}</p>
            </div>
          ))}
        </div>
      )}
      
      {selectedType === 'questions' && (
        <div>
          {interviewQuestions.map((category, index) => (
            <CollapsibleSection 
              key={index} 
              title={category.category} 
              icon={category.category === "Technical Skills" ? (
                <Code className="h-5 w-5 text-indigo-500" />
              ) : (
                <BookOpen className="h-5 w-5 text-indigo-500" />
              )}
            >
              <ul className="space-y-3">
                {category.questions.map((question, qIndex) => (
                  <li key={qIndex} className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-800">{question}</p>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          ))}
        </div>
      )}
      
      {selectedType === 'brainteasers' && (
        <div className="space-y-6">
          {brainTeasers.map((teaser, index) => (
            <div key={index} className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-start">
                <Brain className="h-5 w-5 text-purple-600 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">{teaser.question}</h3>
                  
                  {revealedAnswers[index] ? (
                    <div className="mt-3 bg-white p-3 rounded border border-purple-200">
                      <p className="text-gray-700">{teaser.answer}</p>
                    </div>
                  ) : null}
                  
                  <button
                    onClick={() => toggleAnswer(index)}
                    className="mt-3 text-purple-600 hover:text-purple-800 text-sm font-medium"
                  >
                    {revealedAnswers[index] ? 'Hide Answer' : 'Show Answer'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}