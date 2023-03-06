<template>
  <nuxt-img :key="props.src" :src="props.src" :alt="props.alt" loading="lazy" />
</template>

<script lang="ts" setup>
const props = defineProps<{
  src: string;
  alt: string;
}>();
</script>
