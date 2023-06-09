import { screen } from '@solidjs/testing-library';

// Getters
export const getDialogContentText = () =>
  screen.getByText(/Put your current weight below:/i)
