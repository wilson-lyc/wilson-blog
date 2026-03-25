<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const route = useRoute()

const currentPath = computed(() => {
  const path = route.path.replace(/\/+$/, '')
  return path || '/'
})

const { data: post } = await useAsyncData(
  () => `blog:${currentPath.value}`,
  () => queryCollection('blog').where('path', '=', currentPath.value).first(),
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '文章不存在',
  })
}

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
})

function formatDate(value: string) {
  return new Intl.DateTimeFormat('zh-CN', { dateStyle: 'long' }).format(new Date(value))
}

type TocLink = {
  id?: string
  text?: string
  depth?: number
  children?: TocLink[]
}

const tocCollapsed = ref(false)
const activeHash = ref('')

const syncActiveHash = () => {
  activeHash.value = window.location.hash
}

const flatTocLinks = computed(() => {
  const source = (post.value as { body?: { toc?: { links?: TocLink[] } }; toc?: { links?: TocLink[] } } | null)
  const links = source?.body?.toc?.links ?? source?.toc?.links ?? []
  const result: Array<{ id: string; text: string; depth: number }> = []

  const walk = (items: TocLink[]) => {
    for (const item of items) {
      if (item.id && item.text) {
        result.push({
          id: item.id,
          text: item.text,
          depth: item.depth ?? 2,
        })
      }

      if (item.children?.length) {
        walk(item.children)
      }
    }
  }

  walk(links)
  return result
})

const hasToc = computed(() => flatTocLinks.value.length > 0)

const scrollToHeading = (id: string) => {
  const target = document.getElementById(id)

  if (!target) {
    return
  }

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })

  history.replaceState(null, '', `#${id}`)
  activeHash.value = `#${id}`
}

onMounted(() => {
  syncActiveHash()
  window.addEventListener('hashchange', syncActiveHash)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', syncActiveHash)
})
</script>

<template>
  <article class="blog-post">
    <div class="blog-post__inner">
      <div class="blog-post__layout">
        <div class="blog-post__main">
          <NuxtLink
            class="blog-post__back"
            to="/blog"
          >
            <span
              class="blog-post__back-icon"
              aria-hidden="true"
            >
              ←
            </span>
            <span>返回</span>
          </NuxtLink>

          <header class="blog-post__header">
            <p class="blog-post__meta">
              {{ formatDate(post!.date) }}
            </p>
            <h1>{{ post!.title }}</h1>
            <p class="blog-post__description">
              {{ post!.description }}
            </p>
          </header>

          <aside
            v-if="hasToc"
            class="blog-post__toc"
          >
            <div
              class="blog-post__toc-card"
              :class="{ 'blog-post__toc-card--collapsed': tocCollapsed }"
            >
              <button
                class="blog-post__toc-toggle"
                type="button"
                :aria-expanded="String(!tocCollapsed)"
                @click="tocCollapsed = !tocCollapsed"
              >
                <span>目录</span>
                <span
                  class="blog-post__toc-toggle-icon"
                  :class="{ 'blog-post__toc-toggle-icon--collapsed': tocCollapsed }"
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>

              <nav
                v-show="!tocCollapsed"
                class="blog-post__toc-nav"
                aria-label="文章目录"
              >
                <a
                  v-for="item in flatTocLinks"
                  :key="item.id"
                  class="blog-post__toc-link"
                  :class="[
                    `blog-post__toc-link--depth-${Math.min(item.depth, 6)}`,
                    { 'blog-post__toc-link--active': activeHash === `#${item.id}` },
                  ]"
                  :href="`#${item.id}`"
                  @click.prevent="scrollToHeading(item.id)"
                >
                  {{ item.text }}
                </a>
              </nav>
            </div>
          </aside>

          <ContentRenderer
            class="blog-post__body"
            :value="post!"
          />
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.blog-post {
  box-sizing: border-box;
  padding: 48px 20px 72px;
}

.blog-post__inner {
  position: relative;
  max-width: 760px;
  margin: 0 auto;
}

.blog-post__main {
  min-width: 0;
}

.blog-post__back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  color: #6b7280;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.24s ease;
}

.blog-post__back-icon {
  display: inline-flex;
  line-height: 1;
  transition: transform 0.24s ease;
}

.blog-post__back:hover {
  color: #111827;
}

.blog-post__back:hover .blog-post__back-icon {
  transform: translateX(-4px);
}

