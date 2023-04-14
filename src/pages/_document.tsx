import { Html, Head, Main, NextScript } from 'next/document'
import CssBaseline from '@mui/material/CssBaseline';
import ConstituentProvider from '../context/constituentContext';

export default function Document() {
  return (
      <Html lang="en">
        <Head />
        <body>
          <CssBaseline />
          <Main />
          <NextScript />
        </body>
      </Html>
  )
}
