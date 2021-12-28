import React from 'react';

import IconButton from "@mui/material/IconButton";

function Square({ value, onClick }) {

  return (
    <IconButton 
      sx={{
        width: 200,
        height: 200,
      }}
      // onClick={onClick}
    >
      {
        
      }
      <img src='Black.svg' width="100%"/>
    </IconButton>
  );
}

export default Square;