<template>
  <form class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4" @submit.prevent="formHandler">
    <input
      type="text"
      class="w-full rounded border px-4 text-xl"
      placeholder="Activity name"
      v-model="name"
    />
    <BaseButton :disabled="name.trim() === ''">
      <PlusIcon class="h-8" />
    </BaseButton>
  </form>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { inject, nextTick, ref } from 'vue'
import { SECONDS_IN_HOUR } from '../constants'
import { id } from '../functions'
import { createActivityKey } from '@/keys'

const name = ref('')
const createActivity = inject(createActivityKey)

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
