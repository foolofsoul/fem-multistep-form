<script setup lang="ts">
const props = defineProps<{
  label: string;
  id: string;
}>();
</script>

<template>
  <div class="flex flex-col">
    <label
      class="text-xs text-marine-blue desktop:mb-1 desktop:text-sm desktop:font-normal"
      :for="props.id"
      >{{ props.label }}</label
    >
    <input
      v-bind="$attrs"
      class="w-full rounded border border-solid border-light-gray px-4 py-2 text-md desktop:rounded-lg desktop:py-2.5 desktop:text-lg desktop:font-medium"
    />
  </div>
</template>
