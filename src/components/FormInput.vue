<script setup lang="ts">
const props = defineProps<{
  label: string;
  id: string;
}>();
</script>

<template>
  <div class="flex flex-col">
    <label class="text-marine-blue text-xs" :for="props.id">{{ props.label }}</label>
    <input
      v-bind="$attrs"
      class="px-4 py-2 w-full border border-solid border-light-gray rounded text-md"
    />
  </div>
</template>
