import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats.jsx";
import FeedbackForm from "./components/FeedbackForm.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import AboutIconLink from "./components/AboutIconLink";
import { FeedbackProvider } from "./Context/FeedbackContext";
import Notify from "./components/notify";

function App() {
  return (
    <>
      <FeedbackProvider>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <>
                    <Notify key={1} />
                    <FeedbackForm key={2} />
                    <FeedbackStats key={3} />
                    <FeedbackList key={4} />
                  </>
                }
              />

              <Route path="/About" element={<AboutPage />} />
            </Routes>
            <AboutIconLink></AboutIconLink>
          </div>
        </Router>
      </FeedbackProvider>
    </>
  );
}

export default App;
