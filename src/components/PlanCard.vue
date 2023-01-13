<script setup lang="ts">
const props = defineProps<{
  iconSrc: string;
  title: string;
  price: string;
}>();
</script>

<template>
  <div class="flex gap-3 p-4 border border-solid border-light-gray rounded-lg">
    <img :src="iconSrc" />
    <div class="flex flex-col gap">
      <p class="mb-0 font-medium text-marine-blue">{{ props.title }}</p>
      <span class="text-sm font-normal text-cool-gray">{{ props.price }}</span>
    </div>
  </div>
</template>
