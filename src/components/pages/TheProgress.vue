<template>
  <ul class="divide-y">
    <ProgressItem v-for="activity in trackedActivities" :key="activity.id" :activity="activity" />
  </ul>
</template>

<script setup>
import { trackedActivities } from '../../activities'
import ProgressItem from '../ProgressItem.vue'
</script>

<style lang="scss" scoped></style>
