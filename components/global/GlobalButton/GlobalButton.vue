<template>
  <button
    :class="[
      `pointer-events-auto relative flex items-${
        props.align || 'center'
      } justify-${props.justify || 'center'} rounded transition duration-200`,
      'hover:bg-[var(--GlobalButton-bg-color--hover)]',
      {
        'hover-scale': props.hoverScale,
        'bg-[var(--GlobalButton-bg-color--focused)] top-shadow': props.focused,
      },
    ]"
    type="button"
  >
    <slot name="icon" />
    <slot name="name" />
    <slot name="custom" :active="active" :focused="focused" />
    <!-- TODO: Try to make tooltip append to body in certain cases and memorize
    position -->
    <span
      v-if="props.tooltip"
      class="button__tooltip"
      :class="[
        'absolute z-[60] text-xs bg-[var(--GlobalButton-tooltip-bg-color)] text-[var(--GlobalButton-tooltip-text-color)] py-1.5 px-2 border border-[var(--GlobalButton-tooltip-border-color)] rounded whitespace-nowrap backdrop-blur-[25px]',
        tooltipPosition === 'right' ? 'left-0' : 'right-0',
        tooltipPositionYCustom ? tooltipPositionYCustom : '-top-10',
        tooltipClass ? tooltipClass : '',
      ]"
      v-html="props.tooltip"
    />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  tooltip?: string;
  justify?: "start" | "end" | "center";
  align?: "start" | "end" | "center";
  tooltipPosition?: "right";
  tooltipClass?: string;
  tooltipPositionYCustom?: string;
  hoverScale?: boolean;
  active?: boolean;
  focused?: boolean;
}>();
</script>

<style lang="scss" scoped>
.button {
  &__tooltip {
    @apply pointer-events-none opacity-0 transition duration-200 delay-300;
    //transition: all 0.2s linear 1s;
  }
}
button {
  &.hover-scale {
    &:deep(svg) {
      @apply transition duration-100;
    }
    &:active {
      &:deep(svg) {
        @apply scale-75;
      }
    }
  }
  &:hover {
    @apply top-shadow;
    .button__tooltip {
      @apply opacity-100 delay-700;
    }
  }
}
</style>

<style>
[data-theme="theme1"] {
  --GlobalButton-bg-color--hover: rgba(255, 255, 255, 0.6);
  --GlobalButton-bg-color--focused: rgba(255, 255, 255, 0.5);
  --GlobalButton-tooltip-bg-color: rgba(255, 255, 255, 0.9);
  --GlobalButton-tooltip-text-color: rgba(255, 255, 255, 1);
  --GlobalButton-tooltip-border-color: rgba(255, 255, 255, 1);
}

[data-theme="theme2"] {
  --GlobalButton-bg-color--hover: rgba(255, 255, 255, 0.1);
  --GlobalButton-bg-color--focused: rgba(255, 255, 255, 0.05);
  --GlobalButton-tooltip-bg-color: rgba(43, 55, 67, 0.8);
  --GlobalButton-tooltip-text-color: rgba(255, 255, 255, 1);
  --GlobalButton-tooltip-border-color: rgba(0, 0, 0, 0.1);
}
</style>
