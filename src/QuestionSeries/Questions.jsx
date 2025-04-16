import React, { useEffect, useState } from 'react';
import Progress from './Progress';

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isFinished, setIsFinished] = useState(false);
  const [allResponses, setAllResponses] = useState([]);
  const [usedOptions, setUsedOptions] = useState(new Set());

  useEffect(() => {
    fetch('/api.json')
      .then((res) => res.json())
      .then((data) => {
        const q = data.questions;
        setQuestions(q);
        setAnswers(new Array(q[0].correctAnswer.length).fill(''));
        setIsCorrect(new Array(q[0].correctAnswer.length).fill(false));
      });
  }, []);

  const saveCurrentResponse = () => {
    const currentQuestion = questions[index];
    const response = {
      prompt: currentQuestion.question,
      userAnswer: [...answers],
      correctAnswer: [...currentQuestion.correctAnswer],
      result: answers.map((ans, i) => {
        if (!ans) return 'unattempted';
        return ans === currentQuestion.correctAnswer[i] ? 'correct' : 'wrong';
      }),
    };
    setAllResponses((prev) => [...prev, response]);
  };

  useEffect(() => {
    if (questions.length === 0) return;
    if (timeLeft === 0) {
      saveCurrentResponse();
      if (index < questions.length - 1) {
        setIndex((prev) => prev + 1);
      } else {
        setIsFinished(true);
      }
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, index, questions]);

  useEffect(() => {
    if (questions.length === 0) return;
    const current = questions[index];
    setAnswers(new Array(current.correctAnswer.length).fill(''));
    setIsCorrect(new Array(current.correctAnswer.length).fill(false));
    setUsedOptions(new Set());
    setTimeLeft(15);
  }, [index, questions]);

  const handleDragStart = (e, option) => {
    e.dataTransfer.setData('text/plain', option);
  };

  const handleDrop = (e, blankIndex) => {
    e.preventDefault();
    const droppedValue = e.dataTransfer.getData('text/plain');
    const updatedAnswers = [...answers];
    const updatedCorrect = [...isCorrect];

    updatedAnswers[blankIndex] = droppedValue;
    updatedCorrect[blankIndex] = droppedValue === questions[index].correctAnswer[blankIndex];

    setAnswers(updatedAnswers);
    setIsCorrect(updatedCorrect);
    setUsedOptions((prevUsed) => new Set(prevUsed.add(droppedValue)));
  };

  const handleDragOver = (e) => e.preventDefault();

  if (isFinished) return <Progress responses={allResponses} />;
  if (questions.length === 0) return <h2 className="text-xl font-semibold">Loading...</h2>;

  const currentQuestion = questions[index];
  const parts = currentQuestion.question.split(/_{5,}/g);
  const availableOptions = currentQuestion.options.filter((option) => !usedOptions.has(option));

  return (
    <div className="custom-shadow w-full md:w-1/2 h-auto md:h-[40.625rem] mt-12 md:mt-28 px-4 py-8 md:p-10 mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</h3>
          <button className="w-[4.75rem] h-11 text-center gap-2 rounded-lg py-2 px-5 border">Quit</button>
        </div>

        {/* Responsive Progress Bar */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-[640px]">
            {Array.from({ length: 10 }).map((_, i) => {
              const isActive = i === index;
              const isCompleted = i < index;
              return (
                <div
                  key={i}
                  className={`h-[3px] w-16 rounded-sm 
                    ${isActive ? 'animate-loader bg-gradient-to-r from-[#F2A531] to-[#F2A531] bg-[length:0%_100%] bg-no-repeat bg-[#ddd]' : ''} 
                    ${isCompleted ? 'bg-[#F2A531]' : ''} 
                    ${!isActive && !isCompleted ? 'bg-[#ddd]' : ''}`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h6 className="text-center mb-4">Select the missing words in the correct order</h6>
        <p className="text-lg">
          {parts.map((part, i) => (
            <span key={i}>
              {part}
              {i < currentQuestion.correctAnswer.length && (
                <span
                  onDrop={(e) => handleDrop(e, i)}
                  onDragOver={handleDragOver}
                  className={`inline-block min-w-[100px] p-1 mx-2 border-b-2 text-center ${
                    answers[i]
                      ? isCorrect[i]
                        ? 'bg-green-200'
                        : 'bg-red-200'
                      : 'bg-white'
                  }`}
                >
                  {answers[i]}
                </span>
              )}
            </span>
          ))}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {availableOptions.map((option, idx) => (
          <div
            key={idx}
            draggable
            onDragStart={(e) => handleDragStart(e, option)}
            className="px-4 py-3 border rounded-lg border-[#BFC6C6] cursor-grab"
          >
            {option}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        {index === questions.length - 1 ? (
          <div
            className="flex justify-center rounded-lg border w-16 h-16 items-center bg-[#453FE1] text-white cursor-pointer"
            onClick={() => {
              saveCurrentResponse();
              setIsFinished(true);
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z"
                fill="#DFE3E3"
              />
            </svg>
          </div>
        ) : (
          <div
            className="flex justify-center rounded-lg border w-16 h-16 items-center cursor-pointer"
            onClick={() => {
              saveCurrentResponse();
              setIndex((prev) => prev + 1);
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z"
                fill="#DFE3E3"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default Questions;
