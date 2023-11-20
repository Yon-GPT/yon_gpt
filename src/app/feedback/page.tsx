'use client'

import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const testURL = `http://localhost:3000/feedback/?prev=%5B%5B%22%EC%A0%80%EB%8A%94+%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C+%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9E%85%EB%8B%88%EB%8B%A4.%5Cn%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C+%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80+%EB%90%98%EA%B8%B0+%EC%9C%84%ED%95%B4+React%EB%A5%BC+%EA%B3%B5%EB%B6%80%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4.%22%2C%22%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94%21+%EC%A0%80%EB%8A%94+%EC%B1%84%EC%9A%A9+%EB%8B%B4%EB%8B%B9%EC%9E%90%EC%9E%85%EB%8B%88%EB%8B%A4.+%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C+%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%A1%9C+%EC%A7%80%EC%9B%90%ED%95%98%EC%8B%A0%EB%8B%A4%EA%B3%A0+%ED%95%98%EC%85%A8%EA%B5%B0%EC%9A%94.+React%EB%A5%BC+%EA%B3%B5%EB%B6%80%ED%95%98%EC%85%A8%EB%8B%A4%EA%B3%A0+%ED%95%98%EC%85%A8%EB%8A%94%EB%8D%B0%2C+%EC%96%B4%EB%96%A4+%EA%B2%BD%ED%97%98%EC%9D%84+%EA%B0%80%EC%A7%80%EA%B3%A0+%EA%B3%84%EC%8B%A0%EC%A7%80+%EC%9E%90%EC%84%B8%ED%9E%88+%EC%95%8C%EB%A0%A4%EC%A3%BC%EC%8B%A4+%EC%88%98+%EC%9E%88%EC%9D%84%EA%B9%8C%EC%9A%94%3F+React%EB%A5%BC+%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC+%EC%96%B4%EB%96%A4+%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%A5%BC+%EC%A7%84%ED%96%89%ED%95%B4%EB%B3%B4%EC%85%A8%EB%82%98%EC%9A%94%3F%22%5D%2C%5B%22React%EB%A5%BC+%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC+%EC%99%B8%EC%A3%BC%EA%B0%9C%EB%B0%9C+%EB%93%B1+%EB%8B%A4%EC%96%91%ED%95%9C+%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%A5%BC+%EC%A7%84%ED%96%89%ED%95%B4%EB%B3%B4%EC%95%98%EB%8A%94%EB%8D%B0%2C+%EA%B7%B8+%EC%A4%91+%EB%A6%AC%EA%B7%B8+%EC%98%A4%EB%B8%8C+%EB%A0%88%EC%A0%84%EB%93%9C%EB%9D%BC%EB%8A%94+%EA%B2%8C%EC%9E%84%EC%97%90+%EA%B4%80%EB%A0%A8%EB%90%9C+%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%A5%BC+%EC%A7%84%ED%96%89%ED%95%B4%EB%B3%B8+%EA%B2%83%EC%9D%B4+%EA%B8%B0%EC%96%B5%EC%97%90+%EB%82%A8%EC%8A%B5%EB%8B%88%EB%8B%A4.%5Cn%EC%9B%B9%EC%9D%84+%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%83%91+%EC%95%B1%EC%9C%BC%EB%A1%9C+%EB%A7%8C%EB%93%A4%EC%96%B4%EC%A3%BC%EB%8A%94+Electron%EA%B3%BC+%EC%97%B0%EA%B3%84%ED%95%B4+%EA%B2%8C%EC%9E%84+%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8%EC%97%90+%EC%A0%91%EA%B7%BC%ED%95%98%EB%8A%94+%EC%97%AC%EB%9F%AC%EA%B0%80%EC%A7%80%EB%A5%BC+%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%95%98%EC%8A%B5%EB%8B%88%EB%8B%A4.%22%2C%22%ED%9D%A5%EB%AF%B8%EB%A1%9C%EC%9A%B4+%EA%B2%BD%ED%97%98%EC%9D%B4%EC%8B%A0+%EA%B2%83+%EA%B0%99%EC%8A%B5%EB%8B%88%EB%8B%A4%21+%EB%A6%AC%EA%B7%B8+%EC%98%A4%EB%B8%8C+%EB%A0%88%EC%A0%84%EB%93%9C%EC%99%80+Electron%EC%9D%84+%ED%99%9C%EC%9A%A9%ED%95%9C+%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%8A%94+%EC%96%B4%EB%96%A4+%EA%B8%B0%EB%8A%A5%EC%9D%84+%EA%B5%AC%ED%98%84%ED%95%98%EC%85%A8%EB%82%98%EC%9A%94%3F+%EA%B7%B8%EB%A6%AC%EA%B3%A0+%ED%95%B4%EB%8B%B9+%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90%EC%84%9C+%EC%96%B4%EB%96%A4+%EC%96%B4%EB%A0%A4%EC%9B%80%EC%9D%B4+%EC%9E%88%EC%97%88%EA%B3%A0%2C+%EC%96%B4%EB%96%BB%EA%B2%8C+%ED%95%B4%EA%B2%B0%ED%95%98%EC%85%A8%EB%8A%94%EC%A7%80+%EC%95%8C%EB%A0%A4%EC%A3%BC%EC%8B%A4+%EC%88%98+%EC%9E%88%EC%9D%84%EA%B9%8C%EC%9A%94%3F%22%5D%5D`

const getFeedbackAPI = async (prev: any) => {
  try {
    const { data } = await axios.post<{ response: string }>('/api/feedback/')
    console.log(data)
    const { response } = data
    return response
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}

export default function FeedbackPage() {
  const [feedback, setFeedback] = React.useState('');
  const navigation = useSearchParams()
  const data = JSON.parse(navigation.get('prev') || '[]')
  console.log(data)
  useEffect(() => {
    (async () => {
      const d = await getFeedbackAPI(data)
      setFeedback(d || '')
    })()
    
  }, [])
  
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
          {feedback || '로딩중...'}
        </div>
      }
    </Box>
  </div>
}