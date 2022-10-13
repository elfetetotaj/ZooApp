import { Helmet } from "react-helmet-async";
import HomeView from "./HomeView";
import { Container } from "react-bootstrap";
import ParallaxView from "./ParallaxView";

function HomePage() {
  return (
    <div>
      <ParallaxView />
      <Container className="mt-3">
      <HomeView />
      </Container>
    </div>
  );
}
export default HomePage;
