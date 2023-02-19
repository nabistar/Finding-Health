import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

// 폰트 import 
import ExtraLight from "./font/MaruBuri-ExtraLight.ttf";
import Light from "./font/MaruBuri-Light.ttf";
import Regular from "./font/MaruBuri-Regular.ttf";
import SemiBold from "./font/MaruBuri-SemiBold.ttf";
import Bold from "./font/MaruBuri-Bold.ttf";

const GlobalStyles = createGlobalStyle`
    ${reset}

	@font-face {
	font-family: 'KyoboHandwriting2020A';
	src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/KyoboHandwriting2020A.woff') format('woff');
	font-weight: normal;
	font-style: normal;
	}

	@font-face {
		font-family: 'MaruBuri';
		font-style: normal;
		font-weight: 200;
		src: url(${ExtraLight}) format('truetype');
	}

	@font-face {
		font-family: 'MaruBuri';
		font-style: normal;
		font-weight: 300;
		src: url(${Light}) format('truetype')
	}

	@font-face {
		font-family: 'MaruBuri';
		font-style: normal;
		font-weight: 400;
		src: url(${Regular}) format('truetype')
	}

	@font-face {
		font-family: 'MaruBuri';
		font-style: normal;
		font-weight: 600;
		src: url(${SemiBold}) format('truetype')
	}

	@font-face {
		font-family: 'MaruBuri';
		font-style: normal;
		font-weight: 700;
		src: url(${Bold}) format('truetype')
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
