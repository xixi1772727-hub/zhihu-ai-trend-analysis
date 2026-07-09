/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'minimax-algeng-chat-tts.oss-cn-wulanchabu.aliyuncs.com'
      },
      {
        protocol: 'https',
        hostname: 'developer.zhihu.com'
      },
      {
        protocol: 'https',
        hostname: 'pic.zhimg.com'
      }
    ]
  }
};

module.exports = nextConfig;
