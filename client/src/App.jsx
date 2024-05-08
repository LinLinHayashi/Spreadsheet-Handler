import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Upload from "./pages/Upload";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}