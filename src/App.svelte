<script>
  import { onMount } from 'svelte'
  import { Menu, Search, X } from '@lucide/svelte'
  import Sidebar from './lib/Sidebar.svelte'
  import RightRail from './lib/RightRail.svelte'
  import Home from './lib/Home.svelte'
  import Archive from './lib/Archive.svelte'
  import About from './lib/About.svelte'
  import Post from './lib/Post.svelte'
  import SearchDialog from './lib/SearchDialog.svelte'
  import { getPost } from './lib/posts.js'

  function readRoute() {
    const path = window.location.hash.replace(/^#\/?/, '')
    if (path.startsWith('post/')) return { name: 'post', slug: decodeURIComponent(path.slice(5)) }
    if (path === 'archive') return { name: 'archive' }
    if (path === 'about') return { name: 'about' }
    return { name: 'home' }
  }

  let route = readRoute()
  let searchOpen = false
  let mobileOpen = false
  let theme = document.documentElement.dataset.theme || 'light'

  $: currentPost = route.name === 'post' ? getPost(route.slug) : null
  $: pageTitle = currentPost ? `${currentPost.title} — 一隅` : route.name === 'archive' ? '归档 — 一隅' : route.name === 'about' ? '关于 — 一隅' : '一隅 — 把想法，写成一页'
  $: document.title = pageTitle
  $: document.body.style.overflow = searchOpen || mobileOpen ? 'hidden' : ''

  function handleHashChange() {
    route = readRoute()
    mobileOpen = false
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light'
    document.documentElement.dataset.theme = theme
    localStorage.setItem('yiyu-theme', theme)
  }

  function handleGlobalKeydown(event) {
    const target = event.target
    const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault()
      searchOpen = !searchOpen
      mobileOpen = false
    }
    if (event.key === '/' && !isTyping && !searchOpen) {
      event.preventDefault()
      searchOpen = true
      mobileOpen = false
    }
    if (event.key === 'Escape') {
      mobileOpen = false
    }
  }

  function openSearch() {
    searchOpen = true
    mobileOpen = false
  }

  onMount(() => {
    if (!window.location.hash) history.replaceState(null, '', '#/')
    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('keydown', handleGlobalKeydown)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('keydown', handleGlobalKeydown)
      document.body.style.overflow = ''
    }
  })
</script>

<svelte:head>
  <meta name="description" content={currentPost?.excerpt || '一隅是一个关于设计、技术与日常生活的极简个人博客。'} />
</svelte:head>

<a class="skip-link" href="#main-content">跳到正文</a>

<header class="mobile-header">
  <a class="mobile-brand" href="#/" aria-label="一隅首页">一隅 <span>YIYU — NOTES</span></a>
  <div>
    <button class="icon-button" type="button" onclick={openSearch} aria-label="搜索文章">
      <Search size={20} strokeWidth={1.5} aria-hidden="true" />
    </button>
    <button class="icon-button" type="button" onclick={() => mobileOpen = !mobileOpen} aria-label={mobileOpen ? '关闭导航' : '打开导航'} aria-expanded={mobileOpen}>
      {#if mobileOpen}<X size={21} strokeWidth={1.5} aria-hidden="true" />{:else}<Menu size={21} strokeWidth={1.5} aria-hidden="true" />{/if}
    </button>
  </div>
</header>

<div class="site-shell">
  <div class="desktop-sidebar">
    <Sidebar {route} {theme} onSearch={openSearch} onToggleTheme={toggleTheme} />
  </div>

  <main id="main-content" class="main-content" tabindex="-1">
    {#if route.name === 'post' && currentPost}
      <Post post={currentPost} />
    {:else if route.name === 'archive'}
      <Archive />
    {:else if route.name === 'about'}
      <About />
    {:else}
      <Home />
    {/if}
  </main>

  <RightRail {route} post={currentPost} />
</div>

{#if mobileOpen}
  <div class="mobile-nav-layer">
    <Sidebar mobile {route} {theme} onSearch={openSearch} onToggleTheme={toggleTheme} onNavigate={() => mobileOpen = false} />
  </div>
{/if}

{#if searchOpen}
  <SearchDialog onClose={() => searchOpen = false} />
{/if}
