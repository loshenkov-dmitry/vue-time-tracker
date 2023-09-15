<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        ref="timelineitemRefs"
        @scroll-to-hour="scrollToHour(timelineItem.hour)"
      />
    </ul>
  </div>
</template>

<script setup>
import TimelineItem from '@/components/TimelineItem.vue'
import { nextTick, ref, watchPostEffect } from 'vue'
import { currentPage } from '../../router'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '../../constants'
import { validateTimelineItems } from '../../validators'
import { currentHour } from '../../functions'

defineProps({
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems
  }
})

defineExpose({ scrollToHour })

function scrollToHour(hour = null, isSmooth = true) {
  hour ??= currentHour()
  const options = {
    behavior: isSmooth ? 'smooth' : 'instant'
  }

  const el = hour === MIDNIGHT_HOUR ? document.body : timelineitemRefs.value[hour - 1].$el

  el.scrollIntoView(options)
}

const timelineitemRefs = ref([])

watchPostEffect(async () => {
  if (currentPage.value === PAGE_TIMELINE) {
    await nextTick()
    scrollToHour(null, false)
  }
})
</script>
