<script setup lang="ts">
const { data: posts } = await useAsyncData('blogs-list', () =>
  queryCollection('blogs')
    .order('date', 'DESC')
    .all(),
)

useSeoMeta({
  title: 'Wilson | Blog',
  description: 'Wilson\'s Blog',
})

function formatDate(value: string) {
  return new Intl.DateTimeFormat('zh-CN', { dateStyle: 'long' }).format(new Date(value))
}
</script>

<template>
  <section class="blog-index">
    <div class="content-container">
      <PageHeader
        title="Blog"
        subtitle="欢迎阅读我的文章 👋"
      />

      <div
        v-if="posts?.length"
        class="blog-index__list"
      >
        <article
          v-for="post in posts"
          :key="post.id"
          class="post-card"
        >
          <p class="post-card__meta">
            {{ formatDate(post.date) }}
          </p>
          <h2 class="post-card__title">
            <NuxtLink :to="post.path">
              {{ post.title }}
            </NuxtLink>
          </h2>
          <p class="post-card__description">
            {{ post.description }}
          </p>
        </article>
      </div>

      <p
        v-else
        class="blog-index__empty"
      >
        还没有文章，新增 <code>content/blogs/*.md</code> 后这里会自动显示。
      </p>
    </div>
  </section>
</template>

<style scoped>
.blog-index {
  box-sizing: border-box;
  padding: 0 0 72px;
}

.blog-index__list {
  display: flex;
  flex-direction: column;
}

.post-card {
  padding: 0 0 40px;
  margin-bottom: 40px;
  border-bottom: 1px solid #e5e7eb;
}

.post-card:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.post-card__meta {
  margin: 0 0 10px;
  color: #6b7280;
  font-size: var(--font-size-sm);
}

.post-card__title {
  margin: 0;
  font-size: 26x;
  line-height: 1.2;
}

.post-card__title a {
  text-decoration: none;
}

.post-card__description {
  margin: 8px 0 0;
  color: #4b5563;
  line-height: 1.7;
}

.blog-index__empty {
  padding: 24px 0;
  border-top: 1px solid #e5e7eb;
  color: #4b5563;
}
</style>
