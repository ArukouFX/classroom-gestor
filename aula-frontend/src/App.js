import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import CursoList from './components/CursoList';
import CursoDetail from './components/CursoDetail';
import CursoForm from './components/CursoForm';
import ProfesorList from './components/ProfesorList';
import ProfesorForm from './components/ProfesorForm';
import CategoriaList from './components/CategoriaList';
import CategoriaForm from './components/CategoriaForm';

const App = () => {
    return (
        <BrowserRouter>
            <nav className="main-nav">
                <Link to="/">Inicio</Link>
                <Link to="/cursos">Cursos</Link>
                <Link to="/profesores">Profesores</Link>
                <Link to="/categorias">Categorías</Link>
            </nav>

            <Routes>
                {/* Ruta principal que muestra todos los componentes */}
                <Route path="/" element={
                    <div className="main-container">
                        <h1>Gestor de Aulas</h1>
                        <CursoList />
                        <ProfesorList />
                        <CategoriaList />
                    </div>
                } />
                
                {/* Rutas para Cursos */}
                <Route path="/cursos" element={<CursoList />} />
                <Route path="/cursos/nuevo" element={<CursoForm />} />
                <Route path="/cursos/editar/:id" element={<CursoForm />} />
                <Route path="/cursos/detail/:id" element={<CursoDetail />} />
                
                {/* Rutas para Profesores */}
                <Route path="/profesores" element={<ProfesorList />} />
                <Route path="/profesores/nuevo" element={<ProfesorForm />} />
                <Route path="/profesores/editar/:id" element={<ProfesorForm />} />
                
                {/* Rutas para Categorías */}
                <Route path="/categorias" element={<CategoriaList />} />
                <Route path="/categorias/nuevo" element={<CategoriaForm />} />
                <Route path="/categorias/editar/:id" element={<CategoriaForm />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;