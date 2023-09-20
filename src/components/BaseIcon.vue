<template>
  <component :is="ICONS[name]" :class="classes" />
</template>

<script setup>
import { ICONS } from '@/icons.js'
import { isIconValid, isNotEmptyString } from '../validators'

defineProps({
  name: {
    required: true,
    type: String,
    validator: isIconValid
  },
  classes: {
    default: 'h-8',
    type: String,
    validator: isNotEmptyString
  }
})
</script>

<style lang="scss" scoped></style>
