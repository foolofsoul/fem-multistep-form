<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDataStore } from '@/store';

import SidebarSteps from '@/components/SidebarSteps.vue';

import Step1 from '@/views/Step1.vue';
import Step2 from '@/views/Step2.vue';
import Step3 from '@/views/Step3.vue';
import Step4 from '@/views/Step4.vue';
import ThankYou from '@/views/ThankYou.vue';

const store = useDataStore();

const allComponents = ref({
  step1: {
    component: Step1,
    label: 'Your info',
  },
  step2: {
    component: Step2,
    label: 'Select plan',
  },
  step3: {
    component: Step3,
    label: 'Add-ons',
  },
  step4: {
    component: Step4,
    label: 'Summary',
  },
  thankYou: {
    component: ThankYou,
    label: '',
  },
});

const componentLabels = Object.entries(allComponents.value).reduce(
  (acc, [key, val]) => ({ ...acc, [key]: val.label }),
  {}
);

const totalSteps = computed(() =>
  Object.keys(allComponents.value).reduce(
    (acc, key) => (key.startsWith('step') ? (acc += 1) : acc),
    0
  )
);

const currentComponent = computed(() =>
  store.currentStep <= store.totalSteps
    ? allComponents.value[`step${store.currentStep}`]
    : allComponents.value.thankYou
);

const onFirstStep = computed(() => store.currentStep === 1);
const onLastStep = computed(() => totalSteps.value === store.currentStep);

store.setTotalSteps(totalSteps.value);
</script>

<template>
  <div
    class="relative h-screen w-full desktop:flex desktop:h-[600px] desktop:w-[940px] desktop:gap-4 desktop:overflow-hidden desktop:rounded-xl desktop:bg-white desktop:p-4 desktop:shadow-xl"
  >
    <SidebarSteps :current-step="store.currentStep" :labels="componentLabels" />

    <div
      class="flex flex-col justify-between desktop:mx-[84px] desktop:grow desktop:pb-4 desktop:pt-8"
    >
      <div
        class="mx-4 -mt-20 rounded-lg bg-white px-6 py-7 shadow-xl desktop:m-0 desktop:p-0 desktop:shadow-none"
        :class="{
          'desktop:grow': store.currentStep > store.totalSteps,
        }"
      >
        <component :is="currentComponent.component" />
      </div>

      <footer
        v-if="totalSteps + 1 > store.currentStep"
        class="absolute bottom-0 mt-auto flex w-full bg-white p-4 desktop:static desktop:w-auto desktop:p-0"
        :class="onFirstStep ? 'justify-end' : 'justify-between'"
      >
        <button
          v-if="!onFirstStep"
          class="text-lg font-medium text-cool-gray hover:text-marine-blue"
          @click="store.handleGoBack()"
        >
          Go Back
        </button>
        <button
          class="flex rounded bg-marine-blue px-4 py-2.5 text-sm text-white hover:bg-marine-blue/90 desktop:rounded-lg desktop:py-3 desktop:px-6 desktop:text-lg desktop:font-medium"
          :class="{ 'bg-purplish-blue hover:bg-purplish-blue/90': onLastStep }"
          @click="store.handleNextStep(0)"
        >
          {{ onLastStep ? 'Confirm' : 'Next Step' }}
        </button>
      </footer>
    </div>
  </div>
</template>
