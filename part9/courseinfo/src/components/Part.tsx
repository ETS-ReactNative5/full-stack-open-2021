import { CoursePartProps } from '../types';

const Part = (props: CoursePartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  

  switch (props.coursePart.type) {
    case "normal":
      return (
        <p>
          <strong>{props.coursePart.name} {props.coursePart.exerciseCount}</strong>
          <br />
          <i>{props.coursePart.description}</i>
        </p>
      )
    case "groupProject":
      return (
        <p>
          <strong>{props.coursePart.name} {props.coursePart.exerciseCount}</strong>
          <br />
          {`project exercises ${props.coursePart.groupProjectCount}`}
        </p>
      )
    case "submission":
      return (
        <p>
          <strong>{props.coursePart.name} {props.coursePart.exerciseCount}</strong>
          <br />
          <i>{props.coursePart.description}</i>
          <br />
          {`submit to ${props.coursePart.exerciseSubmissionLink}`}
        </p>
      )
    default:
      return assertNever(props.coursePart);
  }
};

export default Part;