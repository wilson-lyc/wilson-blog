<script setup lang="ts">
import config from '~/config/typewriter.json'

const { strings = [], speed = 120, fontSize = 'clamp(40px, 14vw, 120px)' } = config

const displayText = ref('')
const stringIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)
const isPaused = ref(false)

let timer: ReturnType<typeof setTimeout> | null = null

function type() {
  const current = strings[stringIndex.value]
  if (isPaused.value) {
    timer = setTimeout(type, 100)
    return
  }

  if (!isDeleting.value) {
    displayText.value = current.slice(0, charIndex.value + 1)
    charIndex.value++
    if (charIndex.value === current.length) {
      isPaused.value = true
      setTimeout(() => {
        isPaused.value = false
        isDeleting.value = true
        type()
      }, 1800)
      return
    }
    timer = setTimeout(type, speed)
  } else {
    displayText.value = current.slice(0, charIndex.value - 1)
    charIndex.value--
    if (charIndex.value === 0) {
      isDeleting.value = false
      stringIndex.value = (stringIndex.value + 1) % strings.length
      timer = setTimeout(type, 400)
      return
    }
    timer = setTimeout(type, speed / 2)
  }
}

onMounted(() => {
  type()
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <span class="typewriter" :style="{ fontSize }">
    <span class="typewriter__text">{{ displayText }}</span><span class="typewriter__cursor">|</span>
  </span>
</template>

<style scoped>
.typewriter {
  display: inline-block;
  font-weight: 700;
  color: #111827;
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-align: center;
}

.typewriter__text {
  white-space: pre-wrap;
}

.typewriter__cursor {
  display: inline-block;
  color: #3b82f6;
  font-weight: 400;
  animation: blink 0.8s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
