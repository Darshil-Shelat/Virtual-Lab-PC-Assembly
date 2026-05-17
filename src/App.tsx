import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Power, Cpu, MemoryStick, Video, LayoutDashboard, RotateCcw, CheckCircle2, AlertCircle, Volume2, VolumeX, X } from 'lucide-react';

type PartId = 'psu' | 'motherboard' | 'cpu' | 'ram' | 'gpu';

interface Part {
  id: PartId;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface Step {
  id: PartId;
  instruction: string;
  hint: string;
}

const PARTS: Record<PartId, Part> = {
  psu: { id: 'psu', name: 'PSU', icon: <Power size={28} />, description: 'Power Supply Unit. Converts electrical power from an outlet into usable power for the internal components of the computer.' },
  motherboard: { id: 'motherboard', name: 'Motherboard', icon: <LayoutDashboard size={28} />, description: 'The main circuit board that holds the CPU, RAM, and other components, allowing them to communicate with each other.' },
  cpu: { id: 'cpu', name: 'CPU', icon: <Cpu size={28} />, description: 'Central Processing Unit. The primary component that acts as the "brain" of the computer, performing most of the processing.' },
  ram: { id: 'ram', name: 'RAM', icon: <MemoryStick size={28} />, description: 'Random Access Memory. Provides high-speed temporary workspace so the CPU can store data that is actively being used.' },
  gpu: { id: 'gpu', name: 'GPU', icon: <Video size={28} />, description: 'Graphics Processing Unit. Dedicated to accelerating the creation of 2D and 3D images and video.' },
};

const STEPS: Step[] = [
  { id: 'psu', instruction: 'Start by installing the Power Supply Unit (PSU).', hint: 'PSU provides power. Its position is in the large compartment at the bottom.' },
  { id: 'motherboard', instruction: 'Next, install the Motherboard into the case.', hint: 'The motherboard is the main circuit board. It takes up the most space.' },
  { id: 'cpu', instruction: 'Now, insert the CPU into the motherboard socket.', hint: 'The brain of the computer. Its position is in the small square socket in the middle.' },
  { id: 'ram', instruction: 'Install RAM into the memory slot.', hint: 'Temporary memory. Look for the long vertical slots next to the CPU.' },
  { id: 'gpu', instruction: 'Finally, install the Graphics Card (GPU).', hint: 'Processes visuals. Its position is in the long horizontal PCIe slot below the CPU.' },
];

const AUDIO_TEXT: Record<string, string> = {
  step_0: "First step, install the Power Supply or PSU to the bottom compartment.",
  step_1: "Next, install the Motherboard into the main case.",
  step_2: "Now, install the CPU into the square socket in the center of the Motherboard.",
  step_3: "Next, install the RAM into the long vertical memory slots.",
  step_4: "Finally, install the graphics card or GPU into the long slot below the CPU.",
  complete: "Good job! The computer assembly has been successfully completed.",
  error_sequence: "Wrong component. Pay attention to the assembly sequence instructions.",
  error_location: "Inaccurate location. Ensure you put it in the correct position."
};

const QUESTIONS = [
  { q: "Which component is considered the 'brain' of the computer?", options: ["Power Supply (PSU)", "Motherboard", "Central Processing Unit (CPU)", "Graphics Card (GPU)"], answer: 2 },
  { q: "Where do you temporarily store data actively used by the CPU?", options: ["Hard Drive", "RAM", "GPU", "Motherboard"], answer: 1 },
  { q: "Which component acts as the main communication hub for all other parts?", options: ["CPU", "Motherboard", "PSU", "RAM"], answer: 1 },
  { q: "What is the main function of the PSU?", options: ["Processing graphics", "Storing data permanently", "Cooling the system", "Providing power to components"], answer: 3 },
];

type Scene = 'home' | 'theory' | 'simulation' | 'quiz';

function CreatedVideo() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-slate-950 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#06b6d4_1px,transparent_0)]" style={{ backgroundSize: '30px 30px', opacity: 0.1 }}></div>
      
