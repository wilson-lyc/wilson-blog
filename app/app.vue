<template>
  <div class="app-shell">
    <NuxtRouteAnnouncer />
    <AppHeader />
    <NuxtPage />
  </div>
</template>

<style>
html,
body,
#__nuxt {
  margin: 0;
  min-height: 100%;
}

body {
  color: #111827;
  background: #fff;
  font-family: "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", sans-serif;
}

a {
  color: inherit;
}

.app-shell {
  min-height: 100vh;
}
</style>
