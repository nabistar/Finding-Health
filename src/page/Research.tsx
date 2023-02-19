import React, { memo } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
	height: 100%;
	padding: 20px;
	box-sizing: border-box;

	p {
		font-family: 'Maruburi';
		font-size: 14px;
		text-align: center;
		margin-top: 250px;
	}
`;

const Research = memo(() => {
	return (
		<Container>
			<p>해당 웹 사이트는 개인 포트폴리오 용으로, 공공데이터 포털에 개재된 서비스를 이용하였습니다.</p>
		</Container>
	);
});

export default Research;