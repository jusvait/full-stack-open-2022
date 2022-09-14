const Header = ({course}) => {
  return (<h1>{course}</h1>)
}

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({parts}) => {
  return (
    parts.map((part, i) => <Part part={part} key={i}/>)
  )
}


const Total = ({parts}) => {
  return (
    <p>Number of exercises {parts.reduce((a, b) => a+b.exercises, 0)}</p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course