import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CursoList from './components/CursoList';
import CursoDetail from './components/CursoDetail';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CursoList />} />
                <Route path="/cursos/detail/:id" element={<CursoDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
