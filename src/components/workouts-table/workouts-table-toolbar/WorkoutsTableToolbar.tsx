import { AddCircle } from "@suid/icons-material";
import { IconButton, Toolbar, Typography } from "@suid/material";

export default function WorkoutsTableToolbar() {
  return (
    <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
      <Typography variant="h6" component="h1" sx={{ pl: 1 }}>
        Workouts list
      </Typography>
      <IconButton color="secondary" aria-label="add new workout">
        <AddCircle />
      </IconButton>
    </Toolbar>
  );
}
