import React from 'react'

const Header = ({ name }) => (
  <h2>{name}</h2>
)

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0)
  
  return (
    <p style={{ fontWeight: "bold" }}>total of {total} exercises</p>
  ) 
}

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>    
)

const Content = ({ parts }) => (
  parts.map((item) => (
    <Part key={item.id} part={item} />
  ))
)

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course