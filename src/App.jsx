import { useState, useEffect } from "react";
import Hero from "./Hero";
import Question from "./Question";
import { nanoid } from 'nanoid';
import Result from "./Result";

export default function App() {
  const [isStarted, setIsStarted] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [allQuestion, setAllQuestion] = useState([])
  const [score, setScore] = useState(0)
  const [gamePlayed, setGamePlayed] = useState(0)

  useEffect(() => {
    console.log("Halo")
    fetch("https://opentdb.com/api.php?amount=10")
      .then(res => res.json())
      .then(data => {
        const questionList = data.results.map(question => {
          const answer = [question.correct_answer, ...question.incorrect_answers]
          const allAnswer = shuffle(answer)
          const select = allAnswer.map(() => false)

          return ({
            id: nanoid(),
            question: question.question,
            answers: allAnswer,
            correct_answer: question.correct_answer,
            selected: select,
          })
        })
        setAllQuestion(shuffle(questionList).splice(0, 5))
      })
  }, [gamePlayed])

  function selectAnswer(id, idx) {
    setAllQuestion(oldData => 
      {
        const newData = oldData.map(data => {
          if (data.id === id) {
            const newSelect = data.selected.map((select, index) => {
              if (index === idx) {
                return !select
              } else {
                return false
              }
            })
            return {
              ...data,
              selected: newSelect,
            }
          } else {
            return data
          }
        })
        return newData
    })
  }

  function shuffle(arr) {
    return arr.sort(() => Math.random() > .5? 1 : -1)
  }

  function startQuiz() {
    setIsStarted(true)
  }

  function checkQuiz() {
    setIsChecked(true)
    allQuestion.map(question => {
      const idx = question.selected.findIndex(select => select === true)
      if (question.answers[idx] === question.correct_answer) {
        setScore(oldScore => oldScore + 1)
      }
    })
  }

  function playAgain() {
    setIsStarted(false)
    setIsChecked(false)
    setScore(0)
    setAllQuestion([])
    setGamePlayed(prev => prev + 1)
  }

  const questionElement = allQuestion.map(question => <Question key={question.id} details={question} selectAnswer={selectAnswer}/>)

  const resultElement = allQuestion.map(question => <Result key={question.id} details={question}/>)
  
  return (
    <main>
      <div className="main-page">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
        {!isStarted && !isChecked && <Hero start={startQuiz}/>}
        {isStarted && !isChecked &&
          <div className="question-page">
          <div className="question-list">
            {questionElement}
          </div>
          <button className="check" onClick={checkQuiz}>Check answers</button>
        </div>}
        {isStarted && isChecked && 
        <div className="result-page">
          <div className="result-list">
            {resultElement}
          </div>
          <div className="final-score">
            <h1 className="score">You scored {score}/5 correct answers</h1>
            <button className="play-again" onClick={playAgain}>Play Again</button>
          </div>
        </div>}
      </div>
    </main>
  )
}