'use client'
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MockInterviewInfoI } from './MockInterview';
import { Button, FormControl, FormControlLabel, FormLabel, Icon, IconButton, Radio, RadioGroup, TextField } from '@mui/material';
import { ArrowCircleRight, ArrowForward, ArrowRight } from '@mui/icons-material';

export default function GetInterviewInfo({setInfo}: { setInfo: (info: MockInterviewInfoI) => void }) {
  return (
    <Box height="100%" sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '30px'
    }}>
      <Typography variant='h2' textAlign={'center'}>모의면접에 오신 것을 <br />환영합니다</Typography>
      <Typography variant='h5'>모의면접을 진행하기 위한 정보를 입력해주세요.</Typography>
      <Box component={'form'} width={'100%'} autoComplete='false' sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px'
    }}
    onSubmit={(e) => {
      e.preventDefault();
      console.log(e)
      const data = new FormData(e.target as any);
      const type = data.get('row-radio-buttons-group') as (null | string)
      const content = data.get('content') as string
      if (!type || content?.length === 0) {
        alert('내용을 모두 입력해주세요.')
        return;
      }
      setInfo({
        type, content
      })
    }}
    >
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">면접 기반</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="채용공고" control={<Radio />} label="채용 공고 기반 면접" />
            <FormControlLabel value="자기소개서" control={<Radio />} label="자기소개서 기반 면접" />
          </RadioGroup>
        </FormControl>
        <TextField
          id="outlined-multiline-static"
          label="면접 기반 내용"
          multiline
          rows={8}
          sx={{
            height: '100%',
            width: '100%'
          }}
          name="content"
        />
        <Button type='submit' color='primary' variant='contained'>
          <ArrowForward />
        </Button>
      </Box>
    </Box>
  );
}
