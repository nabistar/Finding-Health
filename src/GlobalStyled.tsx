import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}

	@font-face {
	font-family: 'KyoboHandwriting2020A';
	src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/KyoboHandwriting2020A.woff') format('woff');
	font-weight: normal;
	font-style: normal;
	}

	@import url(//fonts.googleapis.com/earlyaccess/jejumyeongjo.css);

	.jejumyeongjo * { 
	font-family: 'Jeju Myeongjo', serif;
	}

	html {
		width: 100%;
		height: 100%;
			body {
			width: 100%;
			height: 100%;

			#root {
				width: 100%;
				height: 100%;
			}
		}
	}
`;

export default GlobalStyles;
