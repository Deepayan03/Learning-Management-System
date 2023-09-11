import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
    </Routes>
  );
}

export default App;
