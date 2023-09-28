<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteAndResetActivity(activity)">
        <BaseIcon :name="ICON_TRASH" />
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

      <RemainingActivitySeconds :activity="activity" v-if="activity.secondsToComplete" />
    </div>
  </li>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import RemainingActivitySeconds from '@/components/RemainingActivitySeconds.vue'
import BaseIcon from './BaseIcon.vue'
import { isActivityValid } from '@/validators.js'
import { ICON_TRASH } from '../icons'

import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from '../constants'
import { updateActivity, deleteActivity } from '@/activities'
import { resetTimelineItemActivities, timelineItems } from '../timeline-items'

defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid
  }
})

function deleteAndResetActivity(activity) {
  resetTimelineItemActivities(timelineItems.value, activity)
  deleteActivity(activity)
}
</script>
