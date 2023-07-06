<template>
  <div class="flex w-full gap-2">
    <BaseButton :disabled="!seconds" :type="BUTTON_TYPE_DANGER" @click="reset">
      <ArrowPathIcon class="h-8" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(seconds) }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <PauseIcon class="h-8" />
    </BaseButton>
    <BaseButton v-else :type="BUTTON_TYPE_SUCCESS" @click="start" :disabled="isStartButtonDisabled">
      <PlayIcon class="h-8" />
    </BaseButton>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { formatSeconds } from '@/functions.js'
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline'
import { inject, ref } from 'vue'
import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  MILLISECONDS_IN_SECONDS
} from '../constants'
import { isTimelineItemValid } from '../validators'

const updateTimelineItemActivitySeconds = inject('updateTimelineItemActivitySeconds')

const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid
  }
})

const seconds = ref(props.timelineItem.activitySeconds)
const isRunning = ref(false)

function start() {
  isRunning.value = setInterval(() => {
    updateTimelineItemActivitySeconds(props.timelineItem, 1)
    seconds.value++
  }, MILLISECONDS_IN_SECONDS)
}
function stop() {
  clearInterval(isRunning.value)
  isRunning.value = false
}

function reset() {
  stop()
  updateTimelineItemActivitySeconds(props.timelineItem, -seconds.value)
  seconds.value = 0
}

const isStartButtonDisabled = props.timelineItem.hour !== new Date().getHours()
</script>
