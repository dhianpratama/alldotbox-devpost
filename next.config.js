/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode:false,
  experimental: {
    serverActions: {
      allowedOrigins: ["app.localhost:3000", "secondcourt.com", "alldotbox.com","all.box"],
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: "img.reservoir.tools" },
      { hostname: "7vg40ehl3esvubmf.public.blob.vercel-storage.com" },
      { hostname: "public.blob.vercel-storage.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "abs.twimg.com" },
      { hostname: "pbs.twimg.com" },
      { hostname: "avatar.vercel.sh" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "www.google.com" },
      { hostname: "flag.vercel.app" },
      { hostname: "illustrations.popsy.co" },
    ],
  },
};
