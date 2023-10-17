'use client'
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GetInterviewInfo from './GetInterviewInfo';
import { MockInterviewInfoI } from './MockInterview';
import axios from 'axios';
import { Button, Input, TextField } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

export interface interviewChatI {
  content: string
}

export interface interviewChatWatingI {
  loading: true
}

export type interviewChatType = interviewChatI | interviewChatWatingI

const getAnswerAPI = async (question: string) => {
  console.log(question)
  const { data } = await axios.post<{ response: string }>('/api/chat/', {question})
  const { response } = data
  return response
}

const dummyData: interviewChatType[] = [
  {
    content: '채용공고 내용을 기반으로 면접을 진행해 주세요.'
  },
  {
    content: '채용공고 내용을 기반으로 면접을 진행해 주세요.'
  },
  {
    content: '채용공고 내용을 기반으로 면접을 진행해 주세요.'
  },
  {
    content: '채용공고 내용을 기반으로 면접을 진행해 주세요.'
  },
  {
    content: '채용공고 내용을 기반으로 면접을 진행해 주세요.'
  },
  {
    content: '채용공고 내용을 기반으로 면접을 진행해 주세요.'
  },
  {
    content: '채용공고 내용을 기반으로 면접을 진행해 주세요.'
  },
  {
    content: '채용공고 내용을 기반으로 면접을 진행해 주세요.'
  },
]

export default function DoInterview({ info }: {info: MockInterviewInfoI}) {
  const [chat, setChat] = React.useState<interviewChatType[]>([{content: `${info.type} 내용을 기반으로 면접을 진행해 주세요.`}, {loading: true}]);
  const isLoading = chat.length > 0 && 'loading' in chat[chat.length-1];
  console.log(chat)
  const doAnswer = async (answer: string) => {
    setChat(t => ([...t, { content: answer}, {loading: true}]))
    const response = await getAnswerAPI(answer)
    setChat((before) => {
      const deleted = before.filter(t => !('loading' in t))
      const newContent = { content: response }
      return [...deleted, newContent]
    });
  }
  React.useEffect(() => {
    const q = `아래의 ${info.type} 내용을 기반으로 면접을 진행해 주세요:

    ${info.content}`
    // getAnswerAPI(q).then((answer) => {
    //   setChat((before) => {
    //     const deleted = before.filter(t => !('loading' in t))
    //     const newContent = { content: answer }
    //     return [...deleted, newContent]
    //   });
    // })
  }, []);
  return (
    <Box height="100%" width={"100%"} sx={{
      display: 'flex',
      gap: '20px',
      flexDirection: 'column',
    }}>
      <Box height={"100%"} width={"100%"} sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        {
          dummyData.map((c, i) => {
            if ('loading' in c) {
              return <Box>로딩중</Box>
            }
            return (
              <div style={{
                width: '80%',
                padding: '10px',
                background: i%2 == 0 ? 'skyblue': 'lightgray',
                marginLeft: i%2 == 0 ? '20%' : '0%',
                marginRight: i%2 == 0 ? '0%' : '20%',
                borderRadius: '4px'
              }}>{c.content}</div>
            )
          })
        }
      </Box>
      <Box width={"100%"} component={"form"} sx={{
      display: 'flex',
      gap: '10px',
      flexDirection: 'row',
    }}
    onSubmit={(e) => {
      e.preventDefault();
      console.log(e)
      const data = new FormData(e.target as any);
      const answer = data.get('answer') as (string)
      if (answer?.length === 0) {
        alert('내용을 입력해주세요.')
        return;
      }
      // doAnswer(answer)
    }}
    >

      <TextField
          id="outlined-multiline-static"
          label="답변"
          multiline
          rows={4}
          sx={{
            width: '100%'
          }}
          name="answer"
        />
        <Button type='submit' color='primary' variant='contained'>
          <ArrowForward />
        </Button>
    </Box>
    </Box>
  );
}
