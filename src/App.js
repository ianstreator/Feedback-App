import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats.jsx";
import FeedbackForm from "./components/FeedbackForm.jsx";
import FeedbackData from "./data/FeedbackData";
import AboutPage from "./pages/AboutPage.jsx";

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

  const deleteFeedback = (id) => {
    if (window.confirm("are you sure you want to delete this?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedback = (newFeedback) => {
    if (feedback[0]) {
      newFeedback.id = feedback[feedback.length - 1].id + 1;
    } else {
      newFeedback.id = 1;
    }
    setFeedback([...feedback, newFeedback]);
    console.log(newFeedback);
  };
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Route exact path='/'>
            <FeedbackForm handleAdd={addFeedback} />
            <FeedbackStats feedback={feedback} />
            <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
          </Route>

          <Route path="/about">
            <AboutPage />
          </Route>
        </div>
      </Router>
    </>
  );
}

export default App;
