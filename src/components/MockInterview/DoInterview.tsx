'use client'
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GetInterviewInfo from './GetInterviewInfo';
import { MockInterviewInfoI } from './MockInterview';
import axios from 'axios';
import { Button, Input, TextField } from '@mui/material';
import { ArrowForward, ExitToApp } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export interface interviewChatI {
  content: string
}

export interface interviewChatWatingI {
  loading: true
}

export interface interviewAPII {
  status: string
  response: string
  previous_QnA: any
}

export type interviewChatType = interviewChatI | interviewChatWatingI

const getAnswerAPI = async (question: string, type: string) => {
  console.log(question)
  const { data } = await axios.post<interviewAPII>(`/api/chat${type === '채용공고' ? 'Jd' : 'Resume'}/`, {question})
  // const { response } = data
  console.log(data)
  return data
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
  const [prev, setPrev] = React.useState<any>([])
  const router = useRouter();
  const isLoading = chat.length > 0 && 'loading' in chat[chat.length-1];
  console.log(chat)
  const doAnswer = async (answer: string) => {
    setChat(t => ([...t, { content: answer}, {loading: true}]))
    const data = await getAnswerAPI(answer, info.type)
    setChat((before) => {
      const deleted = before.filter(t => !('loading' in t))
      const newContent = { content: data.response }
      return [...deleted, newContent]
    });
    setPrev(data.previous_QnA)
  }
  React.useEffect(() => {
    getAnswerAPI(info.content, info.type).then((answer) => {
      setChat((before) => {
        const deleted = before.filter(t => !('loading' in t))
        const newContent = { content: answer.response }
        return [...deleted, newContent]
      });
      setPrev(answer.previous_QnA)
    })
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
        overflowY: 'auto'
      }}>
        {
          chat.map((c, i) => {
            return (
              <div style={{
                width: '80%',
                padding: '10px',
                background: i%2 == 0 ? 'skyblue': 'lightgray',
                marginLeft: i%2 == 0 ? '20%' : '0%',
                marginRight: i%2 == 0 ? '0%' : '20%',
                whiteSpace: 'pre-wrap',
                borderRadius: '4px'
              }}>{'loading' in c ? '로딩중...' : c.content}</div>
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
      (e.target as any).reset()
      if (answer?.length === 0) {
        alert('내용을 입력해주세요.')
        return;
      }
      doAnswer(answer);
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
        <Button type='button' color='error' variant='contained' onClick={() => {
          if (!confirm('모의 면접을 종료하고 피드백 화면으로 이동하시겠습니까?')) return;
          router.push(`/feedback`);
        }}>
          <ExitToApp />
        </Button>
      </Box>
    </Box>
  );
}
