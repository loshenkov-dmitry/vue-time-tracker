<template>
  <li class="flex-1">
    <a :class="classes" :href="`#${navItem.page}`" @click="navigate(navItem.page)">
      <BaseIcon :name="navItem.icon" :class="'h-6 w-6'" /> {{ navItem.page }}
    </a>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { navigate, currentPage } from '../router'
import { isNavItemValid } from '../validators'
import BaseIcon from './BaseIcon.vue'

const props = defineProps({
  navItem: {
    required: true,
    type: Object,
    validator: isNavItemValid
  }
})

const classes = computed(() => [
  'flex flex-col items-center p-2 text-xs capitalize',
  {
    'pointer-events-none bg-gray-200': props.navItem.page === currentPage.value
  }
])
</script>
