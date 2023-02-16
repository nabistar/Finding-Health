import React, { memo } from "react";
import { Route, Routes } from "react-router-dom";

// page import
import Main from "./page/main";

const App = memo(() => {
    return (
        <Routes>
            <Route path="/*" element={<Main />} />
        </Routes>
    );
});

export default App;
