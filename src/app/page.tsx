import { Skeleton } from "@/components/ui/skeleton";
import { detectDeviceType, trackVisit } from "@/services/trackVisit";
import { headers } from "next/headers";
import { memo, Suspense } from "react";
import Feed from "./views/Feed";
import { NewHero } from "./views/NewHero";
import { BlogPromo } from "./views/Sections/BlogPromo";
import { Special } from "./views/Sections/Special";

const HomeComponent = async () => {
  const headersList = await headers();
  const host = headersList.get("host");
  const userAgent = headersList.get("user-agent") || "";

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const deviceType = detectDeviceType(userAgent);
  const page = `${protocol}://${host}/`;
  await trackVisit(page, deviceType);
  return (
    <>
      <Suspense
        fallback={
          <div className="w-full bg-blue-50 relative mb-20">
            <div className="bg-blue-50 relative md:h-[90vh] w-full mx-auto sm:max-w-7xl">
              <Skeleton className="relative w-full p-4 h-[70vh] sm:h-fit md:scale-75 lg:scale-100 sm:max-w-7xl sm:rounded-3xl" />
            </div>
          </div>
        }
      >
        <NewHero />
      </Suspense>
      <BlogPromo />
      <Special />
      <Feed />
    </>
  );
};

const Home = memo(HomeComponent);
export default Home;
