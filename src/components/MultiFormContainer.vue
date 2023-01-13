<script setup lang="ts">
import { type Component, defineAsyncComponent, ref, computed } from 'vue';
import type { IStepComponent } from '@/types';

import SidebarSteps from '@/components/SidebarSteps.vue';

// Load step components from views dir
const stepComponents = Object.entries(
  import.meta.glob('../views/*.vue')
).reduce((acc: IStepComponent, [dir, stepModule]): IStepComponent => {
  const moduleName = dir.match(/Step\d/)?.[0];
  const stepComponent = stepModule() as Component;

  if (typeof moduleName === 'string') {
    acc[moduleName] = defineAsyncComponent(async () => stepComponent);
  }

  return acc;
}, {});

const currentStep = ref<number>(1);

function handleNextStep() {
  currentStep.value++;
}

function handleGoBack() {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}

const currentComponent = computed(
  () => stepComponents[`Step${currentStep.value}`]
);
</script>

<template>
  <SidebarSteps :current-step="currentStep" />

  <div class="px-6 py-7 -mt-20 mx-4 bg-white rounded-lg">
    <component :is="currentComponent" />
  </div>

  <footer class="flex justify-between mt-auto p-4 bg-white">
    <button @click="handleGoBack">Go Back</button>
    <button
      class="flex rounded px-4 py-2.5 text-sm text-white bg-marine-blue"
      @click="handleNextStep"
    >
      Next Step
    </button>
  </footer>
</template>
