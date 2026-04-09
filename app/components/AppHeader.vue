<template>
  <header
    class="site-header"
    :class="{
      'site-header--scrolled': isScrolled,
      'site-header--menu-open': isMenuOpen,
    }"
  >
    <div class="site-header__inner">
      <div class="site-header__bar">
        <button
          class="site-header__menu-button"
          type="button"
          :aria-expanded="String(isMenuOpen)"
          aria-controls="site-header-nav"
          aria-label="打开导航菜单"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span class="site-header__menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <a
          class="site-header__brand"
          href="/"
          aria-label="返回首页"
        >
          <img
            class="site-header__brand-icon"
            :src="brandIcon"
            alt="品牌图标"
          >
        </a>
      </div>

      <nav
        id="site-header-nav"
        class="site-header__nav"
        :class="{ 'site-header__nav--open': isMenuOpen }"
        aria-label="主导航"
      >
        <a
          v-for="item in navItems"
          :key="item.label"
          class="site-header__nav-link"
          :href="item.href"
          @click="isMenuOpen = false"
        >
          {{ item.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import brandIcon from '~/assets/images/brand.png'

const navItems = [
  { label: '首页', href: '/' },
  { label: '简历', href: '/resume' },
  { label: '博客', href: '/blog' },
]

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const updateScrollState = () => {
  isScrolled.value = window.scrollY > 8
}

const handleResize = () => {
  if (window.innerWidth > 760) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  updateScrollState()
  handleResize()
  window.addEventListener('scroll', updateScrollState, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollState)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.site-header {
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  min-height: 60px;
  padding: 0 20px;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition:
    background-color 0.28s ease,
    border-color 0.28s ease,
    backdrop-filter 0.28s ease,
    -webkit-backdrop-filter 0.28s ease;
}

.site-header--scrolled {
  background: rgb(255 255 255 / 72%);
  border-bottom-color: #e5e7eb;
  backdrop-filter: saturate(180%) blur(18px);
  -webkit-backdrop-filter: saturate(180%) blur(18px);
}

.site-header__inner {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 28px;
  max-width: 900px;
  min-height: 60px;
  margin: 0 auto;
}

.site-header__bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  min-height: 60px;
}

.site-header__menu-button {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #111827;
  cursor: pointer;
}

.site-header__menu-icon {
  display: grid;
  gap: 4px;
}

.site-header__menu-icon span {
  display: block;
  width: 18px;
  height: 1.5px;
  border-radius: 999px;
  background: currentColor;
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
  width: 0;
  height: 2px;
  background: currentColor;
  content: "";
  transform: translateX(-50%);
  transition: width 0.28s ease;
}

.site-header__nav-link:hover::after {
  width: 100%;
}

@media (max-width: 760px) {
  .site-header {
    padding: 0 16px;
  }

  .site-header__inner {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }

  .site-header__bar {
    position: relative;
    justify-content: flex-start;
    width: 100%;
  }

  .site-header__menu-button {
    display: inline-flex;
    flex-shrink: 0;
  }

  .site-header__brand {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .site-header__brand-icon {
    height: 36px;
  }

  .site-header__nav {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    width: 100%;
    padding: 8px 0 12px;
  }

  .site-header__nav--open {
    display: flex;
  }

  .site-header__nav-link {
    width: 100%;
    padding: 12px 4px;
    font-size: 15px;
  }

  .site-header__nav-link::after {
    display: none;
  }
}
</style>
