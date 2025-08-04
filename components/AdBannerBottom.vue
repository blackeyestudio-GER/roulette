<template>
    <div class="w-full flex justify-center mt-8">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXXXX"
             data-ad-slot="YOUR_SLOT_ID_BOTTOM"
             data-ad-format="auto"
             data-full-width-responsive="true">
        </ins>
    </div>
</template>

<script setup>
onMounted(() => {
    if (window.adsbygoogle) {
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.warn('AdSense failed to load', e);
        }
    }
});
</script>
