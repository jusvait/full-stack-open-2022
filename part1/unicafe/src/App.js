import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

const Statistics = ({feedback}) => {
    const totalSubmits = feedback.good + feedback.neutral + feedback.bad;
    const totalValue = feedback.good - feedback.bad;
    const average = totalValue / totalSubmits;
    const positives = feedback.good / totalSubmits * 100;

    if (totalSubmits === 0) {
      return (
        <><h1>Statistics</h1><p>No feedback given</p></>
      )
    }

    return (
      <div>
        <h1>Statistics</h1>
        <StatisticLine text={"good"} value={feedback.good}/>
        <StatisticLine text={"neutral"} value={feedback.neutral}/>
        <StatisticLine text={"bad"} value={feedback.bad}/>
        <StatisticLine text={"all"} value={totalSubmits}/>
        <StatisticLine text={"average"} value={average}/>
        <StatisticLine text={"positive"} value={positives}/>

      </div>
    )
}

const FeedbackButton = ({name, onClick}) => (
  <button onClick={onClick}>
    {name}
  </button>
)

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0, 
    neutral: 0, 
    bad: 0
  });

  return (
    <div>
      <h1>Give feedback</h1>
      <FeedbackButton name={"good"} onClick={() => setFeedback({...feedback, good: feedback.good + 1})}/>
      <FeedbackButton name={"neutral"} onClick={() => setFeedback({...feedback, neutral: feedback.neutral + 1})}/>
      <FeedbackButton name={"bad"} onClick={() => setFeedback({...feedback, bad: feedback.bad + 1})}/>
      <Statistics feedback={feedback}/>
    </div>
  )
}

export default App