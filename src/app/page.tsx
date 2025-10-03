import PrettyText from "@/components/common/PrettyText";
import { memo, Suspense } from "react";
import Feed from "./views/Feed";
import { NewHero } from "./views/NewHero";
import { BlogPromo } from "./views/Sections/BlogPromo";
import { Special } from "./views/Sections/Special";

const HomeComponent = () => {
  return (<>
    <Suspense fallback={
      <PrettyText>Loading</PrettyText>
    }>
      <NewHero />
    </Suspense>
    <BlogPromo />
    <Special />
    <Feed />
  </>
  );
};

const Home = memo(HomeComponent)
export default Home;
