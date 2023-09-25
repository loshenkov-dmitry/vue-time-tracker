<template>
  <div :class="classes">
    {{ seconds }}
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getTotalActivitySeconds } from '../timeline-items'
import { formatSeconds } from '@/functions'
import { isActivityValid } from '../validators'

const props = defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid
  }
})

const sign = computed(() => (secondsDiff.value >= 0 ? '+' : '-'))

const secondsDiff = computed(
  () => getTotalActivitySeconds(props.activity) - props.activity.secondsToComplete
)

const seconds = computed(() => `${sign.value}${formatSeconds(secondsDiff.value)}`)

const colorClasses = computed(() =>
  secondsDiff.value < 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
)
const classes = computed(
  () => `flex items-center rounded px-2 font-mono text-xl ${colorClasses.value}`
)
</script>
