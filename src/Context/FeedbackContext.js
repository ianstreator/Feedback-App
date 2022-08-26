import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    console.log("hello world");
    fetchFeedback();
  }, []);
  const fetchFeedback = async () => {
    const res = await fetch("http://localhost:5000/feedback");
    const data = await res.json();
    setFeedback(data);
    setIsLoading(false);
  };

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

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
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
