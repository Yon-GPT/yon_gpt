'use client'
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GetInterviewInfo from './GetInterviewInfo';
import DoInterview from './DoInterview';

export interface MockInterviewInfoI {
  type: string,
  content: string,
}

export default function MockInterviewComponent() {
  const [info, setInfo] = React.useState<null | MockInterviewInfoI>(null)

  return (
    <Box height="100%">
      {
        info === null ? <GetInterviewInfo setInfo={setInfo} /> : <DoInterview info={info} />
      } 
    </Box>
  );
}
