import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as ThemeModeProvider } from './context/theme';

// const palette = {
//   lightest: '#F3EFFB',
//   lighter: '#DBCEF3',
//   light: '#9570DB',
//   dark: '#432478',
//   darker: '#1C093D',
//   darkest: '#100524'
// };

const palette = {
  lightest: '#EFEEFA',
  lighter: '#D2CEF2',
  light: '#A79FE3',
  dark: '#544AA6',
  darker: '#2D2478',
  darkest: '#080524'
};

const theme = {
  colors: {
    dark: {
      body: {
        background: palette.darkest
      },
      app: {
        background: palette.darker,
        text: palette.lightest
      },
      header: {
        background: palette.darkest,
        text: palette.lighter,
        link: palette.light,
        linkHover: palette.lighter
      },
      input: {
        background: palette.dark,
        text: palette.lightest,
        border: palette.darkest
      },
      button: {
        background: palette.dark,
        text: palette.lightest,
        border: palette.darkest,
        hover: {
          background: palette.darkest,
          text: palette.lightest,
          border: palette.darkest
        },
        active: {
          background: palette.darker,
          text: palette.lightest,
          border: palette.darkest
        }
      }
    },
    light: {
      body: {
        background: palette.lightest
      },
      app: {
        background: palette.lighter,
        text: palette.darkest
      },
      header: {
        background: palette.lightest,
        text: palette.darker,
        link: palette.dark,
        linkHover: palette.darker
      },
      input: {
        background: palette.light,
        text: palette.darkest,
        border: palette.lightest
      },
      button: {
        background: palette.light,
        text: palette.darkest,
        border: palette.lightest,
        hover: {
          background: palette.lightest,
          text: palette.darkest,
          border: palette.lightest
        },
        active: {
          background: palette.lighter,
          text: palette.darkest,
          border: palette.lightest
        }
      }
    }
  }
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ThemeModeProvider>
          <App />
        </ThemeModeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
