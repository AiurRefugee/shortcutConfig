<script setup>
const props = defineProps(['gui'])
</script>
<template>
    <div class="flex flex-col fixed right-0 top-10 text-white z-10">
        <div v-for="(item, index) in props.gui" :key="index">
            {{ item }}
        </div>
    </div>
</template>
<style scoped lang="scss">

</style>