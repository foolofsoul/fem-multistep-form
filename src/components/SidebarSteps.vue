<script setup lang="ts">
import { computed } from 'vue';

interface ISteps {
  step: number;
  isActive: boolean;
}

const props = defineProps<{
  currentStep: number;
  labels: Record<string, string>;
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
    class="flex justify-center gap-4 bg-purplish-blue bg-[url('/src/assets/images/bg-sidebar-mobile.svg')] bg-cover bg-no-repeat pt-8 pb-28 desktop:min-w-[275px] desktop:flex-col desktop:justify-start desktop:gap-6 desktop:rounded-lg desktop:bg-[url('/src/assets/images/bg-sidebar-desktop.svg')] desktop:p-10"
  >
    <div
      v-for="{ step, isActive } in steps"
      :key="step"
      class="flex items-center gap-4"
    >
      <span
        class="flex aspect-square w-8 flex-wrap content-center justify-center rounded-full border border-solid text-sm"
        :class="
          isActive
            ? 'border-light-blue bg-light-blue text-marine-blue'
            : 'border-white text-alabaster'
        "
        >{{ step }}</span
      >
      <div class="hidden flex-col desktop:flex">
        <span class="text-xs font-normal uppercase text-light-gray"
          >Step {{ step }}</span
        >
        <span class="text-sm font-bold uppercase text-white">{{
          labels[`step${step}`]
        }}</span>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped></style>