      <div className="z-10 relative flex flex-col items-center justify-center w-full max-w-sm aspect-square bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl">
        <div className="absolute top-3 left-4 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-[10px] uppercase font-mono text-slate-500 tracking-widest">A.I. Generated Demo</span>
        </div>
        
        {/* Motherboard Base */}
        <motion.div
          animate={{ scale: [0.95, 1, 1], opacity: [0, 1, 1] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.1, 1] }}
          className="w-48 h-64 border-2 border-slate-600 rounded-md relative flex flex-col justify-center items-center bg-slate-800"
        >
          {/* CPU Socket */}
          <div className="w-16 h-16 border-2 border-slate-700/50 rounded flex items-center justify-center mb-4">
             {/* CPU dropping in */}
             <motion.div 
               animate={{ y: [-50, 0, 0], opacity: [0, 1, 1] }}
               transition={{ duration: 6, repeat: Infinity, times: [0, 0.2, 1], delay: 1 }}
               className="w-12 h-12 bg-slate-200 border-2 border-slate-400 rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.5)] z-20"
             >
               <Cpu size={24} className="text-slate-900" />
             </motion.div>
          </div>
          
          {/* RAM Slots */}
          <div className="flex gap-2 mb-6">
            <div className="w-2 h-24 border border-slate-700/50 rounded-sm overflow-hidden relative">
              <motion.div
                animate={{ y: [-100, 0, 0], opacity: [0, 1, 1] }}
                transition={{ duration: 6, repeat: Infinity, times: [0, 0.2, 1], delay: 2 }}
                className="w-full h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
              ></motion.div>
            </div>
            <div className="w-2 h-24 border border-slate-700/50 rounded-sm overflow-hidden relative">
              <motion.div
                animate={{ y: [-100, 0, 0], opacity: [0, 1, 1] }}
                transition={{ duration: 6, repeat: Infinity, times: [0, 0.2, 1], delay: 2.2 }}
                className="w-full h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
              ></motion.div>
            </div>
          </div>
          
          {/* GPU Slot */}
          <div className="w-32 h-4 border border-slate-700/50 rounded-sm relative overflow-visible">
            <motion.div
              animate={{ x: [-100, 0, 0], opacity: [0, 1, 1] }}
              transition={{ duration: 6, repeat: Infinity, times: [0, 0.2, 1], delay: 3 }}
              className="absolute inset-y-0 -left-4 w-40 h-8 bg-slate-700 border border-slate-500 rounded flex items-center justify-center shadow-lg z-30"
            >
              <Video size={16} className="text-cyan-400" />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Playback Controls Fake */}
      <div className="absolute bottom-4 left-0 w-full px-8 flex flex-col gap-2 z-20">
        <motion.div 
          animate={{ width: ['0%', '100%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="h-1 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
        ></motion.div>
        <div className="flex justify-between items-center text-xs font-mono text-slate-500">
          <span>0:00</span>
          <span>AUTOPLAY_SEQ</span>
          <span>0:06</span>
        </div>
      </div>
    </div>
  );
}

function HomeScene({ onStart }: { onStart: (s: Scene) => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center relative bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#020617_100%)] p-4 md:p-8 w-full h-full overflow-y-auto">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 fixed" style={{ backgroundImage: 'radial-gradient(#06b6d4 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="z-10 text-center max-w-4xl bg-slate-900/40 border border-cyan-500/30 p-6 md:p-12 rounded-2xl backdrop-blur-md shadow-[0_0_50px_rgba(6,182,212,0.1)] w-full my-8">
        <Cpu size={64} className="text-cyan-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-widest uppercase text-white mb-4">Virtual Lab <span className="text-cyan-400">PC Assembly</span></h1>
        <p className="text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto">Welcome to the advanced simulation environment. Here you will learn the theoretical concepts and practical skills necessary to assemble a modern computer system.</p>
        
        <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden border border-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.15)] bg-slate-950 flex items-center justify-center">
          <CreatedVideo />
        </div>

        <button onClick={() => onStart('theory')} className="px-8 py-3 bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold uppercase tracking-widest hover:bg-cyan-500/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all rounded">Start System</button>
      </div>
    </div>
  );
}

