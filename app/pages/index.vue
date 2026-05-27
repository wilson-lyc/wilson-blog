<script setup lang="ts">
useSeoMeta({
  title: "Wilson's Blog",
})
</script>

<template>
  <section class="home-hero">
    <p class="home-hero__eyebrow">Wilson's Blog</p>
    <TypeWriter />
  </section>
</template>

<style scoped>
.home-hero {
  box-sizing: border-box;
  display: grid;
  place-items: center;
  min-height: 70vh;
  padding: 40px 20px 72px;
  text-align: center;
}

.home-hero__eyebrow {
  margin: 0 0 12px;
  color: #9ca3af;
  font-size: var(--font-size-sm);
  letter-spacing: 0.28em;
}

</style>
