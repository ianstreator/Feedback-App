import spinner from "../../assets/homer-loading.gif";
const style = {
  display: "block",
  width: "400px",
  margin: "auto",
};
function Spinner() {
  return <img src={spinner} alt="Loading..." style={style}></img>;
}

export default Spinner;
