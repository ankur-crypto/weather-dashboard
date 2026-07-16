import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Weather Dashboard",
    short_name: "Weather",
    description:
      "Professional Weather Dashboard built with Next.js",

    start_url: "/",

    display: "standalone",

    background_color: "#020617",

    theme_color: "#020617",

    orientation: "portrait",

    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}