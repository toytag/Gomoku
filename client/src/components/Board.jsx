import React from "react";

// import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';

import Square from "./Square";


function Board() {
  return (
    <Box sx={{
      backgroundImage: "url('/Board.svg')",
    }}>
      <Grid container spacing={0}>
        <Grid item>
          <Square />
        </Grid>
        <Grid item>
          <Square />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Board;