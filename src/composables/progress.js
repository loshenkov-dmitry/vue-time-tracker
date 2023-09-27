import { computed } from 'vue'
import { getProgressColorClass, formatSeconds } from '../functions'
import { calculateTrackedActivitySeconds, timelineItems } from '../timeline-items'
import { calculateActivityComplitionPercentage } from '../activities'

export function useProgress(activity) {
  const trackedSeconds = computed(() =>
    calculateTrackedActivitySeconds(timelineItems.value, activity)
  )

  const percentage = computed(() =>
    calculateActivityComplitionPercentage(activity, trackedSeconds.value)
  )

  const colorClass = computed(() => getProgressColorClass(percentage.value))

  const timing = computed(
    () => `${formatSeconds(trackedSeconds.value)} /
        ${formatSeconds(activity.secondsToComplete)}`
  )

  return {
    trackedSeconds,
    percentage,
    colorClass,
    timing
  }
}
