import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (req, res) => {
  console.log('req', req);
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  const heightInCm = Number(height)
  const weightInKg = Number(weight)

  if (!weight || !height) {
    return res.send({ error: 'parameters missing'}).status(400);
  } else if (isNaN(heightInCm) && isNaN(weightInKg)) {
    return res.send({ error: 'malformatted parameters'}).status(400);
  } else {
    return res.send({
      weight: weightInKg,
      height: heightInCm,
      bmi: calculateBmi(heightInCm, weightInKg),
    });
  }
});

app.post('/exercises', (req, res) => {
  const target = req.body.target;
  const exerciseHours = req.body.daily_exercises;

  const error = (args: string[]) => {
    let result = false;

    args.map((arg, i) => {
      if (isNaN(Number(arg))) result = true;
      if (i > 0) exerciseHours.push(Number(arg));
    })

    return result;
  }

  if (!target || !exerciseHours) {
    return res.send({ error: 'parameters missing'}).status(400);
  } else if (isNaN(target) || error(exerciseHours)) {
    return res.send({ error: 'malformatted paramaters'}).status(400);
  } else {
    const result = calculateExercises(target, exerciseHours);
    return res.send(result);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
