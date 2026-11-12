<script>
  import { onMount } from 'svelte'
  import { ArrowLeft, ArrowRight, Check, Copy } from '@lucide/svelte'
  import { formatDate, posts } from './posts.js'

  export let post
  let progress = 0
  let copied = false
  let copyTimer

  $: postIndex = posts.findIndex((item) => item.slug === post.slug)
  $: nextPost = posts[(postIndex + 1) % posts.length]

  function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    progress = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0
  }

  async function copyLink() {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const input = document.createElement('textarea')
      input.value = url
      input.style.position = 'fixed'
      input.style.opacity = '0'
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input.remove()
    }
    copied = true
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => copied = false, 2200)
  }

  onMount(() => {
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
      clearTimeout(copyTimer)
    }
  })
</script>

<div class="reading-progress" aria-hidden="true"><span style={`width: ${progress}%`}></span></div>

<article class="post-page page-enter">
  <a class="back-link" href="#/">
    <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" /> 返回文章列表
  </a>

  <header class="post-header">
    <div class="post-meta">
      <span>{post.category}</span>
      <time datetime={post.date}>{formatDate(post.date)}</time>
      <span>{post.readTime} 分钟阅读</span>
    </div>
    <h1>{post.title}</h1>
    <p class="post-intro">{post.intro}</p>
  </header>

  <div class="post-body">
    {#each post.sections as section, index}
      <section id="section-{index}" aria-labelledby="section-title-{index}">
        <h2 id="section-title-{index}">{section.heading}</h2>
        {#each section.paragraphs as paragraph}
          <p>{paragraph}</p>
        {/each}
        {#if section.quote}
          <blockquote>{section.quote}</blockquote>
        {/if}
      </section>
    {/each}
  </div>

  <footer class="post-footer">
    <div class="post-tags" aria-label="文章标签">
      {#each post.tags as tag}<span>{tag.trim()}</span>{/each}
    </div>
    <button class="copy-link" type="button" onclick={copyLink} aria-live="polite">
      {#if copied}
        <Check size={16} strokeWidth={1.6} aria-hidden="true" /> 链接已复制
      {:else}
        <Copy size={16} strokeWidth={1.6} aria-hidden="true" /> 复制本文链接
      {/if}
    </button>
  </footer>

  <a class="next-post" href="#/post/{nextPost.slug}">
    <span>下一篇</span>
    <strong>{nextPost.title}</strong>
    <ArrowRight size={24} strokeWidth={1.3} aria-hidden="true" />
  </a>
</article>
