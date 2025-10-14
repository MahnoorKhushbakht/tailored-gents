import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function CardData({children}) {
  return (
  <React.Fragment>
      <Card className="flex flex-row shadow-2xl backdrop-blur-xl bg-gray-800 text-gray-300 rounded-md" maxw="90%" maxh="90%" padding="20%" 
      variant="outlined">{children}
    </Card>
  </React.Fragment>
);




}

