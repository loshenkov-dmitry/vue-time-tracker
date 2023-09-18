<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteAndResetActivity(activity)">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="grow font-mono"
        placeholder="hh:mm"
        :options="PERIOD_SELECT_OPTIONS"
        :selected="activity.secondsToComplete || null"
        @select="updateActivity(activity, { secondsToComplete: $event || 0 })"
      />

      <ActivitySecondsToComplete :activity="activity" v-if="activity.secondsToComplete" />
    </div>
  </li>
</template>

<script setup>
import ActivitySecondsToComplete from '@/components/ActivitySecondsToComplete.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { isActivityValid } from '@/validators.js'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from '../constants'
import { updateActivity, deleteActivity } from '@/activities'
import { resetTimelineItemActivities } from '../timeline-items'

defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid
  }
})

function deleteAndResetActivity(activity) {
  resetTimelineItemActivities(activity)
  deleteActivity(activity)
}
</script>
