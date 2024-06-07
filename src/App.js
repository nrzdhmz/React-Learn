import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './assets/scss/index.scss';
import HomePage from './pages/HomePage'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
