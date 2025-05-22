import { useEffect } from "react";
import { useRouter } from "next/router";

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

const AdBanner = (props: AdsBannerProps) => {
  const router = useRouter();

  const carregarScript = () => {
    if (!document.getElementById("adsbygoogle-script")) {
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
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log("Erro ao carregar o banner de anúncios:", err);
    }
  }, [router.asPath]); // Recarrega quando a rota muda

  return (
    <div key={router.asPath}>
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

export default AdBanner;
