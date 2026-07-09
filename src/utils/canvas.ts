import { Resvg } from "@resvg/resvg-js";

/**
 * Converts an animated/static SVG string into a static PNG buffer.
 * Note: Since SVG contains CSS animation, the rendered PNG represents the static initial state (frame 0).
 */
export function convertSVGToPNG(svgString: string, width = 1200): Buffer {
  const resvg = new Resvg(svgString, {
    fitTo: {
      mode: "width",
      value: width,
    },
    font: {
      loadSystemFonts: true, // Use system fonts (like Segoe UI, Arial)
    },
  });

  const pngData = resvg.render();
  return pngData.asPng();
}