.blog-post__header {
  margin-bottom: 32px;
}

.blog-post__meta {
  margin: 0 0 10px;
  color: #6b7280;
  font-size: 14px;
}

.blog-post__header h1 {
  margin: 0;
  font-size: clamp(34px, 5vw, 54px);
  line-height: 1.08;
}

.blog-post__description {
  margin: 16px 0 0;
  color: #4b5563;
  font-size: 18px;
  line-height: 1.75;
}

.blog-post__toc {
  position: fixed;
  top: 88px;
  right: max(20px, calc(50vw - 640px));
  width: clamp(180px, 18vw, 220px);
}

.blog-post__toc :deep(*) {
  box-sizing: border-box;
}

.blog-post__toc-card {
  max-height: calc(100vh - 112px);
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  background: rgb(255 255 255 / 88%);
  backdrop-filter: saturate(180%) blur(14px);
  -webkit-backdrop-filter: saturate(180%) blur(14px);
}

.blog-post__toc-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 14px 16px;
  border: 0;
  background: transparent;
  color: #111827;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}

.blog-post__toc-toggle-icon {
  display: inline-flex;
  transition: transform 0.24s ease;
}

.blog-post__toc-toggle-icon--collapsed {
  transform: rotate(-90deg);
}

.blog-post__toc-nav {
  display: grid;
  gap: 4px;
  max-height: calc(100vh - 170px);
  overflow-y: auto;
  padding: 0 10px 12px;
}

.blog-post__toc-link {
  display: block;
  padding: 8px 10px;
  border-radius: 10px;
  color: #4b5563;
  font-size: 13px;
  line-height: 1.45;
  text-decoration: none;
  transition:
    background-color 0.24s ease,
    color 0.24s ease,
    transform 0.24s ease;
}

.blog-post__toc-link:hover {
  background: #f3f4f6;
  color: #111827;
  transform: translateX(2px);
}

.blog-post__toc-link--active {
  background: #f3f4f6;
  color: #111827;
}

.blog-post__toc-link--depth-3 {
  padding-left: 20px;
}

.blog-post__toc-link--depth-4 {
  padding-left: 30px;
}

.blog-post__toc-link--depth-5 {
  padding-left: 40px;
}

.blog-post__toc-link--depth-6 {
  padding-left: 50px;
}

:deep(.blog-post__body) {
  color: #111827;
  line-height: 1.85;
}

:deep(.blog-post__body h1),
:deep(.blog-post__body h2),
:deep(.blog-post__body h3),
:deep(.blog-post__body h4),
:deep(.blog-post__body h5),
:deep(.blog-post__body h6) {
  color: #111827;
  scroll-margin-top: 96px;
}

:deep(.blog-post__body h1 a),
:deep(.blog-post__body h2 a),
:deep(.blog-post__body h3 a),
:deep(.blog-post__body h4 a),
:deep(.blog-post__body h5 a),
:deep(.blog-post__body h6 a) {
  color: inherit;
  text-decoration: none;
}

:deep(.blog-post__body h2),
:deep(.blog-post__body h3) {
  margin-top: 2.2em;
  margin-bottom: 0.7em;
  line-height: 1.25;
}

:deep(.blog-post__body p),
:deep(.blog-post__body ul),
:deep(.blog-post__body ol),
:deep(.blog-post__body pre) {
  margin: 1.1em 0;
}

:deep(.blog-post__body a) {
  color: #0f766e;
}

:deep(.blog-post__body code) {
  padding: 0.15em 0.35em;
  border-radius: 6px;
  background: #f3f4f6;
  font-size: 0.9em;
}

:deep(.blog-post__body pre) {
  overflow-x: auto;
  padding: 16px;
  border-radius: 16px;
  background: #111827;
  color: #f9fafb;
}

:deep(.blog-post__body pre code) {
  padding: 0;
  background: transparent;
  color: inherit;
}

@media (max-width: 1280px) {
  .blog-post__toc {
    top: 76px;
    right: 16px;
    width: 188px;
  }
}

@media (max-width: 1100px) {
  .blog-post__toc {
    position: static;
    width: auto;
    margin-bottom: 24px;
  }

  .blog-post__toc-card {
    max-height: none;
  }

  .blog-post__toc-nav {
    max-height: none;
    overflow-y: visible;
  }
}
</style>
