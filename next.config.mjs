import MDX from "@next/mdx"
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

const withMDX = MDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: "@mdx-js/react",
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
  reactStrictMode: true,
  // experimental: {
  //   appDir: true,
  // },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack: (config, options) => {
    config.experiments.topLevelAwait = true

    return config
  },
  images: {
    unoptimized: true,
  },
})

export default nextConfig
