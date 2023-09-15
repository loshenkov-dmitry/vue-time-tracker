<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
    <TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollToHour')" />

    <BaseSelect
      :options="activitySelectOptions"
      :placeholder="'Rest'"
      :selected="timelineItem.activityId"
      @select="setTimelineItemActivity(timelineItem, $event)"
    />

    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>

<script setup>
import BaseSelect from '@/components/BaseSelect.vue'
import TimelineHour from '@/components/TimelineHour.vue'
import TimelineStopwatch from '@/components/TimelineStopwatch.vue'

import { inject } from 'vue'
import { isTimelineItemValid, isUndefined } from '../validators'
import { activitySelectOptionsKey, setTimelineItemActivityKey } from '@/keys'

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid
  }
})

const activitySelectOptions = inject(activitySelectOptionsKey)
const setTimelineItemActivity = inject(setTimelineItemActivityKey)

const emit = defineEmits({
  scrollToHour: isUndefined
})
</script>
