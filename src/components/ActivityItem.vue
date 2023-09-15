<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteActivity(activity)">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="grow font-mono"
        placeholder="hh:mm"
        :options="periodSelectOptions"
        :selected="activity.secondsToComplete || null"
        @select="setActivitySecondsToComplete(activity, $event)"
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
import { inject } from 'vue'
import { BUTTON_TYPE_DANGER } from '../constants'
import { periodSelectOptionsKey, setActivitySecondsToCompleteKey, deleteActivityKey } from '../keys'

const periodSelectOptions = inject(periodSelectOptionsKey)
const setActivitySecondsToComplete = inject(setActivitySecondsToCompleteKey)
const deleteActivity = inject(deleteActivityKey)

defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid
  }
})
</script>
