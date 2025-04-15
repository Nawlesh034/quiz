import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import App from '../App';
import Hero from '../Main-Section/Hero';

function Progress({ responses }) {
  const total = responses.reduce((acc, r) => acc + r.correctAnswer.length, 0);
  const correct = responses.reduce((acc, r) => {
    return acc + r.result.filter((r) => r === 'correct').length;
  }, 0);
  const [move,setMove]=useState(false);
  if(move){
    return <Hero/>
  }
 
  const score = Math.round((correct / total) * 100);
 
  return (
    <div className="p-10 text-center bg-gray-50 min-h-screen">
      {/* Circular Progress with content inside */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-60 h-60 rounded-full">
          {/* Outer Progress Bar */}
          <div
            className="absolute top-0 left-0 w-full h-full rounded-full"
            style={{
              background: `conic-gradient(#27ae60 ${score * 3.6}deg, #e5e7eb 0deg)`,
            }}
          ></div>

          {/* Inner white circle with content */}
          <div className="absolute top-6 left-6 w-48 h-48 rounded-full bg-white flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl font-bold text-green-600">{score}%</h1>
            <p className="text-gray-800 font-semibold mt-1">Overall Score</p>
            <p className="text-xs text-gray-500 mt-1 leading-tight">
              While you correctly formed several sentences, some improvement is needed. Focus on sentence structure & clarity.
            </p>
          </div>
        </div>

        {/* Go to dashboard button */}
      
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow mt-8 transition" onClick={()=>setMove(true)}>
          Go To Dashboard
        </button>
       
       
      </div>

      {/* Detailed Breakdown */}
      <div className="mt-12 space-y-6">
        {responses.map((res, idx) => (
          <div
            key={idx}
            className="border border-gray-300 rounded-xl p-6 mx-auto w-full max-w-2xl bg-white shadow-sm"
          >
            <p className="text-left text-gray-800 mb-2">
              <span className="font-semibold">Prompt:</span> {res.prompt}
            </p>

            <div className="text-left mb-4">
              <p className="font-semibold text-gray-700">Your Answers:</p>
              <ul className="list-disc list-inside space-y-1">
                {res.userAnswer.map((ans, i) => {
                  const result = res.result[i];
                  let color = 'text-gray-600';
                  let icon = '⚪';

                  if (result === 'correct') {
                    color = 'text-green-600';
                    icon = '✅';
                  } else if (result === 'wrong') {
                    color = 'text-red-600';
                    icon = '❌';
                  }

                  return (
                    <li key={i} className={`${color}`}>
                      {ans || 'Blank'} {icon}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="text-left">
              <p className="font-semibold text-gray-700">Correct Answers:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-600">
                {res.correctAnswer.map((ans, i) => (
                  <li key={i}>{ans}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Progress;
