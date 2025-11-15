import {withSentryConfig} from "@sentry/nextjs";
/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

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

export default withSentryConfig(withBundleAnalyzer(nextConfig), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "k-mart",

  project: "javascript-nextjs-commerce",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true
});