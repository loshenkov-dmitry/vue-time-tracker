import { computed } from 'vue'
import { getProgressColorClass } from '../functions'
import { calculateTrackedActivitySeconds, timelineItems } from '../timeline-items'
import { calculateComplitionPercentage, trackedActivities } from '../activities'

export function useTotalProgress() {
  const percentage = computed(() => calculateComplitionPercentage(totalTrackedSeconds.value))

  const colorClass = computed(() => getProgressColorClass(percentage.value))

  const totalTrackedSeconds = computed(() => {
    return trackedActivities.value
      .map((activity) =>
        Math.min(
          calculateTrackedActivitySeconds(timelineItems.value, activity),
          activity.secondsToComplete
        )
      )
      .reduce((total, seconds) => total + seconds, 0)
  })

  return {
    totalTrackedSeconds,
    percentage,
    colorClass
  }
}
