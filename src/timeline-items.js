import { ref } from 'vue'
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from './constants'
import { currentHour } from './functions'

export const timelineItems = ref(generateTimelineItems())

export const timelineitemRefs = ref([])

export function updateTimelineItem(timelineItem, fields) {
  return Object.assign(timelineItem, fields)
}

export function resetTimelineItemActivities(activity) {
  timelineItems.value
    .filter((timelineItem) => hasActivity(timelineItem, activity))
    .forEach((timelineItem) =>
      updateTimelineItem(timelineItem, { activityId: null, activitySeconds: 0 })
    )
}

export function getTotalActivitySeconds(activity) {
  return timelineItems.value
    .filter((timelineItem) => hasActivity(timelineItem, activity))
    .reduce(
      (totalSeconds, timelineItem) => Math.round(timelineItem.activitySeconds + totalSeconds),
      0
    )
}

export function scrollToHour(hour, isSmooth = true) {
  const options = {
    behavior: isSmooth ? 'smooth' : 'instant'
  }

  const el = hour === MIDNIGHT_HOUR ? document.body : timelineitemRefs.value[hour - 1].$el

  el.scrollIntoView(options)
}

export function scrollToCurrentHour(isSmooth = false) {
  scrollToHour(currentHour(), isSmooth)
}

function generateTimelineItems() {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: null,
    activitySeconds: 0
  }))
}

function hasActivity(timelineItem, activity) {
  return timelineItem.activityId === activity.id
}
