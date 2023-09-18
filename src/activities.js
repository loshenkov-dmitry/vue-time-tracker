import { ref, computed } from 'vue'
import { SECONDS_IN_HOUR } from '@/constants'
import { id } from '@/functions'

export const activities = ref(generateActivities())

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

function generateActivities() {
  return ['Coding', 'Training', 'Reading'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: hours * SECONDS_IN_HOUR
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
