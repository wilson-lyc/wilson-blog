<script setup lang="ts">
useSeoMeta({
  title: 'Resume',
})
</script>

<template>
  <section class="resume-placeholder">
    <p class="resume-placeholder__eyebrow">Resume</p>
    <h1 class="resume-placeholder__title">Coming Soon</h1>
  </section>
</template>

<style scoped>
.resume-placeholder {
  box-sizing: border-box;
  display: grid;
  place-items: center;
  min-height: 70vh;
  padding: 40px 20px 72px;
  text-align: center;
}

.resume-placeholder__eyebrow {
  margin: 0 0 12px;
  color: #9ca3af;
  font-size: var(--font-size-sm);
  letter-spacing: 0.28em;
}

.resume-placeholder__title {
  margin: 0;
  color: #111827;
  font-size: clamp(40px, 10vw, 84px);
  font-weight: 700;
  line-height: 0.98;
}
</style>
