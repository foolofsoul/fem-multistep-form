<script setup lang="ts">
import { EPlans, type IPlans } from '@/types';
import { store } from '@/store';
import PlanCard from '@/components/PlanCard.vue';
import StepHeader from '@/components/StepHeader.vue';
import arcadeIcon from '@/assets/images/icon-arcade.svg';
import advancedIcon from '@/assets/images/icon-advanced.svg';
import proIcon from '@/assets/images/icon-pro.svg';

const availablePlans: IPlans = {
  [EPlans.arcade]: {
    icon: arcadeIcon,
    title: 'Arcade',
    price: '',
  },
  [EPlans.advanced]: {
    icon: advancedIcon,
    title: 'Advanced',
    price: '',
  },
  [EPlans.pro]: {
    icon: proIcon,
    title: 'Pro',
    price: '',
  },
};

function handlePlanClick(plan) {
  store.setPlan(plan);
}
</script>

<template>
  <StepHeader
    title="Select your plan"
    description="You have the option of monthly or yearly billing."
  />

  <PlanCard
    v-for="(plan, key) in availablePlans"
    :key="key"
    :icon-src="plan.icon"
    :title="plan.title"
    :price="plan.price"
    @click="handlePlanClick(key)"
  />
</template>
