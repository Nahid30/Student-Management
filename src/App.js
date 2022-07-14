import { Route, Routes } from "react-router-dom";
import Student from "./Pages/Student";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Student />} />
      </Routes>
    </div>
  );
}

export default App;
