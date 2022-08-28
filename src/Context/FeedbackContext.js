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
    // fetchFeedback();
    CRUD({});
  }, []);

  const CRUD = async ({ method = "get", body = false, id = false }) => {
    let options =
      method !== "get"
        ? {
            method: `${method}`.toUpperCase(),
            headers: { "Content-Type": "application/json" },
          }
        : null;
    if (body) options["body"] = JSON.stringify(body);
    const backendUrl = id ? `/feedback/${id}` : "/feedback";
    const res = await fetch(backendUrl, options);
    const data = await res.json();
    if (options === null) {
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
    const updatedItem = await CRUD({ method: "patch", body: updateItem, id });
    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const deleteFeedback = async (id) => {
    if (window.confirm("are you sure you want to delete this feedback?")) {
      await CRUD({ method: "delete", id });
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
    await CRUD({ method: "post", body: newFeedback });
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
