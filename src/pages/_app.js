import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAnalytics, logEvent } from "firebase/analytics";
import "@/styles/globals.css";
import "aos/dist/aos.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      const analytics = getAnalytics();
      logEvent(analytics, "page_view", {
        page_path: url,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}
