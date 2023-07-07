<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
    <TimelineHour
      :hour="timelineItem.hour"
      @click.prevent="emit('scrollToHour', timelineItem.hour)"
    />

    <BaseSelect
      :options="activitySelectOptions"
      :placeholder="'Rest'"
      :selected="timelineItem.activityId"
      @select="selectedActivity"
    />

    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>

<script setup>
import BaseSelect from '@/components/BaseSelect.vue'
import TimelineHour from '@/components/TimelineHour.vue'
import TimelineStopwatch from '@/components/TimelineStopwatch.vue'

import { inject } from 'vue'
import { NULLABLE_ACTIVITY } from '../constants'
import { isActivityValid, isHourValid, isTimelineItemValid } from '../validators'

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid
  }
})

const activities = inject('activities')
const activitySelectOptions = inject('activitySelectOptions')

const emit = defineEmits({
  selectActivity: isActivityValid,
  scrollToHour: isHourValid
})

function findActivityByid(id) {
  return activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
}

function selectedActivity(id) {
  emit('selectActivity', findActivityByid(id))
}
</script>
