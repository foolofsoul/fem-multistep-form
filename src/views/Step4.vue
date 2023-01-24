<script setup lang="ts">
import { computed } from 'vue';
import { EPlans } from '@/types';
import { useDataStore } from '@/store';
import StepHeader from '@/components/StepHeader.vue';

const store = useDataStore();

const formattedBilling = computed(
  () =>
    store.billingOption.charAt(0) + store.billingOption.slice(1).toLowerCase()
);
const lowerCaseBilling = computed(() =>
  store.billingOption.toLowerCase().slice(0, -2)
);

const plan = computed(() => EPlans[store.getPlan]);
const captializedPlanName = computed(
  () => plan.value.charAt(0).toUpperCase() + plan.value.slice(1)
);

function formattedPrice(price) {
  return `+$${price}/${store.getShortBilingStr}`;
}

function handleNextClick() {
  store.handleNextStep(2);
}
</script>

<template>
  <StepHeader
    title="Finishing up"
    description="Double-check everything looks OK before confirming."
  />

  <div class="desktop:p rounded-lg bg-alabaster p-4 desktop:p-5">
    <div class="flex items-center justify-between">
      <div class="flex flex-col text-sm desktop:text-md desktop:font-medium">
        {{ captializedPlanName }} ({{ formattedBilling }})
        <span
          class="hover:text-gra cursor-pointer text-sm font-normal text-cool-gray underline"
          @click.capture="handleNextClick"
        >
          Change
        </span>
      </div>

      <span
        class="text-sm font-bold text-marine-blue desktop:text-lg desktop:font-bold"
      >
        {{ store.getFormattedPlanPrice[store.getPlan] }}
      </span>
    </div>

    <template v-if="Object.keys(store.getSelectedAddOns).length">
      <hr class="mt-2 text-light-gray desktop:mt-6" />

      <div class="mt-4 flex flex-col gap-3 desktop:gap-4">
        <div
          v-for="(addon, key) in store.getSelectedAddOns"
          :key="key"
          class="flex justify-between"
        >
          <span class="text-sm font-normal text-cool-gray">
            {{ addon.title }}
          </span>
          <span class="text-sm font-normal text-marine-blue">
            {{ formattedPrice(store.getAddOns[key].price) }}
          </span>
        </div>
      </div>
    </template>
  </div>

  <div class="flex items-center justify-between px-4 pt-5 pb-0">
    <span class="text-sm font-normal text-cool-gray"
      >Total (per {{ lowerCaseBilling }})</span
    >
    <span
      class="font-bold text-purplish-blue desktop:text-lg desktop:font-bold"
      >{{ formattedPrice(store.getTotalPrice) }}</span
    >
  </div>
</template>
