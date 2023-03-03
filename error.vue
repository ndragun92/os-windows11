<template>
  <div>
    <button @click="handleError">Clear errors</button>
    <pre>
    {{ props }}
  </pre
    >
  </div>
</template>

<script lang="ts">
export default {
  name: "ErrorPage",
};
</script>

<script setup lang="ts">
const props = defineProps<{
  error?: unknown;
}>();

const handleError = () => clearError({ redirect: "/" });
</script>
