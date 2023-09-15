<template>
  <a :href="`#${PAGE_TIMELINE}`" @click="navigate(PAGE_TIMELINE)">
    <img src="../assets/img/logo.png" alt="logo" srcset="" class="h-9" />
  </a>
</template>

<script setup>
import { PAGE_TIMELINE } from '../constants'
import { navigate } from '../router'
</script>