function TheoryScene() {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-8 relative bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#020617_100%)] w-full h-full items-center">
      <div className="max-w-4xl mx-auto z-10 relative mt-8">
        <h2 className="text-2xl font-bold text-cyan-400 tracking-widest uppercase mb-8 border-b border-cyan-500/20 pb-4">Theoretical Background</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.values(PARTS).map(part => (
            <div key={part.id} className="bg-slate-900/60 border border-slate-700 p-6 rounded-lg hover:border-cyan-500/50 transition-colors flex flex-col items-center text-center">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 flex items-center justify-center bg-slate-800 rounded border border-slate-700 text-cyan-400 shadow-inner">
                  {part.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-200 uppercase tracking-widest mb-2">{part.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{part.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuizScene() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const handleAnswer = (index: number) => {
    if (feedback) return; // Prevent double click
    setSelectedAnswer(index);
    const isCorrect = index === QUESTIONS[currentQuestion].answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) setScore(s => s + 1);

    setTimeout(() => {
      setFeedback(null);
      setSelectedAnswer(null);
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(q => q + 1);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#020617_100%)] p-8 w-full h-full">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(#06b6d4 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="z-10 w-full max-w-2xl bg-slate-900/40 border border-cyan-500/30 p-10 rounded-2xl backdrop-blur-md">
        {!showResult ? (
          <div>
            <div className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
              <h2 className="text-xl font-bold tracking-widest text-cyan-400 uppercase">Knowledge Evaluation</h2>
              <span className="text-sm font-mono text-slate-400">P_0{currentQuestion + 1}/0{QUESTIONS.length}</span>
            </div>
            <p className="text-lg text-slate-200 mb-8">{QUESTIONS[currentQuestion].q}</p>
            <div className="space-y-3">
              {QUESTIONS[currentQuestion].options.map((opt, i) => {
                let btnStyle = "border-slate-700 bg-slate-800/40 hover:bg-slate-800/80 hover:border-cyan-500/50 text-slate-300";
                if (selectedAnswer === i) {
                  if (feedback === 'correct') btnStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
                  if (feedback === 'incorrect') btnStyle = "border-red-500 bg-red-500/20 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]";
                } else if (selectedAnswer !== null && i === QUESTIONS[currentQuestion].answer) {
                  btnStyle = "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 opacity-50";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={feedback !== null}
                    className={`w-full text-left p-4 rounded border transition-all duration-300 flex items-center gap-4 group ${btnStyle}`}
                  >
                    <div className="w-6 h-6 border rounded-sm flex items-center justify-center font-mono text-xs opacity-50 group-hover:opacity-100">{String.fromCharCode(65 + i)}</div>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 size={64} className="text-emerald-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            <h2 className="text-3xl font-bold tracking-widest uppercase text-white mb-2">Evaluation Complete</h2>
            <p className="text-slate-400 mb-6">Your final score is <span className="text-cyan-400 font-bold font-mono text-lg">{score}</span> out of {QUESTIONS.length}</p>
            <button onClick={resetQuiz} className="px-6 py-2 border border-slate-700 hover:border-cyan-500 text-sm font-mono transition-colors rounded text-slate-300">Retry Quiz</button>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoModal({ part, onClose }: { part: Part; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-slate-900 border border-cyan-500/50 p-6 rounded-xl relative z-10 max-w-sm w-full shadow-[0_0_30px_rgba(34,211,238,0.2)]">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={20}/></button>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-cyan-400 p-3 bg-slate-800 rounded border border-slate-700">{part.icon}</div>
          <h3 className="text-xl font-bold text-white uppercase tracking-widest">{part.name}</h3>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">{part.description}</p>
      </div>
    </div>
  );
}

function QuizModal({ onClose }: { onClose: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const handleAnswer = (index: number) => {
    if (feedback) return;
    setSelectedAnswer(index);
    const isCorrect = index === QUESTIONS[currentQuestion].answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) setScore(s => s + 1);

    setTimeout(() => {
      setFeedback(null);
      setSelectedAnswer(null);
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(q => q + 1);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="z-10 w-full max-w-2xl bg-slate-900 border border-cyan-500/50 p-10 rounded-2xl shadow-[0_0_50px_rgba(34,211,238,0.15)] relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
        {!showResult ? (
          <div>
            <div className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
              <h2 className="text-xl font-bold tracking-widest text-cyan-400 uppercase">Knowledge Evaluation</h2>
              <span className="text-sm font-mono text-slate-400">P_0{currentQuestion + 1}/0{QUESTIONS.length}</span>
            </div>
            <p className="text-lg text-slate-200 mb-8">{QUESTIONS[currentQuestion].q}</p>
            <div className="space-y-3">
              {QUESTIONS[currentQuestion].options.map((opt, i) => {
                let btnStyle = "border-slate-700 bg-slate-800/40 hover:bg-slate-800/80 hover:border-cyan-500/50 text-slate-300";
                if (selectedAnswer === i) {
                  if (feedback === 'correct') btnStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
                  if (feedback === 'incorrect') btnStyle = "border-red-500 bg-red-500/20 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]";
                } else if (selectedAnswer !== null && i === QUESTIONS[currentQuestion].answer) {
                  btnStyle = "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 opacity-50";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={feedback !== null}
                    className={`w-full text-left p-4 rounded border transition-all duration-300 flex items-center gap-4 group ${btnStyle}`}
                  >
                    <div className="w-6 h-6 border rounded-sm flex items-center justify-center font-mono text-xs opacity-50 group-hover:opacity-100">{String.fromCharCode(65 + i)}</div>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 size={64} className="text-emerald-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            <h2 className="text-3xl font-bold tracking-widest uppercase text-white mb-2">Evaluation Complete</h2>
            <p className="text-slate-400 mb-8">Your final score is <span className="text-cyan-400 font-bold font-mono text-lg">{score}</span> out of {QUESTIONS.length}</p>
            <div className="flex justify-center gap-4">
              <button onClick={resetQuiz} className="px-6 py-2 border border-slate-700 hover:border-cyan-500 text-sm font-mono transition-colors rounded text-slate-300">Retry Quiz</button>
              <button onClick={onClose} className="px-6 py-2 bg-cyan-600/20 hover:bg-cyan-600/40 border border-cyan-500 text-cyan-400 text-sm font-mono transition-colors rounded">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [currentScene, setCurrentScene] = useState<Scene>('home');
  const [currentStep, setCurrentStep] = useState(0);
  const [installedParts, setInstalledParts] = useState<PartId[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });
  const [selectedPart, setSelectedPart] = useState<PartId | null>(null);
  const [infoModalPart, setInfoModalPart] = useState<PartId | null>(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const audioEnabledRef = useRef(isAudioEnabled);
  useEffect(() => {
    audioEnabledRef.current = isAudioEnabled;
  }, [isAudioEnabled]);

  const speak = useCallback((textKey: string, force = false) => {
    if (!force && !audioEnabledRef.current) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = AUDIO_TEXT[textKey] || textKey;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'en-US';
      
      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find(v => v.lang.startsWith('en'));
      if (enVoice) utterance.voice = enVoice;

      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const toggleAudio = () => {
    const newState = !isAudioEnabled;
    setIsAudioEnabled(newState);
    if (newState) {
        const isComplete = installedParts.length === STEPS.length;
        if (isComplete) {
            speak('complete', true);
        } else {
            speak(`step_${currentStep}`, true);
        }
    } else {
        window.speechSynthesis.cancel();
    }
  };

  // Load state from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pc-assembly-progress-v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      setCurrentStep(parsed.currentStep || 0);
      setInstalledParts(parsed.installedParts || []);
      setAttempts(parsed.attempts || 0);
      setMistakes(parsed.mistakes || 0);
    }
  }, []);

  // Save state to local storage when it changes
  useEffect(() => {
    localStorage.setItem('pc-assembly-progress-v2', JSON.stringify({ currentStep, installedParts, attempts, mistakes }));
  }, [currentStep, installedParts, attempts, mistakes]);

  const handleDragStart = (e: React.DragEvent, partId: PartId) => {
    e.dataTransfer.setData('partId', partId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const processDrop = (draggedPartId: PartId, targetSlotId: PartId) => {
    if (!draggedPartId || installedParts.includes(draggedPartId)) {
        setSelectedPart(null);
        return;
    }

    setAttempts(a => a + 1);
    setSelectedPart(null);

    const expectedPartId = STEPS[currentStep].id;

    if (draggedPartId === expectedPartId && targetSlotId === expectedPartId) {
      // Success
      setInstalledParts(prev => [...prev, draggedPartId]);
      setFeedback({ message: 'Component Installed', type: 'success' });
      
      // Auto-advance after a short delay
      setTimeout(() => {
        setFeedback({ message: '', type: null });
        if (currentStep < STEPS.length - 1) {
          setCurrentStep(s => {
             const nextStep = s + 1;
             speak(`step_${nextStep}`);
             return nextStep;
          });
        } else {
            speak('complete');
        }
      }, 1500);
    } else if (draggedPartId !== expectedPartId) {
      // Wrong part for this step
      setMistakes(m => m + 1);
      speak('error_sequence');
      setFeedback({ message: `Sequence Error: Requires ${PARTS[expectedPartId].name} next.`, type: 'error' });
      setTimeout(() => setFeedback({ message: '', type: null }), 3000);
    } else {
      // Right part, wrong slot
      setMistakes(m => m + 1);
      speak('error_location');
      setFeedback({ message: `Location Error: Invalid placement.`, type: 'error' });
      setTimeout(() => setFeedback({ message: '', type: null }), 3000);
    }
  };

  const handleDragDrop = (e: React.DragEvent, targetSlotId: PartId) => {
    e.preventDefault();
    e.stopPropagation();
    const draggedPartId = e.dataTransfer.getData('partId') as PartId;
    processDrop(draggedPartId, targetSlotId);
  };

  const handleSlotClick = (e: React.MouseEvent, targetSlotId: PartId) => {
    e.stopPropagation();
    if (selectedPart) {
        processDrop(selectedPart, targetSlotId);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setInstalledParts([]);
    setAttempts(0);
    setMistakes(0);
    setFeedback({ message: '', type: null });
    setSelectedPart(null);
    speak('step_0');
  };

  const isComplete = installedParts.length === STEPS.length;
  const progress = (installedParts.length / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-cyan-500/20 bg-slate-900/50 flex items-center justify-between px-4 md:px-8 backdrop-blur-md z-40 relative">
        <div className="flex items-center gap-2 md:gap-3 flex-1">
          <div className="shrink-0 w-6 h-6 md:w-8 md:h-8 bg-cyan-500 rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <Cpu size={16} className="text-slate-950" />
          </div>
          <h1 className="hidden md:block text-sm lg:text-lg font-bold tracking-tight uppercase text-cyan-400 whitespace-nowrap">
            Virtual Lab <span className="text-slate-500 font-normal ml-1">// Assembly</span>
          </h1>
        </div>
        
        {/* Universal Navigation Menu */}
        <nav className="flex gap-1 md:gap-2 lg:gap-4 shrink-0 justify-center flex-1 lg:flex-none">
          {([{id:'home', label:'Home'}, {id:'theory', label:'Theory'}, {id:'simulation', label:'Simulation'}, {id:'quiz', label:'Quiz'}] as const).map(scene => (
            <button 
              key={scene.id}
              onClick={() => setCurrentScene(scene.id as Scene)}
              className={`px-3 py-4 font-mono text-[10px] md:text-xs uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap ${currentScene === scene.id ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-700'}`}
            >
              {scene.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3 md:gap-6 text-sm flex-1">
          {currentScene === 'simulation' && (
            <>
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Attempts</span>
                <span className="font-bold font-mono text-lg text-slate-200">{attempts}</span>
              </div>
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Mistakes</span>
                <span className="font-bold font-mono text-lg text-red-500">{mistakes}</span>
              </div>
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 border border-slate-700 hover:border-cyan-500 text-[10px] md:text-xs font-mono transition-colors rounded text-slate-300 ml-0 md:ml-4"
              >
                <RotateCcw size={14} /> <span className="hidden md:inline">RESET_LAB</span>
              </button>
              <button
                onClick={toggleAudio}
                className={`p-1.5 md:p-2 border rounded transition-colors ${isAudioEnabled ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10' : 'border-slate-700 text-slate-500 hover:text-slate-300'}`}
                title="Toggle Audio Instructions"
                aria-label="Toggle Audio Instructions"
              >
                {isAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col overflow-y-auto lg:overflow-hidden relative">
        {currentScene === 'home' && <HomeScene onStart={setCurrentScene} />}
        {currentScene === 'theory' && <TheoryScene />}
        {currentScene === 'quiz' && <QuizScene />}
        
        <div className={`flex-1 flex-col lg:flex-row w-full h-full ${currentScene === 'simulation' ? 'flex' : 'hidden'}`}>
        {/* Left Panel: Instructions */}
        <aside className="w-full lg:w-80 border-r border-cyan-500/10 bg-slate-900/30 p-6 flex flex-col gap-6 overflow-y-visible lg:overflow-y-auto z-10">
          <div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-2">
              <span>PROGRESS</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {!isComplete ? (
            <div className="flex-1 flex flex-col relative">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                <h3 className="text-[11px] uppercase font-bold tracking-widest text-cyan-400">OBJ_{currentStep + 1}</h3>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="bg-slate-800/40 border border-slate-700 p-4 rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1 text-[8px] font-mono opacity-20">VER_0.42</div>
                    <p className="text-sm leading-relaxed text-slate-300 mb-3 font-medium">
                      <span className="text-white font-semibold">Action: </span>
                      {STEPS[currentStep].instruction}
                    </p>
                    <div className="bg-slate-900/50 border border-slate-700 rounded p-3 text-slate-400 flex gap-3 text-xs leading-relaxed mt-2">
                      <AlertCircle className="shrink-0 text-cyan-500" size={16} />
                      <p>{STEPS[currentStep].hint}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Feedback messages */}
              <div className="h-16 mt-6">
                <AnimatePresence>
                  {feedback.message && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`flex items-center gap-2 p-3 text-xs rounded border font-mono tracking-wide ${
                        feedback.type === 'success' 
                          ? 'bg-emerald-900/20 border-emerald-500/30 text-emerald-400' 
                          : 'bg-red-900/20 border-red-500/30 text-red-500'
                      }`}
                    >
                      {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                      {feedback.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center flex-1 text-center border border-emerald-500/30 bg-emerald-900/10 rounded-xl p-6"
            >
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-xl font-bold tracking-widest uppercase text-white mb-2">System Online</h2>
              <p className="text-slate-400 text-sm mb-6">Diagnostics complete. Operation finished with {mistakes} mistakes.</p>
              <button
                onClick={() => setShowQuizModal(true)}
                className="bg-cyan-600/20 hover:bg-cyan-600/40 border border-cyan-500 text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold py-3 px-6 rounded transition-colors w-full mb-3 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
              >
                Take Evaluation Quiz
              </button>
              <button 
                onClick={handleReset}
                className="border border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold py-3 px-6 rounded transition-colors w-full"
              >
                Retry Simulation
              </button>
            </motion.div>
          )}

        </aside>

        {/* Center: Drop Zone (PC Case) */}
        <section className="flex-1 relative bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#020617_100%)] p-8 flex items-center justify-center min-h-[500px]">
          {/* Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(#06b6d4 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

          {/* Setup Case Display */}
          <div className="w-full max-w-[450px] aspect-[4/5] border border-cyan-500/20 rounded-xl bg-slate-900/40 backdrop-blur-sm p-5 shadow-2xl relative flex flex-col gap-4 z-10">
            {/* Case Silhouette */}
            <div className="absolute inset-4 border-2 border-slate-700/50 rounded-lg pointer-events-none"></div>

            {/* Motherboard slot */}
            <div 
              className={`flex-1 rounded border border-dashed relative transition-colors flex flex-col p-4 z-10 ${
                installedParts.includes('motherboard') 
                  ? 'border-slate-700 bg-slate-800/60 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]' 
                  : STEPS[currentStep]?.id === 'motherboard' && !isComplete
                    ? 'border-cyan-400/50 bg-cyan-400/5'
                    : 'border-slate-700 bg-slate-800/20'
              }`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDragDrop(e, 'motherboard')}
              onClick={(e) => handleSlotClick(e, 'motherboard')}
              role="button"
              tabIndex={selectedPart ? 0 : -1}
              aria-label="Motherboard Slot"
            >
              {installedParts.includes('motherboard') && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute inset-3 border border-slate-700/50 bg-slate-800/30 rounded pointer-events-none flex"
                >
                  {/* Slots inside motherboard */}
                  
                  {/* CPU Area */}
                  <div className="absolute top-10 left-[25%] w-[80px] h-[80px]">
                    <div 
                      className={`w-full h-full rounded border border-dashed transition-colors flex items-center justify-center relative group ${
                        installedParts.includes('cpu') 
                        ? 'border-slate-600 bg-slate-800/80 shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]' 
                        : STEPS[currentStep]?.id === 'cpu' && !isComplete
                          ? 'border-cyan-400/50 bg-cyan-400/5 pointer-events-auto'
                          : 'border-slate-700 pointer-events-auto'
                      }`}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDragDrop(e, 'cpu')}
                      onClick={(e) => handleSlotClick(e, 'cpu')}
                      role="button"
                      tabIndex={selectedPart ? 0 : -1}
                      aria-label="CPU Socket"
                    >
                      {!installedParts.includes('cpu') && STEPS[currentStep]?.id === 'cpu' && !isComplete && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-mono text-cyan-400 bg-slate-900 px-1 py-0.5 border border-cyan-400/30 shadow-[0_0_8px_rgba(34,211,238,0.2)]">CPU_SOCKET</div>
                      )}
                      
                      {installedParts.includes('cpu') && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <Cpu size={40} className="text-cyan-600/50" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* RAM Area */}
                  <div className="absolute top-8 right-[25%] w-[45px] h-[100px] flex flex-col gap-1">
                    <div 
                      className={`w-full h-full rounded border border-dashed transition-colors flex items-center justify-center ${
                        installedParts.includes('ram') 
                        ? 'border-slate-600 bg-slate-800/80 shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]' 
                        : STEPS[currentStep]?.id === 'ram' && !isComplete
                          ? 'border-cyan-400/50 bg-cyan-400/5 pointer-events-auto'
                          : 'border-slate-700 pointer-events-auto'
                      }`}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDragDrop(e, 'ram')}
                      onClick={(e) => handleSlotClick(e, 'ram')}
                      role="button"
                      tabIndex={selectedPart ? 0 : -1}
                      aria-label="RAM Slots"
                    >
                       {installedParts.includes('ram') && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <div className="w-[8px] h-[70px] bg-cyan-500/80 rounded-sm mx-auto shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* GPU Slot */}
                  <div className="absolute bottom-12 left-10 right-10 h-[50px]">
                    <div 
                      className={`w-full h-full rounded border border-dashed transition-colors flex items-center justify-center relative ${
                        installedParts.includes('gpu') 
                        ? 'border-slate-600 bg-slate-800/80 shadow-inner translate-y-[-2px]' 
                        : STEPS[currentStep]?.id === 'gpu' && !isComplete
                          ? 'border-cyan-400/50 bg-cyan-400/5 pointer-events-auto'
                          : 'border-slate-700 pointer-events-auto'
                      }`}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDragDrop(e, 'gpu')}
                      onClick={(e) => handleSlotClick(e, 'gpu')}
                      role="button"
                      tabIndex={selectedPart ? 0 : -1}
                      aria-label="GPU Slot"
                    >
                       {installedParts.includes('gpu') && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 text-cyan-600/50">
                          <Video size={24} />
                          <span className="font-mono text-xs uppercase font-bold tracking-widest">PCIe RTX</span>
                        </motion.div>
                      )}
                    </div>
                  </div>

                </motion.div>
              )}
            </div>

            {/* PSU slot */}
            <div 
               className={`h-[120px] rounded border border-dashed flex items-center justify-center transition-colors relative z-10 ${
                installedParts.includes('psu') 
                  ? 'border-slate-700 bg-slate-800/60 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]' 
                  : STEPS[currentStep]?.id === 'psu' && !isComplete
                    ? 'border-cyan-400/50 bg-cyan-400/5'
                    : 'border-slate-700 bg-slate-800/20'
              }`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDragDrop(e, 'psu')}
              onClick={(e) => handleSlotClick(e, 'psu')}
              role="button"
              tabIndex={selectedPart ? 0 : -1}
              aria-label="PSU Bay"
            >
              {installedParts.includes('psu') && (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-4 text-slate-500">
                  <Power size={32} />
                  <span className="font-mono text-[10px] tracking-widest font-bold uppercase">Sys_Power</span>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Right Panel: Inventory */}
        <aside className="w-full lg:w-72 bg-slate-900/30 border-l border-cyan-500/10 flex flex-col z-10 box-border">
          <div className="p-4 border-b border-cyan-500/10 bg-slate-900/50">
            <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500">Component List</h3>
          </div>
          <div className="p-4 flex-1 overflow-y-visible lg:overflow-y-auto grid grid-cols-2 lg:grid-cols-1 gap-3 items-start content-start">
            {Object.values(PARTS).map((part) => {
              const isInstalled = installedParts.includes(part.id);
              const isNext = !isComplete && STEPS[currentStep].id === part.id;
              
              return (
                <motion.div
                  key={part.id}
                  layoutId={`inv-${part.id}`}
                  draggable={!isInstalled}
                  onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, part.id)}
                  role="button"
                  tabIndex={isInstalled ? -1 : 0}
                  onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          if (!isInstalled) setSelectedPart(selectedPart === part.id ? null : part.id);
                      }
                  }}
                  onClick={() => {
                      if (!isInstalled) setSelectedPart(selectedPart === part.id ? null : part.id);
                  }}
                  className={`
                    p-3 rounded-lg flex flex-col md:flex-row lg:flex-row items-center gap-3 border transition-all group select-none focus:outline-none focus:ring-2 focus:ring-cyan-500 relative
                    ${isInstalled 
                      ? 'bg-slate-800/20 border-slate-800/40 opacity-40 grayscale cursor-not-allowed' 
                      : selectedPart === part.id
                        ? 'border-cyan-400 bg-cyan-900/30 shadow-[0_0_15px_rgba(34,211,238,0.2)] scale-[0.98]'
                        : 'bg-slate-800/40 border-slate-700 opacity-80 cursor-grab hover:bg-cyan-500/5 hover:border-cyan-500/40 hover:opacity-100 active:cursor-grabbing'
                    }
                    ${isNext && !isInstalled && selectedPart !== part.id ? 'ring-1 ring-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.1)]' : ''}
                  `}
                  whileHover={!isInstalled && selectedPart !== part.id ? { y: -1 } : {}}
                  whileTap={!isInstalled && selectedPart !== part.id ? { scale: 0.98 } : {}}
                >
                  {isInstalled && (
                    <div className="absolute top-2 right-2 text-[8px] font-mono uppercase text-slate-600">Installed</div>
                  )}
                  <div className={`w-12 h-12 flex items-center justify-center border border-transparent rounded transition-colors bg-slate-900/50 ${!isInstalled ? 'group-hover:border-cyan-500/30' : ''}`}>
                    <div className={`transition-colors ${isInstalled ? 'text-slate-600' : selectedPart === part.id ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400'}`}>
                      {part.icon}
                    </div>
                  </div>
                  <span className={`font-mono text-[11px] uppercase tracking-wide font-bold transition-colors ${selectedPart === part.id ? 'text-cyan-300' : isInstalled ? 'text-slate-600' : 'text-slate-400 group-hover:text-cyan-300'}`}>
                    {part.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </aside>
        </div>
      </main>

      {/* Popups / Modals */}
      {infoModalPart && <InfoModal part={PARTS[infoModalPart]} onClose={() => setInfoModalPart(null)} />}
      {showQuizModal && <QuizModal onClose={() => setShowQuizModal(false)} />}
    </div>
  );
}
