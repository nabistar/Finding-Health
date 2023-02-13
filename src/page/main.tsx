import React, { memo } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// 미디어 쿼리
import mq from '../MediaQuery';

// 이미지 import
import health1 from '../img/health1.png';
import health2 from '../img/health2.png';
import health3 from '../img/health3.png';
import health4 from '../img/health4.png';
import health5 from '../img/health5.png';
import health6 from '../img/health6.png';

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: #96c7f7;
	display: inline-block;

	@keyframes open {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	.healthicon {
		width: 100%;
		height: 50%;
		display: flex;
		justify-content: space-evenly;
		margin-top: 40px;
		animation-duration: 2s;
		animation-name: open;

		img {
			width: 10%;
			height: 200px;

			&:nth-of-type(2n) {
				margin-top: 100px;
			}

			&:nth-of-type(2) {
				transform: rotate(-45deg);
			}

			&:nth-of-type(5) {
				transform: rotate(45deg);
			}
		}
	}

	h1, a {
		animation-duration: 2s;
		animation-name: open;
		animation-delay: 2s;
		animation-fill-mode: both;

		color: #fff;
		text-align: center;
		font-family: 'KyoboHandwriting2020A';
	}

	h1 {
		font-weight: bold;
		font-size: 60px;
	}

	a {
		text-decoration: none;
		display: block;
		margin-top: 80px;
		font-size: 20px;

		&:hover {
			color: #000;
		}
	}

	${mq.maxWidth('sm')`
		.healthicon {
			height: 40%;
			margin-top: 80px;

			img {
				width: 80px;
				height: 80px;
			}
		}

		h1 {
			font-size: 50px;
		}
	`}
`;

const main = memo(() => {
	return (
		<Container>
			<div className='healthicon'>
				<img src={health1} alt='healthicon' />
				<img src={health2} alt='healthicon' />
				<img src={health3} alt='healthicon' />
				<img src={health4} alt='healthicon' />
				<img src={health5} alt='healthicon' />
				<img src={health6} alt='healthicon' />
			</div>
			<h1>국가 건강 검진 기관 찾기</h1>
			<NavLink to='/finding'>찾으러 가기</NavLink>
		</Container>
	);
});

export default main;