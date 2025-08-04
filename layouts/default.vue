<template>
  <div>
    <NuxtLoadingIndicator :throttle="0" :height="2" />
    <div class="mx-2 max-w-screen-2xl lg:mx-auto my-2">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: 'Streamer Roulette Tool',
})
</script>
<style scoped>

</style>