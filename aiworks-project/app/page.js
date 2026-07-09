'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const myArticles = [
  { title: '2026年AI创业：我见过赚钱的，也见过倒闭的', category: 'AI创业', data: '40% AI创业公司倒闭。垂直行业+真实收入=活下去的关键', tags: ['AI创业', '垂直应用', 'YC'] },
  { title: '2026年AI Agent落地实况：哪些真的在用', category: 'AI Agent', data: '88%企业用AI，仅23%规模化，真正看到ROI仅12%', tags: ['Agent落地', '企业应用', 'ROI'] },
  { title: 'Cursor vs Copilot vs Claude Code 真实体验', category: 'AI编程', data: '93%开发者用AI，效率提升仅10%。差距在使用方式', tags: ['AI编程', '开发者工具', '效率'] },
  { title: 'WAIC 2026前瞻：从玩具变工具的转折', category: 'AI行业', data: '展览面积超10万㎡，300款全球首发产品', tags: ['WAIC', '具身智能', '机器人'] },
];

const wheelItems = ['AI创业', 'Agent落地', 'AI编程', 'WAIC前瞻'];

export default function Home() {
  const [theme, setTheme] = useState('cyber');
  const [hotList, setHotList] = useState([]);
  const [hotLoading, setHotLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState('点击中间转盘试试手气');
  const [spinRotation, setSpinRotation] = useState(0);
  const wheelRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    fetchHotList();
  }, [theme]);

  async function fetchHotList() {
    setHotLoading(true);
    try {
      const res = await fetch('/api/hot-list');
      if (res.ok) {
        const data = await res.json();
        setHotList(data.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setHotLoading(false);
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        const data = await res.json();
        setSearchResults(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSearchLoading(false);
    }
  }

  function spin() {
    if (spinning) return;
    setSpinning(true);
    setSpinResult('');
    const spins = 5 + Math.random() * 5;
    const segment = 360 / wheelItems.length;
    const randomIndex = Math.floor(Math.random() * wheelItems.length);
    const extraAngle = randomIndex * segment + segment / 2;
    const newRotation = spinRotation + spins * 360 + extraAngle;
    setSpinRotation(newRotation);
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${newRotation}deg)`;
    }
    setTimeout(() => {
      setSpinResult(`🎯 ${wheelItems[randomIndex]} — ${myArticles[randomIndex].data}`);
      setSpinning(false);
    }, 4000);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); spin(); }
  }

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="logo">
          <div className="logo-dot" />
          <span>AI 趋势观测站</span>
        </div>
        <div className="theme-switcher">
          {['cyber', 'space', 'minimal', 'forest'].map(t => (
            <button key={t} className={`theme-btn ${theme === t ? 'active' : ''}`} data-t={t} onClick={() => setTheme(t)} />
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <Image
          src="https://minimax-algeng-chat-tts.oss-cn-wulanchabu.aliyuncs.com/ccv2%2F2026-07-09%2FMiniMax-M2.7%2F2038577085806551563%2F314da29af528f4e0205c84b434ea00b918f7b3cf8824fcdd6955f73f5bb5ac21..jpeg"
          alt="封面"
          width={280}
          height={373}
          className="hero-cover"
          priority
        />
        <h1 className="hero-title">知乎 AI 内容趋势分析</h1>
        <p className="hero-subtitle">基于知乎开放数据的AI行业洞察，实时热榜 + 搜索分析</p>
        <div className="hero-stats">
          <div className="stat"><div className="stat-value">4</div><div className="stat-label">篇深度文章</div></div>
          <div className="stat"><div className="stat-value">实时</div><div className="stat-label">知乎热榜</div></div>
          <div className="stat"><div className="stat-value">知乎</div><div className="stat-label">开放数据</div></div>
        </div>
      </section>

      {/* MY ARTICLES */}
      <section className="section">
        <div className="section-label">My Works</div>
        <h2 className="section-title">精选内容</h2>
        <div className="cards-grid">
          {myArticles.map((a, i) => (
            <div className="card" key={i}>
              <div className="card-category">{a.category}</div>
              <h3 className="card-title">{a.title}</h3>
              <p className="card-data">{a.data}</p>
              <div className="card-tags">{a.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ZHIHU HOT LIST */}
      <section className="section">
        <div className="section-label">Live Data</div>
        <h2 className="section-title">知乎热榜</h2>
        {hotLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
            <div className="spinner" />
          </div>
        ) : hotList.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
            暂无数据，请检查 API 配置
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {hotList.slice(0, 10).map((item, i) => (
              <a key={i} href={item.url || `https://www.zhihu.com/question/${item.id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div className="hot-item">
                  <div className="hot-rank">{i + 1}</div>
                  <div className="hot-info">
                    <div className="hot-title">{item.title || item.question_title || '未知'}</div>
                    <div className="hot-metrics">
                      <span>🔥 {item.hot_score || item.heat_score || 0}</span>
                      <span>💬 {item.comment_count || item.reply_count || 0}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* SEARCH */}
      <section className="section">
        <div className="section-label">Search</div>
        <h2 className="section-title">搜索知乎</h2>
        <form className="search-box" onSubmit={handleSearch}>
          <input
            className="search-input"
            placeholder="输入关键词搜索..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button className="search-btn" type="submit" disabled={searchLoading}>
            {searchLoading ? <span className="spinner" /> : '搜索'}
          </button>
        </form>
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.slice(0, 5).map((r, i) => (
              <a key={i} href={r.Url || '#'} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div className="card">
                  <div className="card-title">{r.Title || '未知'}</div>
                  <p className="card-data">{r.ContentText || ''}</p>
                  <div className="card-tags">
                    <span className="tag">{r.ContentType}</span>
                    <span className="tag">👍 {r.VoteUpCount || 0}</span>
                    <span className="tag">💬 {r.CommentCount || 0}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* SPIN WHEEL */}
      <section className="spin-section">
        <div className="section-label">Lucky Draw</div>
        <h2 className="section-title">随机推荐</h2>
        <div className="spin-container">
          <div className="spin-pointer" />
          <div className="spin-wheel" ref={wheelRef}>
            <div className="spin-wheel-inner" />
            <div className="spin-center" onClick={spin} onKeyDown={handleKeyDown} tabIndex={0} role="button" aria-label="转盘">
              ↻
            </div>
          </div>
        </div>
        <div className={`spin-result ${spinResult ? 'show' : ''}`}>{spinResult}</div>
        <div className="spin-hint">点击中间转盘 · Enter 键旋转</div>
      </section>

      {/* FOOTER */}
      <footer>
        <p className="footer-text">
          数据来源：知乎开放平台 ·
          <a href="https://github.com/xixi1772727-hub/zhihu-ai-trend-analysis" className="footer-link" target="_blank" rel="noopener noreferrer"> GitHub</a>
        </p>
      </footer>
    </>
  );
}
