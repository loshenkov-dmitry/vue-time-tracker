<template>
  <TheHeader />

  <main class="flex flex-grow flex-col">
    <TheTimeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      ref="timelineRef"
    ></TheTimeline>
    <TheProgress v-show="currentPage === PAGE_PROGRESS"></TheProgress>
    <TheActivities
      v-show="currentPage === PAGE_ACTIVITIES"
      :activities="activities"
    ></TheActivities>
  </main>

  <TheNav />
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TheNav from '@/components/TheNav.vue'
import { currentPage, timelineRef } from './router'
import { provide, readonly } from 'vue'
import {
  activities,
  activitySelectOptions,
  deleteActivity,
  createActivity,
  setActivitySecondsToComplete
} from './activities'
import TheActivities from './components/pages/TheActivities.vue'
import TheProgress from './components/pages/TheProgress.vue'
import TheTimeline from './components/pages/TheTimeline.vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from './constants'
import { generatePeriodSelectOptions } from './functions'
import {
  timelineItems,
  updateTimelineItemActivitySeconds,
  setTimelineItemActivity,
  resetTimelineItemActivities
} from '@/timeline-items'
import * as keys from '@/keys'

provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds)
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity)
provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete)
provide(keys.createActivityKey, createActivity)
provide(keys.deleteActivityKey, (activity) => {
  resetTimelineItemActivities(activity)
  deleteActivity(activity)
})
provide(keys.timelineItemsKey, readonly(timelineItems))
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()))
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions))
</script>
