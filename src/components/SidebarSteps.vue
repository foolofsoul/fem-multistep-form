<script setup lang="ts">
import { computed } from 'vue';

interface ISteps {
  step: number;
  isActive: boolean;
}

const props = defineProps<{
  currentStep: number;
}>();

const steps = computed(() => {
  const steps: ISteps[] = [];

  for (let i = 0; i < 4; i++) {
    steps.push({
      step: i + 1,
      isActive: i + 1 === props.currentStep,
    });
  }

  return steps;
});
</script>

<template>
  <section
    class="flex justify-center gap-4 pt-8 pb-28 bg-purplish-blue bg-[url('/src/assets/images/bg-sidebar-mobile.svg')] bg-no-repeat bg-cover"
  >
    <div
      v-for="{ step, isActive } in steps"
      :key="step"
      class="flex flex-wrap justify-center content-center aspect-square w-8 border border-solid rounded-full text-sm"
      :class="
        isActive
          ? 'border-light-blue text-marine-blue bg-light-blue'
          : 'border-white text-alabaster'
      "
    >
      {{ step }}
    </div>
  </section>
</template>

<style lang="less" scoped></style>
