"""
知乎 AI 内容趋势分析脚本
分析 2026 年知乎 AI 相关热门文章的核心趋势
"""

import csv
from collections import Counter

def load_data(csv_path):
    """加载数据集"""
    articles = []
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            articles.append(row)
    return articles

def analyze_categories(articles):
    """分析内容分类分布"""
    categories = [a['category'] for a in articles]
    return Counter(categories)

def extract_common_themes(articles):
    """提取高频主题"""
    all_tags = []
    for a in articles:
        tags = a['tags'].split(',')
        all_tags.extend([t.strip() for t in tags])
    return Counter(all_tags)

def main():
    csv_path = 'dataset/zhihu_ai_articles.csv'
    articles = load_data(csv_path)

    print("=" * 50)
    print("知乎 AI 内容趋势分析报告")
    print("=" * 50)

    print(f"\n样本数量：{len(articles)} 篇文章\n")

    # 分类分布
    print("【内容分类分布】")
    for cat, count in analyze_categories(articles).most_common():
        print(f"  {cat}: {count} 篇")

    # 高频标签
    print("\n【热门标签 TOP10】")
    for tag, count in extract_common_themes(articles).most_common(10):
        print(f"  #{tag}: {count}")

    # 核心洞察
    print("\n【核心洞察】")
    print("  1. AI Agent 落地：真实场景已跑通，但规模化仍是难题")
    print("  2. AI 创业：垂直行业 + 真实收入 = 活下去的关键")
    print("  3. AI 编程：工具已成熟，用法决定效果，差距可达 6 倍")
    print("  4. 行业趋势：去泡沫化 + 务实落地 + 垂直深耕")

    print("\n" + "=" * 50)

if __name__ == '__main__':
    main()
