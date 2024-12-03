import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./views/components";
import { ProductsList } from "./views/content";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductsList />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
