<script>
  import { ArrowUpRight } from '@lucide/svelte'
  import { formatDate, posts } from './posts.js'

  const years = [...new Set(posts.map((post) => post.date.slice(0, 4)))]

  function postsForYear(year) {
    return posts.filter((post) => post.date.startsWith(year))
  }
</script>

<div class="archive-page page-enter">
  <header class="page-header">
    <p class="overline">THE ARCHIVE</p>
    <h1>过去写下的，<br />仍有回声。</h1>
    <p>按时间收回所有文章。一共 {posts.length} 篇，从最近的一篇开始。</p>
  </header>

  <div class="archive-groups">
    {#each years as year}
      <section class="archive-year" aria-labelledby="year-{year}">
        <div class="archive-year-heading">
          <h2 id="year-{year}">{year}</h2>
          <span>{postsForYear(year).length} 篇</span>
        </div>
        <div class="archive-list">
          {#each postsForYear(year) as post}
            <a href="#/post/{post.slug}" class="archive-row">
              <time datetime={post.date}>{formatDate(post.date).slice(5)}</time>
              <div>
                <h3>{post.title}</h3>
                <span>{post.category} · {post.readTime} 分钟</span>
              </div>
              <ArrowUpRight size={19} strokeWidth={1.5} aria-hidden="true" />
            </a>
          {/each}
        </div>
      </section>
    {/each}
  </div>
</div>
