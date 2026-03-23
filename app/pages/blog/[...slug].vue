<script setup lang="ts">
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
</script>

<template>
  <article class="blog-post">
    <div class="blog-post__inner">
      <NuxtLink
        class="blog-post__back"
        to="/blog"
      >
        返回博客列表
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

      <ContentRenderer
        class="blog-post__body"
        :value="post!"
      />
    </div>
  </article>
</template>

<style scoped>
.blog-post {
  box-sizing: border-box;
  padding: 48px 20px 72px;
}

.blog-post__inner {
  max-width: 760px;
  margin: 0 auto;
}

.blog-post__back {
  display: inline-flex;
  margin-bottom: 24px;
  color: #6b7280;
  font-size: 14px;
  text-decoration: none;
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

:deep(.blog-post__body) {
  color: #111827;
  line-height: 1.85;
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
</style>
