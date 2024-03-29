import { FaEdit, FaTimes } from "react-icons/fa";
import { useContext } from "react";
import PropTypes from "prop-types";
import Card from "./shared/Card";
import FeedbackContext from "../Context/FeedbackContext";

function FeedbackItem({ item }) {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);
  const { id, text, rating } = item;
  return (
    <Card>
      <div className="num-display">{rating}</div>
      <button
        className="close"
        onClick={() => {
          deleteFeedback(id);
        }}
      >
        <FaTimes color="grey"></FaTimes>
      </button>
      <button className="edit" onClick={() => editFeedback(item)}>
        <FaEdit color="grey" />
      </button>
      <div className="text-display">{text}</div>
    </Card>
  );
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default FeedbackItem;
