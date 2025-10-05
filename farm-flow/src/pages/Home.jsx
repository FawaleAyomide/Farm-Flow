import SplashScreen from "../Auth/SplashScreen";
import OnboardingScreen from "../Auth/OnboardingScreen";
import Favourites from "./Favourites";

const Home = () => {
  return (
    <div className="home-page">
      {/* Splash and onboarding screens */}
      <SplashScreen />
      <OnboardingScreen />
      {/* Optionally show favourites below */}
      <Favourites />
    </div>
  );
};

export default Home;