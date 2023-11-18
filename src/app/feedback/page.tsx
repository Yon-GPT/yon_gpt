import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

const getFeedbackAPI = async () => {
  try {
    const { data } = await axios.post<{ response: string }>('api/feedback', {})
    const { response } = data
    return response
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}

export default function FeedbackPage() {
  const [feedback, setFeedback] = React.useState('');

  return <div>
    <Box height="100%" sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '30px'}}>
        <Typography variant='h5'>모의면접 종합 피드백</Typography>
    </Box>

    <Box>
      {
        <div>
          {feedback}
        </div>
      }
    </Box>
  </div>
}