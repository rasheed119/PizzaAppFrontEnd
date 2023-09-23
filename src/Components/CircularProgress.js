import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularColor() {
  return (
    <Stack sx={{ color: 'grey.500',mt:2,mb:2,display:'flex',justifyContent:'center' }} spacing={2} direction="row">
      <CircularProgress color="inherit" />
    </Stack>
  );
}