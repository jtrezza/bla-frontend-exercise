'use client';
import { createTheme } from '@mui/material/styles';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const headingColor = '#161618';

const theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily,
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      color: headingColor,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: headingColor,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#333',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: montserrat.style.fontFamily,
          fontWeight: 400,
        },
      },
    },
  },
});

export default theme;
