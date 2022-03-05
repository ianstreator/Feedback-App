import Card from "../components/shared/Card";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <Card>
      <h2>Welcome to our about page!</h2>
      <br />
      <Link to="/" className="Link">Navigate to HomePage</Link>
    </Card>
  );
}

export default AboutPage;
