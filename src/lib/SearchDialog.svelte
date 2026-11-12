<script>
  import { onMount, tick } from 'svelte'
  import { ArrowRight, Search, X } from '@lucide/svelte'
  import { formatDate, posts } from './posts.js'

  export let onClose
  let query = ''
  let inputElement

  $: term = query.trim().toLowerCase()
  $: results = term
    ? posts.filter((post) => [post.title, post.excerpt, post.category, ...post.tags]
      .join(' ').toLowerCase().includes(term))
    : posts.slice(0, 5)

  function handleBackdrop(event) {
    if (event.target === event.currentTarget) onClose()
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') onClose()
  }

  onMount(async () => {
    await tick()
    inputElement?.focus()
  })
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="search-backdrop" onclick={handleBackdrop} role="presentation">
  <div class="search-dialog" role="dialog" aria-modal="true" aria-labelledby="search-title">
    <div class="search-dialog-top">
      <h2 id="search-title">搜索一隅</h2>
      <button class="icon-button" type="button" onclick={onClose} aria-label="关闭搜索">
        <X size={20} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </div>
    <label class="search-field">
      <Search size={21} strokeWidth={1.5} aria-hidden="true" />
      <span class="sr-only">输入文章标题、分类或标签</span>
      <input bind:this={inputElement} bind:value={query} type="search" placeholder="输入标题、分类或标签…" autocomplete="off" />
    </label>

    <div class="search-summary" aria-live="polite">
      <span>{term ? `找到 ${results.length} 篇相关文章` : '最近文章'}</span>
      {#if term}<button type="button" onclick={() => query = ''}>清除</button>{/if}
    </div>

    <div class="search-results">
      {#each results as post}
        <a href="#/post/{post.slug}" onclick={onClose}>
          <div>
            <span>{post.category} · {formatDate(post.date)}</span>
            <h3>{post.title}</h3>
          </div>
          <ArrowRight size={19} strokeWidth={1.4} aria-hidden="true" />
        </a>
      {:else}
        <div class="search-empty">
          <p>没有找到“{query.trim()}”</p>
          <span>试试更短的关键词，例如「设计」或「阅读」。</span>
        </div>
      {/each}
    </div>
    <footer class="search-hint"><kbd>ESC</kbd> 关闭 <span>·</span> 点击文章开始阅读</footer>
  </div>
</div>
