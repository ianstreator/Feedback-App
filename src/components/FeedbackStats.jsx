import FeedbackContext from "../Context/FeedbackContext";
import { useContext } from "react";

function FeedbackStats() {
  const { feedback, isLoading } = useContext(FeedbackContext);
  if (!feedback.length) return <></>;
  let avg =
    Math.round(
      (feedback.reduce((acc, cur) => {
        return acc + cur.rating;
      }, 0) /
        feedback.length) *
        10
    ) / 10;

  return (
    <div className="feedback-stats">
      <h3>{feedback.length} Reviews</h3>
      <h3>Avg. rating: {isNaN(avg) || isLoading ? 0 : avg}</h3>
    </div>
  );
}

export default FeedbackStats;
