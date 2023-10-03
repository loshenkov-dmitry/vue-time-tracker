<template>
  <a :href="`#${PAGE_PROGRESS}`" class="text-sm" @click="navigate(PAGE_PROGRESS)">
    <div class="flex items-center gap-1" v-if="percentage < HUNDRED_PERCENT">
      <div>
        Progress: <span class="font-mono">{{ percentage }}%</span>
      </div>
      <div :class="`h-3 ${colorClass} w-3 rounded-full`"></div>
    </div>

    <div class="flex items-center gap-1" v-else>
      Day complete <BaseIcon :name="ICON_CHECK_CIRCLE" class="h-7 text-green-500" />
    </div>
  </a>
</template>

<script setup>
import { HUNDRED_PERCENT, PAGE_PROGRESS } from '../constants'
import { navigate } from '../router'
import BaseIcon from './BaseIcon.vue'
import { ICON_CHECK_CIRCLE } from '../icons'
import { useTotalProgress } from '@/composables/totalProgress'

const { colorClass, percentage } = useTotalProgress()
</script>
