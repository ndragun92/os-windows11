<template>
  <nuxt-link v-if="props?.to" :to="returnLink"><slot /></nuxt-link>
  <a v-else-if="props?.href" :href="props?.href"><slot /></a>
  <a v-else><slot /></a>
</template>

<script lang="ts" setup>
const props = defineProps<{
  to?: string;
  href?: string;
}>();

const returnLink = computed(() => {
  return props?.to || "/";
});
</script>
