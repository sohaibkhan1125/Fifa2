// Share via Web Share API with clipboard fallback
export async function sharePrediction(predictions) {
  const winner = predictions.players[0];
  const shareText = `🏆 My FIFA World Cup 2026 Golden Boot Prediction:\n\n#1 ${winner.name} (${winner.flag}) — ${winner.predictedGoals} goals\n\nMake yours at PrimeTools!`;

  const shareData = {
    title: "FIFA World Cup 2026 Golden Boot Predictor",
    text: shareText,
    url: typeof window !== "undefined" ? window.location.href : "",
  };

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share(shareData);
      return { ok: true, method: "native" };
    } catch (e) {
      if (e.name === "AbortError") return { ok: false, method: "cancelled" };
    }
  }

  // Clipboard fallback
  try {
    await navigator.clipboard.writeText(`${shareText}\n${shareData.url}`);
    return { ok: true, method: "clipboard" };
  } catch (e) {
    return { ok: false, method: "failed" };
  }
}

// PNG export using html2canvas — targets the branded ShareableCard
export async function downloadAsPNG(elementId = "shareable-card", filename = "golden-boot-prediction") {
  if (typeof window === "undefined") return { ok: false };

  const element = document.getElementById(elementId);
  if (!element) return { ok: false, error: "Element not found" };

  try {
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 1.5,
      useCORS: true,
      logging: false,
      width: 1080,
      height: 1080,
      windowWidth: 1080,
      windowHeight: 1080,
    });
    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    return { ok: true };
  } catch (e) {
    console.error("PNG export failed:", e);
    return { ok: false, error: e.message };
  }
}
