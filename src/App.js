import { Route, Routes } from "react-router-dom";
import Student from "./Pages/Student";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Student />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
