<template>
  <div class="flex gap-2">
    <BaseButton @click="emit('select', null)" :type="BUTTON_TYPE_NEUTRAL">
      <BaseIcon :name="ICON_X_MARK" />
    </BaseButton>
    <select
      name=""
      id=""
      @change="updSelectVal($event.target.value)"
      class="w-full truncate rounded bg-gray-100 px-2 py-1 text-2xl"
    >
      <option :selected="isNotSelected" disabled value="">{{ placeholder }}</option>
      <option
        v-for="{ value, label } in options"
        :key="value"
        :value="value"
        :selected="selected === value"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { computed } from 'vue'
import { BUTTON_TYPE_NEUTRAL } from '../constants'
import { normalizeSelectValue } from '../functions'
import { isSelectValueValid, isUndefinedOrNull, validateSelectOptions } from '../validators'
import BaseIcon from './BaseIcon.vue'
import { ICON_X_MARK } from '../icons'

const props = defineProps({
  options: {
    type: Array,
    required: true,
    validator: validateSelectOptions
  },

  selected: [Number, String],
  placeholder: { type: String, default: 'Rest' }
})

const emit = defineEmits({
  select: isSelectValueValid
})

const isNotSelected = computed(() => isUndefinedOrNull(props.selected))

function updSelectVal(val) {
  emit('select', normalizeSelectValue(val))
}
</script>
