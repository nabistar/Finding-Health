import React, { memo, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { NavLink, Route, Routes } from "react-router-dom";

// 커스텀 훅
import {useAppDispatch, useAppSelector} from '../Hook';

// 슬라이스
import { getLossList } from '../Slice/LossSlice';

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const Get = memo(() => {
	const dispatch = useAppDispatch();
	const {data, loading, error} = useAppSelector((state) => state.LossSlice);

	useEffect(() => {
	}, []);

	return (
		<Container>
			
		</Container>
	);
});

export default Get;