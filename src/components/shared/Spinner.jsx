import spinner from "../../assets/loader.svg";
const style = {
  display: "block",
  width: "400px",
  margin: "auto",
};
function Spinner() {
  return <img src={spinner} alt="Loading..." style={style}></img>;
}

export default Spinner;
