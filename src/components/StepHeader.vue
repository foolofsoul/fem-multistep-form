<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="mb-3 text-xl text-marine-blue desktop:mb-2 desktop:text-2xl">
    {{ props.title }}
  </div>
  <p class="mb-4 text-cool-gray desktop:mb-9">
    {{ props.description }}
  </p>
</template>
