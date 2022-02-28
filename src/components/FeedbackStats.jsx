import PropTypes from "prop-types";

function FeedbackStats({ feedback }) {
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

FeedbackStats.propTypes = {
  feedback: PropTypes.array.isRequired,
};

export default FeedbackStats;
