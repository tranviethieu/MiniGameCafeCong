// components/GoogleAd.tsx
import { useEffect } from "react";

const GoogleAd = () => {
  useEffect(() => {
    try {
      if ((window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-4705512319393842"
      data-ad-slot="f08c47fec0942fa0"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default GoogleAd;
