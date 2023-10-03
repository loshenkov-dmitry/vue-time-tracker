import { computed } from 'vue'
import { getProgressColorClass, formatSeconds } from '../functions'
import { calculateTrackedActivitySeconds, timelineItems } from '../timeline-items'
import { calculateActivityComplitionPercentage } from '../activities'

export function useProgress(activity) {
  const trackedActivitySeconds = computed(() =>
    calculateTrackedActivitySeconds(timelineItems.value, activity)
  )

  const percentage = computed(() =>
    calculateActivityComplitionPercentage(activity, trackedActivitySeconds.value)
  )

  const colorClass = computed(() => getProgressColorClass(percentage.value))

  const timing = computed(
    () => `${formatSeconds(trackedActivitySeconds.value)} /
        ${formatSeconds(activity.secondsToComplete)}`
  )

  return {
    trackedActivitySeconds,
    percentage,
    colorClass,
    timing
  }
}
