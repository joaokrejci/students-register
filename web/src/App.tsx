import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentForm from "./screens/StudentForm";
import Students from "./screens/Students";

import "./App.style.scss";
import StudentView from "./screens/StudentView";

function App() {
  return (
    <div className="AppContainer">
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/student-form" element={<StudentForm />}>
              <Route path=":id" element={<StudentForm />} />
            </Route>
            <Route path="/student/:id" element={<StudentView />} />
            <Route path="/" element={<Students />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
