import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import BasicLayout from "./components/BasicLayout";
import Mark from "./pages/Mark";
import Trainer from "./pages/Trainer";

function App() {
  return (
    <HashRouter>
      <BasicLayout>
        <Routes>
          <Route path="/mark/*" element={<Mark />} />
          <Route path="/trainer/*" element={<Trainer />} />
          <Route index element={<Mark />} />
        </Routes>
      </BasicLayout>
    </HashRouter>
  );
}

export default App;
