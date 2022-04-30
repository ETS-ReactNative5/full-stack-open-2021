interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

interface Rating {
  value: number;
  description: string,
};

const getRating = (average: number, target: number): Rating => {
  const rating = {
    value: Number(null),
    description: '',
  }

  switch(true) {
    case average < target:
      rating.value = 1;
      rating.description = 'Sorry... Your target was not achieved.';
      break;
    case average === target:
      rating.value = 2;
      rating.description = 'Congratulations, your target was accomplished.';
    case average > target:
      rating.value = 3;
      rating.description = 'Well done! Your taget was surpassed.';
    default:
      throw new Error('Something went wrong.');
  }

  return rating
}

export const calculateExercises = (target: number, exerciseHours: number[]): Result => {
  const periodLength = exerciseHours.length;
  const average = exerciseHours.reduce((a, b) => a + b, 0) / periodLength;

  const { value, description } = getRating(average, target);

  const result: Result = {
    periodLength: periodLength,
    trainingDays: exerciseHours.filter((item) => item > 0).length,
    success: average >= target,
    rating: value,
    ratingDescription: description,
    target: target,
    average: average,
  }

  return result;
}
