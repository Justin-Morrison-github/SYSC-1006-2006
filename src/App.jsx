import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MarkdownPage from './components/MarkdownPage';
import 'github-markdown-css/github-markdown.css';
import ScrollToTop from './components/ScrollToTop';
import BugReport from './components/BugReport';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/report-bug" element={<BugReport />} />
          <Route path="/" element={<Home />} />
          <Route path="/overview" element={<MarkdownPage type="overview" />} />
          <Route path="/lectures/:lectureSlug/:lectureTopicSlug" element={<MarkdownPage />} />
          <Route path="/exercises/:exerciseSlug" element={<MarkdownPage type="exercises" />} />
        </Routes>
      </Layout>
    </Router>
  );
}
