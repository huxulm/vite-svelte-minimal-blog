<script>
  import { ArrowUpRight } from '@lucide/svelte'
  import { formatDate, posts } from './posts.js'

  export let route
  export let post

  function goToSection(index) {
    document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
</script>

<aside class="right-rail" aria-label="旁注">
  {#if route.name === 'post' && post}
    <section class="rail-section">
      <h2>本文</h2>
      <dl class="post-facts">
        <div><dt>发布</dt><dd>{formatDate(post.date)}</dd></div>
        <div><dt>分类</dt><dd>{post.category}</dd></div>
        <div><dt>阅读</dt><dd>约 {post.readTime} 分钟</dd></div>
      </dl>
    </section>
    <section class="rail-section">
      <h2>目录</h2>
      <nav class="toc" aria-label="文章目录">
        {#each post.sections as section, index}
          <button type="button" onclick={() => goToSection(index)}>{section.heading}</button>
        {/each}
      </nav>
    </section>
  {:else if route.name === 'archive'}
    <section class="rail-section">
      <h2>档案</h2>
      <p class="rail-big-number">{posts.length}</p>
      <p>篇文章，按时间倒序保存。旧文章不会为了显得常新而修改日期。</p>
    </section>
    <section class="rail-section">
      <h2>源码</h2>
      <p>这个博客由 Vite 与 Svelte 构建，文章、样式和交互都保持简单透明。</p>
      <a class="rail-link" href="https://github.com/huxulm/vite-svelte-minimal-blog" target="_blank" rel="noreferrer">查看源码 <ArrowUpRight size={14} aria-hidden="true" /></a>
    </section>
  {:else if route.name === 'about'}
    <section class="rail-section">
      <h2>一隅之外</h2>
      <p>代码、实验，以及一些尚未成为文章的过程，会留在 GitHub。</p>
      <a class="rail-link" href="https://github.com/huxulm" target="_blank" rel="noreferrer">@huxulm <ArrowUpRight size={14} aria-hidden="true" /></a>
    </section>
    <section class="rail-section">
      <h2>写作原则</h2>
      <p>不追热点。<br />不制造确定感。<br />不把简单事情说复杂。</p>
    </section>
  {:else}
    <section class="rail-section now-section">
      <h2>此刻</h2>
      <div class="now-item">
        <span>正在读</span>
        <strong>《观看之道》</strong>
        <small>约翰·伯格</small>
      </div>
      <div class="now-item">
        <span>正在练习</span>
        <strong>把句子写短</strong>
        <small>也把事情看清</small>
      </div>
    </section>
    <section class="rail-section quote-section">
      <h2>一句</h2>
      <blockquote>“我们必须度过的时间，比我们能理解的时间更多。”</blockquote>
      <p>— 写在某个周日下午</p>
    </section>
    <section class="rail-section">
      <h2>更新</h2>
      <p>每月两三篇。没有固定日期，只在有话可说的时候。</p>
    </section>
  {/if}
</aside>
