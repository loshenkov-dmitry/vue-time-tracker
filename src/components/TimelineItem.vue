<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
    <TimelineHour :hour="timelineItem.hour" />

    <BaseSelect
      :options="activitySelectOptions"
      :placeholder="'Rest'"
      :selected="timelineItem.activityId"
      @select="updateTimelineItem(timelineItem, { activityId: $event })"
    />

    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>

<script setup>
import BaseSelect from '@/components/BaseSelect.vue'
import TimelineHour from '@/components/TimelineHour.vue'
import TimelineStopwatch from '@/components/TimelineStopwatch.vue'

import { isTimelineItemValid } from '../validators'
import { updateTimelineItem } from '../timeline-items'
import { activitySelectOptions } from '../activities'

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid
  }
})
</script>
