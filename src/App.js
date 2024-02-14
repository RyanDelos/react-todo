import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';
import TodoContainer from './components/TodoContainer';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/list" element={<TodoContainer />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
