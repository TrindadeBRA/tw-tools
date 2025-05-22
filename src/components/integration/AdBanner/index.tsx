import { useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from 'next/dynamic';

// Declaração global para o tipo adsbygoogle
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

// Interface para as props do componente
interface AdsBannerProps {
  "data-ad-slot": string;
  "data-ad-format": string;
  "data-full-width-responsive": string;
  "data-ad-layout"?: string;
}

const AdBannerComponent = (props: AdsBannerProps) => {
  const pathname = usePathname();

  const carregarScript = () => {
    if (typeof window !== 'undefined' && !document.getElementById("adsbygoogle-script")) {
      const script = document.createElement("script");
      script.id = "adsbygoogle-script";
      script.async = true;
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9804371639852685";
      document.head.appendChild(script);
    }
  };

  useEffect(() => {
    try {
      carregarScript();
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.log("Erro ao carregar o banner de anúncios:", err);
    }
  }, [pathname]);

  return (
    <div key={pathname}>
      <ins
        className="adsbygoogle adbanner-customize"
        style={{
          display: "block",
          overflow: "hidden",
        }}
        data-adtest="on"
        data-ad-client={"ca-pub-9804371639852685"}
        {...props}
      />
    </div>
  );
};

// Export a dynamically loaded version that only runs on client-side
const AdBanner = dynamic(() => Promise.resolve(AdBannerComponent), {
  ssr: false
});

export default AdBanner;
