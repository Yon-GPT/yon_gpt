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

export default function DummyInterview({ info }: {info: MockInterviewInfoI}) {
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
    getAnswerAPI(q).then((answer) => {
      setChat((before) => {
        const deleted = before.filter(t => !('loading' in t))
        const newContent = { content: answer }
        return [...deleted, newContent]
      });
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
      }}>
        {
          chat.map((c, i) => {
            return (
              <div>
                <div style={{
                  width: '80%',
                  padding: '10px',
                  background: i%2 == 0 ? 'skyblue': 'lightgray',
                  marginLeft: i%2 == 0 ? '20%' : '0%',
                  marginRight: i%2 == 0 ? '0%' : '20%',
                  borderRadius: '4px'
                }}>{'loading' in c ? 'JWT와 session 방식의 차이를 배웠다고 되어 있는데, 두 방식의 차이점에 대해서 설명해주세요.' : c.content}</div>
              </div>
            )
          })
        }

        <Box height={"100%"} width={"100%"} sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',}}>

          <div style={{
            width: '80%',
            padding: '10px',
            background: 0%2 == 0 ? 'skyblue': 'lightgray',
            marginLeft: 0%2 == 0 ? '20%' : '0%',
            marginRight: 0%2 == 0 ? '0%' : '20%',
            borderRadius: '4px'
          }}>{'두 방식의 가장 큰 차이점은 서버에 인증정보를 저장하는지 여부 입니다. JWT 방식의 경우, 쿠키를 사용하며 발생하는 보안 취약점이 보호되고, 다른 서비스에도 권한을 공유할 수 있습니다.'}</div>
            <Box height={"100%"} width={"100%"} sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',}}>

            <div style={{
              width: '80%',
              padding: '10px',
              background: 1%2 == 0 ? 'skyblue': 'lightgray',
              marginLeft: 1%2 == 0 ? '20%' : '0%',
              marginRight: 1%2 == 0 ? '0%' : '20%',
              borderRadius: '4px'
            }}>{'JWT 방식이 어떻게 동작하는지 더 자세히 설명해주세요.'}</div>
            <Box height={"100%"} width={"100%"} sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',}}>

              <div style={{
                width: '80%',
                padding: '10px',
                background: 0%2 == 0 ? 'skyblue': 'lightgray',
                marginLeft: 0%2 == 0 ? '20%' : '0%',
                marginRight: 0%2 == 0 ? '0%' : '20%',
                borderRadius: '4px'
              }}>{'JWT는 header, payload, signature로 구분되며, 각각 토큰타입, 사용자정보, 암호화 키가 담깁니다. 클라이언트는 로컬에 저장한 JWT로 인증 요청을 보내고 서버는 JWT의 일치 여부를 확인하고 응답을 보냅니다.'}</div>
            </Box>
          </Box>
        </Box>
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
      </Box>
    </Box>
  );
}