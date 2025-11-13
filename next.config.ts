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
  productionBrowserSourceMaps: false,
  webpack(config: { optimization: { minimizer: any[]; }; }, { isServer, dev }: any) {
    if (!dev && !isServer) {
      // find the TerserPlugin instance that Next already inserts
      const terser = config.optimization.minimizer.find(
        m => m.constructor.name === 'TerserPlugin'
      );
      if (terser) {
        // minify vendor chunks too + drop console
        terser.options.terserOptions.compress.drop_console = true;
        terser.options.terserOptions.compress.drop_debugger = true;
        terser.options.terserOptions.mangle = { safari10: true };
        terser.options.terserOptions.format = { comments: false };
        terser.options.include = undefined; // remove the default exclude
      }
    }
    return config;
  },
};

export default nextConfig;
