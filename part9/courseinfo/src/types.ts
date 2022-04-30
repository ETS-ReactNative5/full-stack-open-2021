export interface HeaderProps {
  courseName: string;
};

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
};

export interface CoursePartBaseDescription extends CoursePartBase {
  description: string;
};

export interface CourseNormalPart extends CoursePartBaseDescription {
  type: "normal";
};

export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
};

export interface CourseSubmissionPart extends CoursePartBaseDescription {
  type: "submission";
  exerciseSubmissionLink: string;
};

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

export interface CoursePartProps {
  coursePart: CoursePart;
}

export interface ContentProps {
  courseParts: CoursePart[];
};

export interface TotalProps {
  courseParts: CoursePart[];
};