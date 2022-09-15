import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import MarkCanvas from "./components/MarkCanvas";
import MarkList from "./components/List";

const Mark = (props: any) => {
  return <Routes>
    <Route path="/" element={<MarkList />} />
    <Route path="/list" element={<MarkList />} />
    <Route path="/edit" element={<MarkCanvas />} />
  </Routes>;
};

export default Mark;
