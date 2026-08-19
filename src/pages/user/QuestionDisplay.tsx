import { useEffect, useState } from "react";
import { CheckCircle2, Clock3 } from "lucide-react";

interface Question {
  id: number;
  question: string;
  answer: string;
  options: string[];
}

interface QuestionDisplayProps {
  question: Question;
}

function QuestionDisplay({ question }: QuestionDisplayProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  /*
   * Every time a new question arrives, restart the
   * 15-second answer reveal timer.
   */
  useEffect(() => {
    setShowAnswer(false);

    const timer = window.setTimeout(() => {
      setShowAnswer(true);
    }, 15_000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [question.question]);

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Question Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">
            Network Test Question
          </p>
        </div>

        <h2 className="mt-4 text-xl font-semibold leading-9 tracking-tight text-slate-800">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {question.options.map((option, index) => {
          const isCorrect =
            showAnswer &&
            option.trim().toLowerCase() ===
              question.answer.trim().toLowerCase();

          return (
            <div
              key={`${question.question}-${index}`}
              className={`
          rounded-2xl
          border
          p-4
          transition-all
          duration-700
          ease-out

          ${
            isCorrect
              ? `
                border-emerald-300
                bg-emerald-50
                shadow-md
                shadow-emerald-900/10
              `
              : `
                border-slate-200
                bg-white
                hover:border-emerald-200
                hover:bg-emerald-50/30
              `
          }
        `}
            >
              <div className="flex items-center gap-3">
                {/* Option Letter */}
                <div
                  className={`
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              text-xs
              font-bold
              transition-all
              duration-700

              ${
                isCorrect
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-500"
              }
            `}
                >
                  {String.fromCharCode(65 + index)}
                </div>

                {/* Option */}
                <span
                  className={`
              flex-1
              text-sm
              leading-6
              transition-all
              duration-700

              ${
                isCorrect
                  ? "font-bold text-emerald-800"
                  : "font-medium text-slate-600"
              }
            `}
                >
                  {option}
                </span>

                {/* Correct Icon */}
                {isCorrect && (
                  <CheckCircle2
                    size={20}
                    strokeWidth={2.4}
                    className="shrink-0 text-emerald-600 animate-in zoom-in duration-500"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Waiting Indicator */}
      <div className="mt-8 flex items-center justify-center">
        {!showAnswer ? (
          <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-slate-400">
            <Clock3 size={13} />

            <span>Evaluating response...</span>

            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400" />
          </div>
        ) : (
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600 animate-in fade-in duration-700">
            <CheckCircle2 size={13} />

            <span>Correct option identified</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionDisplay;
