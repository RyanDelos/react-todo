import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';
import TodoContainer from './components/TodoContainer';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/list" element={<TodoContainer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
