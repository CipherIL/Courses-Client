import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard.component';
import PageNotFound from './pages/PageNotFound.component';
import Header from './components/shared/Header.component';
import Footer from './components/shared/Footer.component';

import UserContextProvider from './contexts/User.context';


const App = () => {
  return (
    <BrowserRouter>
      <Header/>
        <UserContextProvider>
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
        </UserContextProvider>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
