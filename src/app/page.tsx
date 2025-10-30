import PrettyText from "@/components/common/PrettyText";
import { detectDeviceType, trackVisit } from "@/services/trackVisit";
import { headers } from "next/headers";
import { memo, Suspense } from "react";
import Feed from "./views/Feed";
import { NewHero } from "./views/NewHero";
import { BlogPromo } from "./views/Sections/BlogPromo";
import { Special } from "./views/Sections/Special";

const HomeComponent = async () => {
  const headersList = await headers();
  const host = headersList.get('host');
  const userAgent = headersList.get('user-agent') || '';

  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  const deviceType = detectDeviceType(userAgent);
  const page = `${protocol}://${host}/`
  await trackVisit(page, deviceType)
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
