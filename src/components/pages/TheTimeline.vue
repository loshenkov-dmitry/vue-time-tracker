<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :activities="activities"
        :timeline-item="timelineItem"
        :activity-select-options="activitySelectOptions"
        ref="timelineitemRefs"
        @select-activity="emit('setTimelineItemActivity', timelineItem, $event)"
        @scroll-to-hour="scrollToHour"
      />
    </ul>
  </div>
</template>

<script setup>
import TimelineItem from '@/components/TimelineItem.vue'
import { nextTick, ref, watchPostEffect } from 'vue'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '../../constants'
import {
  isActivityValid,
  isPageValid,
  isTimelineItemValid,
  validateActivities,
  validateSelectOptions,
  validateTimelineItems
} from '../../validators'

isTimelineItemValid

const props = defineProps({
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems
  },
  activities: {
    type: Array,
    required: true,
    validator: validateActivities
  },
  activitySelectOptions: {
    type: Array,
    required: true,
    validator: validateSelectOptions
  },

  currentPage: {
    type: String,
    required: true,
    validator: isPageValid
  }
})

const emit = defineEmits({
  setTimelineItemActivity(timelineItem, activity) {
    return [isTimelineItemValid(timelineItem), isActivityValid(activity)].every(Boolean)
  }
})

function scrollToHour(hour) {
  if (hour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView()
  } else {
    timelineitemRefs.value[hour - 1].$el.scrollIntoView()
  }
}

const timelineitemRefs = ref([])

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick()
    const currentHour = new Date().getHours()
    scrollToHour(currentHour)
  }
})
</script>
