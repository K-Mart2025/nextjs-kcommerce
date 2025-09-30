import { memo } from "react";
import { NewHero } from "../components/views/NewHero";
import Feed from "./views/Feed";
import { BlogPromo } from "./views/Sections/BlogPromo";
import { Special } from "./views/Sections/Special";

const HomeComponent = () => {
  return (<>
    <NewHero />
    <BlogPromo />
    <Special />
    <Feed />
  </>
  );
};

const Home = memo(HomeComponent)
export default Home;
