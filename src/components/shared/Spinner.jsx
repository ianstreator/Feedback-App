// import spinner from "../../assets/loader.svg";
const style = {
  display: "block",
};
function Spinner({ src, width }) {
  return <img src={src} alt="Loading..." style={style} width={width}></img>;
}

export default Spinner;
