import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Total = ({ parts }) => {
  const sum = parts.map(part => part.exercises).reduce((sum, total) => sum + total)
  console.log(sum)
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
      <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Course = ({course}) => {
  console.log(course.id)
  return (
    <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))