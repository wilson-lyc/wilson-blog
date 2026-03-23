<template>
  <header class="site-header">
    <div class="site-header__inner">
      <div class="site-header__left">
        <a
          class="site-header__brand"
          href="/"
          aria-label="返回首页"
        >
          <img
            class="site-header__brand-icon"
            src="/brand.png"
            alt="品牌图标"
          >
        </a>

        <nav
          class="site-header__nav"
          aria-label="主导航"
        >
          <a
            v-for="item in navItems"
            :key="item.label"
            class="site-header__nav-link"
            :href="item.href"
          >
            {{ item.label }}
          </a>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const navItems = [
  { label: '首页', href: '/' },
  { label: '简历', href: '/resume' },
  { label: '博客', href: '/blog' },
]
</script>

<style scoped>
.site-header {
  box-sizing: border-box;
  width: 100%;
  min-height: 60px;
  padding: 0 20px;
}

.site-header__inner {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 900px;
  min-height: 60px;
  margin: 0 auto;
}

.site-header__left {
  display: flex;
  align-items: center;
  gap: 28px;
  width: 100%;
}

.site-header__brand {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.site-header__brand-icon {
  display: block;
  width: auto;
  height: 40px;
  object-fit: contain;
}

.site-header__nav {
  display: flex;
  align-items: center;
  gap: 24px;
}

.site-header__nav-link {
  position: relative;
  display: inline-flex;
  color: #111827;
  font-size: 14px;
  line-height: 1;
  text-decoration: none;
}

.site-header__nav-link::after {
  position: absolute;
  bottom: -6px;
  left: 50%;
  width: 100%;
  height: 1.5px;
  background: currentColor;
  content: "";
  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
  transition: transform 0.28s ease;
}

.site-header__nav-link:hover::after {
  transform: translateX(-50%) scaleX(1);
}
</style>
