import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    feedbackCRUD({});
  }, []);

  const feedbackCRUD = async ({ method = "GET", body = false, id = false }) => {
    let options = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    if (method === "GET" || method === "DELETE") {
      options = {
        method,
      };
    }
    const backendUrl = id ? `/feedback/${id}` : "/feedback";
    const res = await fetch(backendUrl, options);
    const data = await res.json();
    if (method === "GET") {
      setFeedback(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return;
    }
    return data;
  };

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  const updateFeedback = async (id, updateItem) => {
    const updatedItem = await feedbackCRUD({
      method: "PUT",
      body: updateItem,
      id,
    });
    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const deleteFeedback = async (id) => {
    if (window.confirm("are you sure you want to delete this feedback?")) {
      await feedbackCRUD({ method: "DELETE", id });
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedback = async (newFeedback) => {
    const data = await feedbackCRUD({ method: "POST", body: newFeedback });
    setFeedback([data, ...feedback]);
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
