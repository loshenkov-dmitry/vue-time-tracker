<template>
  <div class="flex w-full gap-2">
    <BaseButton :disabled="!timelineItem.activitySeconds" :type="BUTTON_TYPE_DANGER" @click="reset">
      <BaseIcon :name="ICON_ARROW_PATH" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(timelineItem.activitySeconds) }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <BaseIcon :name="ICON_PAUSE" />
    </BaseButton>
    <BaseButton v-else :type="BUTTON_TYPE_SUCCESS" @click="start" :disabled="isStartButtonDisabled">
      <BaseIcon :name="ICON_PLAY" />
    </BaseButton>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { formatSeconds } from '@/functions.js'
import { useStopwatch } from '@/composables/stopwatch'
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '../icons'
import { BUTTON_TYPE_DANGER, BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING } from '../constants'
import { isTimelineItemValid } from '../validators'
import { currentHour } from '../functions'
import BaseIcon from './BaseIcon.vue'
import { updateTimelineItem } from '../timeline-items'
import { watchEffect } from 'vue'

const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid
  }
})

const { seconds, isRunning, start, stop, reset } = useStopwatch(props.timelineItem.activitySeconds)

watchEffect(() => updateTimelineItem(props.timelineItem, { activitySeconds: seconds.value }))

const isStartButtonDisabled = props.timelineItem.hour !== currentHour()
</script>
