import Card from "../components/shared/Card";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <Card>
      Welcome to our about page!
      <br />
      <Link to="/">Navigate to HomePage</Link>
    </Card>
    // <div>Welcome to our about page!</div>
  );
}

export default AboutPage;
