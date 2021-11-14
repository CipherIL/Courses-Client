import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

//Pages
import Login from './pages/Login.component';
import Dashboard from './pages/Dashboard.component';
import PageNotFound from './pages/PageNotFound.component';
import AddCourse from './pages/AddCourse.component';
import AddStudent from './pages/AddStudent.component';

//Shared Components
import Header from './components/shared/Header.component';
import Footer from './components/shared/Footer.component';

import UserContextProvider from './contexts/User.context';

import { PrivateRoute, PrivateProfessorRoute } from './routes/PrivateRoute';


const App = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
      <Header/>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
            <Route path='/add-course' element={<PrivateProfessorRoute><AddCourse/></PrivateProfessorRoute>}/>
            <Route path='/add-student' element={<PrivateProfessorRoute><AddStudent/></PrivateProfessorRoute>}/>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      <Footer/>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
