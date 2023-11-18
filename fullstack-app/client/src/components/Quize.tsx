// Quiz.tsx
import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import axios from "axios";

interface QuizProps {
  quizzes: ITQuiz[];
  moduleId: string;
}

interface ITQuiz {
  _id: string;
  question: string;
  options: string[];
  correctOption: string;
}

const Quiz: React.FC<QuizProps> = ({ moduleId, quizzes }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [fetchedQuizzes, setFetchedQuizzes] = useState<ITQuiz[]>([]);

  useEffect(() => {
    const fetchQuizzesData = async () => {
      try {
        const response = await axios.get<ITQuiz[]>(
          `http://localhost:3000/api/quizzes?moduleId=${moduleId}`
        );
        console.log(response.data); 
        setFetchedQuizzes(response.data);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
    };

    fetchQuizzesData();
  }, [moduleId]);


 const handleOptionClick = (option: string) => {
   if (selectedOption === null) {
     setSelectedOption(option);

     if (option === fetchedQuizzes[currentQuestion]?.correctOption) {
       setCorrectAnswers((prev) => prev + 1);
     }
   }
 };


  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    setSelectedOption(null);
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setCorrectAnswers(0);
    setShowResult(false);
  };

  if (fetchedQuizzes.length === 0) {
    return (
      <div className="quiz-container">
        <h3>Питання</h3>
        <p>Для цього модулю ще немає тестів</p>
      </div>
    );
  }

  if (showResult) {
    const percentage = (correctAnswers / fetchedQuizzes.length) * 100;
    return (
      <div className="quiz-container">
        <h3>Результати тесту</h3>
        <p>
          Ви відповіли правильно на  {correctAnswers} з {fetchedQuizzes.length} питання.
        </p>
        <p>Правильно на: {percentage.toFixed(2)}%</p>
        <button onClick={resetQuiz}>Перепройти тест</button>
      </div>
    );
  }

  const currentQuiz = fetchedQuizzes[currentQuestion];

  return (
    <div className="quiz-container">
      <h3>Тест</h3>
      <p>
        <span>Питання: № {currentQuestion + 1}</span>{" "}
        <p>{currentQuiz.question}</p>
      </p>
      <ul>
        {currentQuiz.options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`
              ${selectedOption === option ? "selected-option" : ""}
              ${
                selectedOption !== null && option === currentQuiz.correctOption
                  ? "correct-option"
                  : ""
              }
              ${
                selectedOption !== null &&
                option === selectedOption &&
                option !== currentQuiz.correctOption
                  ? "incorrect-option"
                  : ""
              }
            `}
          >
            {option}
          </li>
        ))}
      </ul>
      {selectedOption !== null && (
        <button
          onClick={
            currentQuestion === fetchedQuizzes.length - 1
              ? handleShowResult
              : handleNextQuestion
          }
        >
          {currentQuestion === fetchedQuizzes.length - 1
            ? "Показати результати"
            : "Наступне питання"}
        </button>
      )}
    </div>
  );
};

export default Quiz;
