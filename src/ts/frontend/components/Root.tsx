import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import App from "@components/App";
import Store from "@store/ConfigureStore";

const Root = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/*" element={<App />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
