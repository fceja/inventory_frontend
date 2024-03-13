import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UpdatePage from "../pages/UpdatePage";
import "../../scss/App.scss";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/update" element={<UpdatePage />}></Route>
    </Routes>
  );
};

export default App;
