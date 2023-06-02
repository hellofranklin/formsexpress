import React from "react";
import LoginBox from "./components/login/LoginBox";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

import MyForms from "./components/myforms/MyForms";
import NoPage from "./pages/NoPage/NoPage";

function App() {
  return (
    <BrowserRouter basename="/authoring">
      <Routes>
        <Route>
          <Route index element={<MyForms />} />
          <Route path="create" element={<Home />} />
          <Route path="home" element={<MyForms />} />
          <Route path="login" element={<LoginBox />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
