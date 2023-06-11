import type { WeightInfo } from './components/weight-kpi/weight-kpi-dialog/weight-kpi-dialog-content/types'
import type { Exercises, Workout } from './components/workouts-table/types'

export const exercises: Exercises = {
  exercise1: { name: 'Muscle Up', sets: [5, 4, 4, 3, 2] },
  exercise2: { name: 'Bulgarian Squat', sets: [8, 8, 8, 8] },
  exercise3: { name: 'Bar Dip', sets: [12, 10, 10, 8] },
  exercise4: { name: 'Wide Pull Up', sets: [8, 8, 7, 6] },
  exercise5: {
    name: 'Resistance Band Triceps Extensions',
    sets: [12, 10, 10, 8],
  },
  exercise6: { name: 'Windshield Wipers', sets: [12, 12, 10] },
}

export const workouts: Workout[] = [
  {
    id: '0',
    name: 'Push Up Monday',
    description: 'good weather, good workout',
    totalReps: '97',
    week: '3',
    date: '15.01.2023',
    duration: '60',
    exercises,
  },
  {
    id: '1',
    name: 'FBW Thursday',
    description: 'muscle pains, bad weather',
    totalReps: '67',
    week: '2',
    date: '11.01.2023',
    duration: '75',
    exercises,
  },
  {
    id: '2',
    name: 'Pull Up Tuesday',
    description: 'record broken!!!',
    totalReps: '105',
    week: '2',
    date: '09.01.2023',
    duration: '45',
    exercises,
  },
  {
    id: '3',
    name: 'Push Up Monday',
    description: 'overall very good workout',
    totalReps: '80',
    week: '2',
    date: '08.01.2023',
    duration: '60',
    exercises,
  },
  {
    id: '4',
    name: 'Back + Arms',
    description: 'good weather, good workout',
    totalReps: '97',
    week: '1',
    date: '06.01.2023',
    duration: '60',
    exercises,
  },
  {
    id: '5',
    name: 'FBW Thursday',
    description: 'muscle pains, bad weather',
    totalReps: '67',
    week: '1',
    date: '04.01.2023',
    duration: '75',
    exercises,
  },
  {
    id: '6',
    name: 'Pull Up Tuesday',
    description: 'record broken!!!',
    totalReps: '105',
    week: '1',
    date: '02.01.2023',
    duration: '45',
    exercises,
  },
  {
    id: '7',
    name: 'Push Up Monday',
    description: 'overall very good workout',
    totalReps: '80',
    week: '1',
    date: '01.01.2023',
    duration: '60',
    exercises,
  },
]

export const weightsInfo: WeightInfo[] = [
  { weight: 68.2, date: '01.01.2022' },
  { weight: 71.8, date: '07.02.2022' },
  { weight: 70.5, date: '15.03.2022' },
  { weight: 69.9, date: '21.04.2022' },
  { weight: 72.3, date: '04.05.2022' },
  { weight: 68.7, date: '12.06.2022' },
  { weight: 70.1, date: '25.07.2022' },
  { weight: 71.5, date: '03.08.2022' },
  { weight: 69.3, date: '17.09.2022' },
  { weight: 73.2, date: '28.10.2022' },
  { weight: 67.8, date: '09.11.2022' },
  { weight: 72.9, date: '19.12.2022' },
  { weight: 69.6, date: '02.01.2023' },
  { weight: 70.8, date: '14.02.2023' },
  { weight: 68.4, date: '27.03.2023' },
  { weight: 71.1, date: '06.04.2023' },
  { weight: 73.7, date: '19.05.2023' },
  { weight: 69.2, date: '30.06.2023' },
  { weight: 67.5, date: '11.08.2023' },
  { weight: 70.3, date: '22.09.2023' },
]
