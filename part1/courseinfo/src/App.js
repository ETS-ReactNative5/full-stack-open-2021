import React from 'react'

const Header = ({ name }) => (
  <h1>{name}</h1>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercices}
  </p>
)

const Content = ({ parts }) => (
  parts.map((item) => <Part key={item.name} part={item} />
))

const Total = ({ parts }) => {
  let exercices = 0

  parts.map((item) => exercices += item.exercices)

  return (
    <p>Number of exercices {exercices}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercices: 10,
      },
      {
        name: 'Using props to pass data',
        exercices: 7,
      },
      {
        name: 'State of a component',
        exercices: 14,
      },
    ],
  }

  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default App
