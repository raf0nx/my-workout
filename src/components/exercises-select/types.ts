import type { TargetExercise } from '~/components/workouts-table/workouts-table-dialog/workouts-table-dialog-content/workouts-table-dialog-content-exercises/types'

export interface ExercisesSelectProps {
  selectedExercise: AvailableExercises | ''
  name: TargetExercise
  ariaLabel: TargetExercise
  onChange: (
    selectedExercise: AvailableExercises,
    targetExercise: TargetExercise
  ) => void
}

export const AVAILABLE_EXERCISES = [
  'Bar Dip',
  'Behind the Neck Pull Up',
  'Bulgarian Squat',
  'Chin Up',
  'Close Grip Pull Up',
  'Decline Push Up',
  'Declined Wall Push Up',
  'Diamond Push Up',
  'Dip',
  'Elevated Pike Push Up',
  'Fixed Bar Tricep Extensions',
  'Front Lever Swing',
  'Half Lay Front Lever Hold',
  'Hammer Grip Pull Up',
  'Handstand',
  'Hollow Body',
  'Korean Dip',
  'L-Sit Pull Up',
  'Leg Raises',
  'Low Flag Hold',
  'Muscle Up',
  'Pike Push Up',
  'Pull Up',
  'Push Up',
  'Resistance Band Crossover',
  'Resistance Band Curl',
  'Resistance Band Front Lever Swing',
  'Resistance Band Muscle Up',
  'Resistance Band Triceps Extensions',
  'Resistance Band Tucked Front Pull Up',
  'Reverse Grip Pull Up',
  'Side to Side Pull Up',
  'Triceps Resistance Band Pushdown',
  'Tucked Front Hold',
  'Tucked Front Pull Up',
  'Wide Pull Up',
  'Wide Push Up',
  'Windshield Wipers',
] as const

export type AvailableExercises = typeof AVAILABLE_EXERCISES[number]
