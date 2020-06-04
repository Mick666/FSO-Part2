import React from 'react'

const Header = ({ course }) => {
    return (
      <h2>{course}</h2>
    )
  }
  
  const Total = ({ parts }) => {
    const sum = parts.map(part => part.exercises).reduce((sum, total) => sum + total)
    return(
      <p>Total of exercises {sum}</p>
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
    return (
      <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </div>
    )
  }

  export default Course