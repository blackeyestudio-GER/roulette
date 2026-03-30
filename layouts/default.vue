<template>
    <div>
        <NuxtLoadingIndicator v-if="!obsLayout" :throttle="0" :height="2" />
        <div :class="obsLayout ? '' : 'mx-2 my-2 max-w-screen-2xl lg:mx-auto'">
            <slot />
        </div>
        <AppFooter v-if="!obsLayout" />
    </div>
</template>

<script setup lang="ts">
const route = useRoute();

const obsLayout = computed(() => {
    const o = route.query.obs;
    return o === '1' || o === 'true' || o === 'yes';
});

useHead({
    titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} — Streamer Roulette` : 'Streamer Roulette'),
});
</script>
<style scoped>

</style>