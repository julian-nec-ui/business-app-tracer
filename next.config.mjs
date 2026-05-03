/** 
 * @type {import('next').NextConfig}
 */
 
const nextConfig = {
  distDir: ".next",
  images: {
    unoptimized: true, // Required for static export unless using a custom loader
  },
  // Optional: Add trailing slashes to keep /page/index.html structure
  trailingSlash: true, 
  reactCompiler: true,
  cacheComponents: true
};

export default nextConfig;
