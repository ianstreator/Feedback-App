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
    if (method === "GET" || "DELETE") options = null;
    const backendUrl = id ? `/feedback/${id}` : "/feedback";
    const res = await fetch(backendUrl, options);
    const data = await res.json();
    if (method === "GET") {
      setFeedback(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
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
    // const data = await fetch(`http://localhost:5000/feedback/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(updateItem),
    // });
    setFeedback(
      feedback.map((item) => {
        if (item.id === id) {
          return { ...item, ...updatedItem };
        } else {
          return item;
        }
      })
    );
  };

  const deleteFeedback = async (id) => {
    if (window.confirm("are you sure you want to delete this feedback?")) {
      await feedbackCRUD({ method: "DELETE", id });
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedback = async (newFeedback) => {
    if (feedback.length) {
      let lastID = feedback[0].id;
      newFeedback.id = lastID + 1;
    } else {
      newFeedback.id = 1;
    }
    await feedbackCRUD({ method: "POST", body: newFeedback });
    setFeedback([newFeedback, ...feedback]);
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
