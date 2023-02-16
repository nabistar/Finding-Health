import React, { memo } from 'react';
import styled from 'styled-components';
import { NavLink, Route, Routes } from "react-router-dom";

// 미디어 쿼리
import mq from "../MediaQuery";

const Container = styled.div`
	width: 100%;
	height: 100%;

`;

const Loss = memo(() => {
	return (
		<Container>
			<div className='searchBox'>
				
			</div>
		</Container>
	);
});

export default Loss;