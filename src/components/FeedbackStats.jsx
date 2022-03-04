import FeedbackContext from "../Context/FeedbackContext";
import { useContext } from "react";

function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext);

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
      <h4>{feedback.length} Reviews</h4>
      <h4>Avg. rating: {isNaN(avg) ? 0 : avg}</h4>
    </div>
  );
}



export default FeedbackStats;
