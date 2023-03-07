<template>
  <li
    class="relative flex items-center justify-between hover:bg-[var(--global-context-menu-item-bg-color--hover)] cursor-pointer duration-200 rounded px-[10px] py-[6px]"
  >
    <slot name="custom" />
    <slot name="prepend" />
    <div class="flex items-center gap-[12px]">
      <slot name="icon" />
      <span><slot /></span>
    </div>
    <Icon v-if="hasSubmenu" size="16" name="ic:round-keyboard-arrow-right" />
    <slot name="submenu" />
    <slot name="extra" />
  </li>
</template>

<script lang="ts" setup>
const slots = useSlots();
const hasSubmenu = computed(() => !!slots["submenu"]);
</script>
