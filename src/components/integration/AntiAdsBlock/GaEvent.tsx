export default function GaEvent() {
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "anti_ads_block_detected", {
            event_category: "Bloqueio de anúncios",
            event_label: "Usuário com adblock",
            non_interaction: true,
        } as Record<string, unknown>);
        console.log("evento disparado - anti_ads_block_detected");
    } else {
        console.warn("gtag não encontrado no momento do disparo");
    }
}