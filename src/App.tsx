import React, { memo } from 'react';
import { Route, Routes } from 'react-router-dom';

// page import
import Main from './page/main';
import Search from './page/Search';

const App = memo(() => {
	return (
		<Routes>
			<Route path='/' element={<Main />} />
			<Route path='finding' element={<Search />} />
		</Routes>
	);
});

export default App;