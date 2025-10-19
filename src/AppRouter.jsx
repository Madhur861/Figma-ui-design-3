import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext";
import App from "./app";
import EditorPage from "./pages/EditorPage";

function AppRouter() {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default AppRouter;
