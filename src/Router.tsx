import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Graph from "./pages/Graph";
import Layout from "./components/Layout/Layout";
import Sort from "./pages/Sort";

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="graph" element={<Graph />} />
        <Route path="sort" element={<Sort />} />
      </Route>
    </Routes>
  );
};

export default Router;
