<template>
  <nuxt-img
    :key="props.src"
    :src="props.src"
    :alt="props.alt"
    :loading="lazy ? 'lazy' : 'eager'"
  />
</template>

<script lang="ts" setup>
interface Props {
  src: string;
  alt: string;
  lazy?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  src: "",
  alt: "",
  lazy: true,
});
</script>
