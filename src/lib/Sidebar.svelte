<script>
  import { ArrowUpRight, Moon, Search, Sun } from '@lucide/svelte'

  export let route
  export let theme
  export let mobile = false
  export let onSearch
  export let onToggleTheme
  export let onNavigate = () => {}

  const navItems = [
    { name: '文章', href: '#/', key: 'home' },
    { name: '归档', href: '#/archive', key: 'archive' },
    { name: '关于', href: '#/about', key: 'about' }
  ]

  $: activeKey = route.name === 'post' ? 'home' : route.name
</script>

<aside class:mobile class="sidebar" aria-label={mobile ? '移动端导航' : '主导航'}>
  <div class="brand-block">
    <a class="brand" href="#/" onclick={onNavigate} aria-label="一隅博客首页">
      <span class="brand-name">一隅</span>
      <span class="brand-en">YIYU — NOTES</span>
    </a>
    <p class="brand-description">记录设计、技术<br />与日常生活。</p>
  </div>

  <nav class="primary-nav" aria-label="页面">
    {#each navItems as item}
      <a
        href={item.href}
        class:active={activeKey === item.key}
        aria-current={activeKey === item.key ? 'page' : undefined}
        onclick={onNavigate}
      >
        <span>{item.name}</span>
        <span class="nav-mark" aria-hidden="true">↗</span>
      </a>
    {/each}
  </nav>

  <div class="sidebar-actions">
    <button class="search-trigger" type="button" onclick={onSearch} aria-label="搜索文章，快捷键 Command K">
      <Search size={17} strokeWidth={1.6} aria-hidden="true" />
      <span>搜索文章</span>
      <kbd>⌘ K</kbd>
    </button>
    <button class="theme-trigger" type="button" onclick={onToggleTheme} aria-label={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}>
      {#if theme === 'light'}
        <Moon size={17} strokeWidth={1.6} aria-hidden="true" />
        <span>深色模式</span>
      {:else}
        <Sun size={17} strokeWidth={1.6} aria-hidden="true" />
        <span>浅色模式</span>
      {/if}
    </button>
  </div>

  <div class="sidebar-footer">
    <a href="https://github.com/huxulm" target="_blank" rel="noreferrer">
      GitHub <ArrowUpRight size={13} strokeWidth={1.6} aria-hidden="true" />
    </a>
    <span>© 2026 一隅</span>
  </div>
</aside>
