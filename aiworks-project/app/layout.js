import './globals.css';

export const metadata = {
  title: '知乎 AI 趋势观测站',
  description: '基于知乎开放数据的AI内容趋势分析',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" data-theme="cyber">
      <body>{children}</body>
    </html>
  );
}
