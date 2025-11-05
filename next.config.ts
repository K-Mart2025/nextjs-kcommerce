const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const remotePatterns: {
  protocol: string;
  hostname: string;
  port?: string;
  pathname?: string;
}[] = [];

if (apiUrl) {
  const parsed = new URL(apiUrl);
  remotePatterns.push({
    protocol: parsed.protocol.replace(":", ""), // e.g. "https"
    hostname: parsed.hostname,                  // e.g. "miservidor.misitio.run.place"
    port: parsed.port || "",
    pathname: "/uploads/**",
  });
}

// fallback/local + others
remotePatterns.push(
  {
    protocol: "http",
    hostname: "localhost",
    port: "3000",
    pathname: "/uploads/**",
  },
  {
    protocol: "https",
    hostname: "images.pexels.com",
  }
);

const nextConfig = {
  images: {
    remotePatterns,
  },
  output: "standalone",
};

export default nextConfig;
