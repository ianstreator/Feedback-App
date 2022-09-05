import FeedbackContext from "../Context/FeedbackContext";
import { useContext } from "react";
import Spinner from "./shared/Spinner";
import loading from "../assets/loading.svg";

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
      <h3>
        {isLoading ? (
          <div className="loading-reviews">
            Gathering reviews {<Spinner src={loading} width={20} />}
          </div>
        ) : (
          feedback.length + " " + (feedback.length === 1 ? "Review" : "Reviews")
        )}
      </h3>
      <h3>Avg. rating: {isNaN(avg) || isLoading ? 0 : avg}</h3>
    </div>
  );
}

export default FeedbackStats;
