<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <header class="page-header">
    <h1 class="page-header__title">{{ title }}</h1>
    <p
      v-if="subtitle"
      class="page-header__subtitle"
    >
      {{ subtitle }}
    </p>
  </header>
</template>

<style scoped>
.page-header {
  padding: 3rem 0 2rem;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 3rem;
}

.page-header__title {
  margin: 0 0 0.5rem;
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: -0.5px;
  color: #111827;
}

.page-header__subtitle {
  margin: 0;
  color: #9ca3af;
  font-size: 1.1rem;
}

@media (max-width: 760px) {
  .page-header {
    padding: 2rem 0 1.5rem;
    margin-bottom: 2rem;
  }
}
</style>
