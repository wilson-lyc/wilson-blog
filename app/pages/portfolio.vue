<script setup lang="ts">
useSeoMeta({
  title: 'Portfolio',
})

interface Project {
  title: string
  description: string
  tags: string[]
  link: string
}

const projects: Project[] = [
  {
    title: 'FindMyHouse — 找房工作台',
    description:
      '把散落在各平台（中介、小红书、豆瓣、贝壳、微信群等）的房源收进一个统一工作台。集成高德地图选址、通勤计算、多房源对比、数据看板与 AI 对话助手，帮助正在找房的人高效管理候选房源、做出决策。',
    tags: ['Vue 3', 'Fastify', 'TypeScript', 'AI'],
    link: 'https://github.com/wilson-lyc/FindMyHouse',
  },
]
</script>

<template>
  <section class="portfolio">
    <div class="content-container">
      <PageHeader
        title="Works & Projects"
        subtitle="精选项目与技术实践"
      />

      <main class="portfolio__grid">
        <article
          v-for="project in projects"
          :key="project.title"
          class="project-card"
        >
          <div>
            <div class="project-card__header">
              <h2 class="project-card__title">{{ project.title }}</h2>
              <p class="project-card__desc">{{ project.description }}</p>
            </div>
            <div class="project-card__tags">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="project-card__tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <a
            :href="project.link"
            class="project-card__link"
          >
            查看详情 &rarr;
          </a>
        </article>
      </main>
    </div>
  </section>
</template>

<style scoped>
.portfolio {
  box-sizing: border-box;
  padding: 0 0 72px;
}

.portfolio__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;
}

.project-card {
  border: 1px solid #e5e5e5;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.3s ease;
}

.project-card:hover {
  border-color: #111827;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transform: translateY(-2px);
}

.project-card__header {
  margin-bottom: 1.5rem;
}

.project-card__title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.project-card__desc {
  margin: 0;
  color: #9ca3af;
  font-size: 0.95rem;
  line-height: 1.5;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.project-card__tag {
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  background-color: #f5f5f5;
  color: #9ca3af;
  border-radius: 2px;
  font-family: monospace;
}

.project-card__link {
  align-self: flex-end;
  margin-top: 2rem;
  color: #111827;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.project-card__link:hover {
  border-bottom-color: #111827;
}

@media (max-width: 760px) {
  .portfolio__grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
