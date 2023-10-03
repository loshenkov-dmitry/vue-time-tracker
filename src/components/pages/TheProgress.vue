<template>
  <ul class="divide-y" v-if="trackedActivities.length">
    <ProgressItem v-for="activity in trackedActivities" :key="activity.id" :activity="activity" />
  </ul>

  <TheProgressEmptyState v-else />
</template>

<script setup>
import { trackedActivities } from '../../activities'
import ProgressItem from '../ProgressItem.vue'
import TheProgressEmptyState from '../TheProgressEmptyState.vue'
</script>

<style lang="scss" scoped></style>
