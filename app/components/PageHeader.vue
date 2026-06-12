<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <header class="page-header">
    <div class="page-header__content">
      <h1 class="page-header__title">{{ title }}</h1>
      <p
        v-if="subtitle"
        class="page-header__subtitle"
      >
        {{ subtitle }}
      </p>
    </div>
    <div class="page-header__actions">
      <slot name="actions"></slot>
    </div>
  </header>
</template>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0 20px;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 20px;
}

.page-header__content {
  flex: 1;
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

.page-header__actions {
  flex-shrink: 0;
  margin-left: 24px;
}

@media (max-width: 760px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 40px 0 20px;
    margin-bottom: 20px;
  }

  .page-header__actions {
    margin-left: 0;
    margin-top: 16px;
  }
}
</style>
