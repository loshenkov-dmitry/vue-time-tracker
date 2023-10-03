<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="truncate text-xl">{{ activity.name }}</div>
    <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
      <div
        :class="['transition-all', colorClass]"
        :style="{ width: `${Math.min(percentage, HUNDRED_PERCENT)}%` }"
      ></div>
    </div>
    <div class="flex justify-between font-mono text-sm">
      <span>{{ percentage }}%</span>
      <span>{{ timing }}</span>
    </div>
  </li>
</template>

<script setup>
import { useProgress } from '@/composables/progress'
import { isActivityValid } from '../validators'
import { HUNDRED_PERCENT } from '../constants'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid
  }
})

const { colorClass, percentage, timing } = useProgress(props.activity)
</script>
