<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { EPlans, type IPlans } from '@/types';
import { useDataStore } from '@/store';
import PlanCard from '@/components/PlanCard.vue';
import StepHeader from '@/components/StepHeader.vue';

// Icons
import arcadeIcon from '@/assets/images/icon-arcade.svg';
import advancedIcon from '@/assets/images/icon-advanced.svg';
import proIcon from '@/assets/images/icon-pro.svg';

const store = useDataStore();

const availablePlans = computed((): IPlans => {
  return {
    [EPlans.arcade]: {
      icon: arcadeIcon,
      title: 'Arcade',
      price: store.getFormattedPlanPrice[EPlans.arcade],
    },
    [EPlans.advanced]: {
      icon: advancedIcon,
      title: 'Advanced',
      price: store.getFormattedPlanPrice[EPlans.advanced],
    },
    [EPlans.pro]: {
      icon: proIcon,
      title: 'Pro',
      price: store.getFormattedPlanPrice[EPlans.pro],
    },
  };
});

function handlePlanClick(plan: EPlans) {
  store.setPlan(plan);
}

function handleBillingClick(e) {
  const selectedVal = e.target.checked;
  store.setBillingOption(selectedVal);
}

onMounted(() => {
  store.setPlan(EPlans.arcade);
});
</script>

<template>
  <StepHeader
    title="Select your plan"
    description="You have the option of monthly or yearly billing."
  />

  <div class="flex flex-col gap-3 desktop:grid desktop:grid-cols-3">
    <PlanCard
      v-for="(plan, key) in availablePlans"
      :key="key"
      :plan="key"
      :icon-src="plan.icon"
      :title="plan.title"
      :price="plan.price"
      @click="handlePlanClick(key)"
    />
  </div>

  <div
    class="mt-6 flex content-center justify-center rounded-lg bg-alabaster p-3"
  >
    <label class="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        :value="store.getBillingOption"
        :checked="store.getBillingOption"
        class="peer sr-only"
        @click="handleBillingClick"
      />
      <span
        class="mr-6 text-sm font-medium text-marine-blue peer-checked:text-cool-gray"
        >Monthly</span
      >
      <div
        class="peer-focus:ring-blue-300 peer relative h-5 w-10 rounded-full bg-marine-blue after:absolute after:top-[4px] after:left-[4px] after:h-3 after:w-3 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-marine-blue peer-checked:after:translate-x-[calc(100%+8px)] peer-focus:outline-none peer-focus:ring-4"
      />
      <span
        class="ml-6 text-sm font-medium text-cool-gray peer-checked:text-marine-blue"
        >Yearly</span
      >
    </label>
  </div>
</template>
