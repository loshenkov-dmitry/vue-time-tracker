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
import { onActivated } from 'vue'
import {
  timelineItems,
  timelineitemRefs,
  scrollToCurrentHour,
  scrollToHour
} from '../../timeline-items'

onActivated(scrollToCurrentHour)
</script>
