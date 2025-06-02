import 'github-markdown-css/github-markdown.css';



// For routing
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LecturePage from './pages/LecturePage'; // we'll create this
import HomePage from './pages/HomePage';       // optional landing page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/lecture/:slug" element={<LecturePage />} />
      </Routes>
    </Router>
  );
}

export default App;
