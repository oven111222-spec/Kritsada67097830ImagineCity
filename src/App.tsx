import { useState } from 'react';
import { QuizOutcome, TrackId } from './data/imagineCityData';
import { ExplorerPassData, ExplorerPassGate } from './components/ExplorerPassGate';
import { LandingSections } from './components/LandingSections';
import { Navbar } from './components/Navbar';
import { ResultView } from './components/ResultView';
import { StoryQuizView } from './components/StoryQuizView';

type AppView = 'LANDING' | 'QUIZ' | 'PASS_GATE' | 'RESULT';

export default function App() {
  const [view, setView] = useState<AppView>('LANDING');
  const [preferredCompanion, setPreferredCompanion] = useState<TrackId | undefined>(
    undefined
  );
  const [quizOutcome, setQuizOutcome] = useState<QuizOutcome | null>(null);
  const [passData, setPassData] = useState<ExplorerPassData>({
    submitted: false,
    nickname: 'นักเดินทางแห่งแสงสี',
    gradeLevel: 'ม.5',
    studyPlan: '',
    province: '',
    discoveryChannel: '',
    decisionFactors: [],
    decisionStage: '',
    creativeExperience: '',
    contactChannel: 'LINE',
    contactValue: '',
  });
  const [quizSessionKey, setQuizSessionKey] = useState<number>(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuiz = (companion?: TrackId) => {
    setPreferredCompanion(companion);
    setQuizOutcome(null);
    setQuizSessionKey((prev) => prev + 1);
    setView('QUIZ');
    scrollToTop();
  };

  const handleQuizComplete = (outcome: QuizOutcome) => {
    setQuizOutcome(outcome);
    setView('PASS_GATE');
    scrollToTop();
  };

  const handlePassComplete = (data: ExplorerPassData) => {
    setPassData(data);
    setView('RESULT');
    scrollToTop();
  };

  const handleGoHome = () => {
    setView('LANDING');
    scrollToTop();
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col">
      <Navbar
        onStartQuiz={() => handleStartQuiz()}
        onGoHome={handleGoHome}
        isQuizActive={view !== 'LANDING'}
      />

      <div className="flex-1">
        {view === 'LANDING' && (
          <LandingSections onStartQuiz={handleStartQuiz} />
        )}

        {view === 'QUIZ' && (
          <StoryQuizView
            key={quizSessionKey}
            initialCompanion={preferredCompanion}
            onComplete={handleQuizComplete}
            onExit={handleGoHome}
          />
        )}

        {view === 'PASS_GATE' && quizOutcome && (
          <ExplorerPassGate
            outcome={quizOutcome}
            onCompletePass={handlePassComplete}
          />
        )}

        {view === 'RESULT' && quizOutcome && (
          <ResultView
            outcome={quizOutcome}
            passData={passData}
            onRestart={() => handleStartQuiz(preferredCompanion)}
            onGoHome={handleGoHome}
          />
        )}
      </div>
    </div>
  );
}
