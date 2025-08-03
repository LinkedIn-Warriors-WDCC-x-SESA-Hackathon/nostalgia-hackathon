import React from "react";
import { useNavigate } from "react-router-dom";
import CalcLogo from "../assets/calcLogo.png";
import mathsHeader from "../assets/mathsHeader.png";
import "../index.css";
import Button from "../components/Button";

// Helper to get random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper to get random arithmetic operator
function getRandomOperator() {
  const operators = ["+", "-", "×", "÷"];
  return operators[getRandomInt(0, operators.length - 1)];
}

const PanicPage = () => {
  const navigate = useNavigate();

  // Generate random question on mount (1-10)
  const [num1, setNum1] = React.useState(() => getRandomInt(1, 10));
  const [num2, setNum2] = React.useState(() => getRandomInt(1, 10));
  const [operator, setOperator] = React.useState(() => getRandomOperator());
  const [answer, setAnswer] = React.useState("");
  const [score, setScore] = React.useState(0);

  // Helper to calculate the correct answer
  const getCorrectAnswer = () => {
    switch (operator) {
      case "+": return num1 + num2;
      case "-": return num1 - num2;
      case "×": return num1 * num2;
      case "÷": return Number((num1 / num2).toFixed(2));
      default: return null;
    }
  };

  // Regenerate question and reset answer (1-10)
  const regenerateQuestion = () => {
    setNum1(getRandomInt(1, 10));
    setNum2(getRandomInt(1, 10));
    setOperator(getRandomOperator());
    setAnswer("");
  };

  // Handle answer submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const correct = getCorrectAnswer();
    // For division, accept answers within 0.01 tolerance
    const userAns = operator === "÷" ? Number(parseFloat(answer).toFixed(2)) : Number(answer);
    if (
      (operator === "÷" && Math.abs(userAns - correct) < 0.01) ||
      userAns === correct
    ) {
      setScore(score + 1);
    }
    regenerateQuestion();
  };

  return (
    <>
      <div className="min-h-screen bg-beige">
        <div className="h-[124px] bg-beige-darker flex items-center px-4 relative">
          <img
            src={CalcLogo}
            alt="Logo"
            className="h-auto max-h-[80px] object-contain"
          />
          <div className="flex-1 flex justify-center mr-160">
            <img
              src={mathsHeader}
              alt="Maths Is Fun"
              className="h-auto max-h-[100px] object-contain"
            />
          </div>
          <div className="w-[120px]"></div>
        </div>

        {/* Score Box and Back Button Row */}
        <div className="flex w-full items-center">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            className="ml-4 mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold flex items-center justify-center rounded-lg shadow transition border-none"
            style={{
              height: "64px",
              fontSize: "1.25rem", // text-xl to match score box
              minWidth: "120px",
              padding: "0 2rem"
            }}
          >
            Back
          </Button>

          <div className="ml-8 mt-8 bg-white bg-opacity-90 rounded-lg shadow px-6 py-2 text-xl font-bold text-gray-800 flex items-center" style={{ height: "64px" }}>
            Score: {score}
          </div>
        </div>

        {/* Maths Question Centered */}
        <div
          className="flex flex-col items-center justify-center flex-1 min-h-[calc(100vh-124px)] px-4"
          style={{ marginTop: "-4rem" }} // Move up to account for score box height
        >
          <form
            className="flex flex-row items-center justify-center flex-wrap gap-6 w-full font-bold"
            style={{ height: "14.2857vh" }} // 1/7th of viewport height
            onSubmit={handleSubmit}
          >
            <span className="font-bold text-[8vw] sm:text-7xl md:text-8xl lg:text-9xl">{num1}</span>
            <span className="font-bold text-[8vw] sm:text-7xl md:text-8xl lg:text-9xl">{operator}</span>
            <span className="font-bold text-[8vw] sm:text-7xl md:text-8xl lg:text-9xl">{num2}</span>
            <span className="font-bold text-[8vw] sm:text-7xl md:text-8xl lg:text-9xl">=</span>
            <input
              type="text"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              className="border-b-4 border-yellow-400 bg-transparent font-bold text-[8vw] sm:text-7xl md:text-8xl lg:text-9xl w-32 text-center focus:outline-none focus:border-yellow-500 transition"
              placeholder="?"
              autoFocus
              style={{ minWidth: "3rem" }}
              inputMode={operator === "÷" ? "decimal" : "numeric"}
            />
          </form>
          <Button
            className="mt-12 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold"
            onClick={regenerateQuestion}
            type="button"
          >
            New Question
          </Button>
        </div>
      </div>
    </>
  );
};

export default PanicPage;