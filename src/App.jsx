// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MarkdownPage from './components/MarkdownPage';
import 'github-markdown-css/github-markdown.css';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/overview" element={<MarkdownPage type="overview" />} />
          <Route path="/lectures/:lectureSlug/:topicSlug" element={<MarkdownPage />} />
          <Route path="/exercises/:slug" element={<MarkdownPage type="exercises" />} />
        </Routes>
      </Layout>
    </Router>
  );
}
