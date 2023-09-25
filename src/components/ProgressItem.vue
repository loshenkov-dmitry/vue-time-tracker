<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="truncate text-xl">{{ activity.name }}</div>
    <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
      <div :class="getProgressColorClass(progress)" :style="{ width: `${progress}%` }"></div>
    </div>
    <div class="flex justify-between font-mono text-sm">
      <span>{{ progress }}%</span>
      <span>{{ timing }}</span>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { isActivityValid } from '../validators'
import { getActivityProgress } from '@/activities'
import { formatSeconds, getProgressColorClass } from '../functions'
import { getTotalActivitySeconds } from '../timeline-items'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid
  }
})

const progress = computed(() => getActivityProgress(props.activity))

const timing = computed(
  () => `${formatSeconds(getTotalActivitySeconds(props.activity))} /
        ${formatSeconds(props.activity.secondsToComplete)}`
)
</script>
