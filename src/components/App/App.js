import { Route, Routes } from "react-router-dom";

// import AppHeader from "../AppHeader";
import Layout from "../Layout";
import { MainPage, SingleAtriclePage, Page404 } from "../pages";

import "./App.scss";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/articles" element={<MainPage />} />
          <Route path="/articles/:slug" element={<SingleAtriclePage />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
