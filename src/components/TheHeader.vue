<template>
  <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
    <TheLogo @click="emit('navigate', PAGE_TIMELINE)" />
    <TheHeaderProgress @click="emit('navigate', PAGE_PROGRESS)" />
  </header>
</template>

<script setup>
import TheHeaderProgress from '@/components/TheHeaderProgress.vue'
import TheLogo from '@/components/TheLogo.vue'
import { PAGE_PROGRESS, PAGE_TIMELINE } from '../constants'
import { isPageValid } from '../validators'

const emit = defineEmits({ navigate: isPageValid })
</script>
