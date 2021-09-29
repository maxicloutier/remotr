import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *:before,
  *:after {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
  }

  html, body, div,
  input, button, select, option,
  h1, h2, h3, h4, h5, h6, p,
  text {
      font-family: sans-serif;
  }

  html, body {
      max-width: 100vw;
  }

  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 1;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }

  body {
    background: #fafafa;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  h1, h2, h3, h4 {
    font-family: 'Roboto', sans-serif;
  }

  h1 {
    font-size: 36px;
  }

  h2 {
    font-size: 32px;
  }

  h3 {
    font-size: 24px;
    margin-bottom: 1em;
  }

  h4 {
    font-size: 20px;
  }

  p,
  li,
  a,
  blockquote,
  span {
    font-family: 'Roboto Slab', serif;
    font-size: 17px;
    font-weight: 300;
    line-height: 1.5em;
  }

  code,
  codeblock {
    background: #eaeaea;
    font-family: 'Roboto Mono', monospace;
    font-size: 14px;
    padding: 0 4px;
  }

  codeblock {
    display: block;
    margin: 12px 32px 6px 0;
    padding: 12px 14px;
  }
`;
