<script>
  import { ArrowUpRight } from '@lucide/svelte'
</script>

<div class="about-page page-enter">
  <header class="page-header about-header">
    <p class="overline">ABOUT YIYU</p>
    <h1>一隅，是留给<br />长期思考的位置。</h1>
  </header>

  <div class="about-prose">
    <p class="about-lead">这里是一个关于设计、技术与日常生活的个人博客。不追逐更新频率，也不试图回答所有问题，只记录那些经过一段时间的沉淀，仍然值得写下来的事。</p>

    <section>
      <h2>为什么叫「一隅」</h2>
      <p>一隅不是世界的中心，只是一个能坐下来、看清眼前事物的小角落。互联网很宽阔，我希望这里足够小：小到每篇文章都能被认真阅读，也小到作者始终知道自己为什么写。</p>
    </section>

    <section>
      <h2>写作的三个约定</h2>
      <dl class="principles-list">
        <div>
          <dt>写具体的事</dt>
          <dd>从一次散步、一个页面或一段代码出发，不用抽象词汇代替真实经验。</dd>
        </div>
        <div>
          <dt>保留复杂性</dt>
          <dd>不为了得到一个漂亮结论，过早抹平问题里的矛盾与犹疑。</dd>
        </div>
        <div>
          <dt>允许慢慢更新</dt>
          <dd>文章可以在发布后继续修订。准确的表达，比抢占时间更重要。</dd>
        </div>
      </dl>
    </section>

    <section>
      <h2>保持联系</h2>
      <p>如果你也在做相似的事情，欢迎通过 GitHub 找到我。博客的完整源码与后续修改也会保存在那里。</p>
      <div class="about-links">
        <a class="solid-link" href="https://github.com/huxulm" target="_blank" rel="noreferrer">
          访问 GitHub <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    </section>
  </div>
</div>
