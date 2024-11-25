import { GoogleAnalytics } from "nextjs-google-analytics";
import LandingPage from "./components/LandingPage";
export default function Home() {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <LandingPage />
    </>
  );
}
