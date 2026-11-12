<script>
  import { ArrowRight } from '@lucide/svelte'
  import { categories, formatDate, posts } from './posts.js'

  let activeCategory = '全部'
  const featured = posts[0]

  $: filteredPosts = activeCategory === '全部'
    ? posts.slice(1)
    : posts.filter((post) => post.category === activeCategory)
</script>

<div class="home-page page-enter">
  <section class="home-hero" aria-labelledby="home-title">
    <p class="overline">A QUIET PLACE TO THINK</p>
    <h1 id="home-title">
      <span>把想法，</span>
      <span class="title-offset">写成一页。</span>
    </h1>
    <p class="hero-intro">这里不谈效率神话，也不追赶所有新鲜事。<br />只把值得留下的观察，慢慢写清楚。</p>
    <a class="text-link hero-link" href="#/post/{featured.slug}">
      阅读最新一篇 <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
    </a>
  </section>

  <section class="featured-story" aria-labelledby="featured-title">
    <div class="section-heading-row">
      <h2 id="featured-title">最近更新</h2>
      <span>{formatDate(featured.date)}</span>
    </div>
    <a class="featured-link" href="#/post/{featured.slug}">
      <div class="post-meta">
        <span>{featured.category}</span>
        <span>{featured.readTime} 分钟阅读</span>
      </div>
      <h3>{featured.title}</h3>
      <p>{featured.excerpt}</p>
      <span class="read-more">继续阅读 <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" /></span>
    </a>
  </section>

  <section class="article-index" aria-labelledby="index-title">
    <div class="section-heading-row index-heading">
      <h2 id="index-title">文章索引</h2>
      <span>{posts.length} 篇</span>
    </div>
    <div class="category-filter" aria-label="按分类筛选文章">
      {#each categories as category}
        <button
          type="button"
          class:active={activeCategory === category}
          aria-pressed={activeCategory === category}
          onclick={() => activeCategory = category}
        >{category}</button>
      {/each}
    </div>

    <div class="post-list" aria-live="polite">
      {#each filteredPosts as post (post.slug)}
        <a class="post-row" href="#/post/{post.slug}">
          <time datetime={post.date}>{formatDate(post.date)}</time>
          <div class="post-row-content">
            <span class="post-row-category">{post.category}</span>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
          </div>
          <ArrowRight class="post-row-arrow" size={20} strokeWidth={1.4} aria-hidden="true" />
        </a>
      {:else}
        <p class="empty-state">这个分类还没有文章。</p>
      {/each}
    </div>
  </section>
</div>
