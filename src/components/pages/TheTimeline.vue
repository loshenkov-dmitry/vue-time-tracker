<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        ref="timelineitemRefs"
        @scroll-to-hour="scrollToHour"
      />
    </ul>
  </div>
</template>

<script setup>
import TimelineItem from '@/components/TimelineItem.vue'
import { nextTick, ref, watchPostEffect } from 'vue'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '../../constants'
import { isPageValid, isTimelineItemValid, validateTimelineItems } from '../../validators'

isTimelineItemValid

const props = defineProps({
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems
  },

  currentPage: {
    type: String,
    required: true,
    validator: isPageValid
  }
})

defineExpose({ scrollToHour })

function scrollToHour(hour = null, isSmooth = true) {
  hour ??= new Date().getHours()
  const options = {
    behavior: isSmooth ? 'smooth' : 'instant'
  }
  if (hour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView(options)
  } else {
    timelineitemRefs.value[hour - 1].$el.scrollIntoView(options)
  }
}

const timelineitemRefs = ref([])

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick()
    scrollToHour(null, false)
  }
})
</script>
