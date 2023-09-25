import { ref, computed } from 'vue'
import { HUNDRED_PERCENT } from '@/constants'
import { id } from '@/functions'

import { getTotalActivitySeconds } from '@/timeline-items'

export const activities = ref(generateActivities())

export const trackedActivities = computed(() =>
  activities.value.filter(({ secondsToComplete }) => secondsToComplete)
)

export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

export function deleteActivity(activity) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function createActivity(activity) {
  activities.value.push(activity)
}

export function updateActivity(activity, fields) {
  return Object.assign(activity, fields)
}

export function getActivityProgress(activity) {
  const activitySeconds = getTotalActivitySeconds(activity)

  const percentage = Math.floor((activitySeconds * HUNDRED_PERCENT) / activity.secondsToComplete)

  return percentage
}

function generateActivities() {
  return ['Coding', 'Training', 'Reading'].map((name) => ({
    id: id(),
    name,
    secondsToComplete: 15 * 60 // hours * SECONDS_IN_HOUR
  }))
}

function generateActivitySelectOptions(activities) {
  return activities.map((activity) => {
    return {
      label: activity.name,
      value: activity.id
    }
  })
}
