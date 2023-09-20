<template>
  <form class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4" @submit.prevent="formHandler">
    <input
      type="text"
      class="w-full rounded border px-4 text-xl"
      placeholder="Activity name"
      v-model="name"
    />
    <BaseButton :disabled="name.trim() === ''">
      <BaseIcon :name="ICON_PLUS" />
    </BaseButton>
  </form>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { nextTick, ref } from 'vue'
import { SECONDS_IN_HOUR } from '../constants'
import { id } from '../functions'
import { createActivity } from '../activities'
import BaseIcon from './BaseIcon.vue'
import { ICON_PLUS } from '../icons'

const name = ref('')

async function formHandler() {
  createActivity({
    id: id(),
    name: name.value,
    secondsToComplete: 0 * SECONDS_IN_HOUR
  })
  name.value = ''

  await nextTick()
  window.scrollTo(0, document.body.scrollHeight)
}
</script>
