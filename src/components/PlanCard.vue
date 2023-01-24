<script setup lang="ts">
import { computed } from 'vue';
import type { EPlans } from '@/types';
import { useDataStore } from '@/store';

const store = useDataStore();

const props = defineProps<{
  plan: EPlans;
  iconSrc: string;
  title: string;
  price: string;
}>();

const isActiveClasses = computed(() => {
  return props.plan == store.getPlan
    ? 'border-purplish-blue bg-pastel-blue bg-opacity-10'
    : '';
});

const showFreeText = computed(() => store.getBillingOption);
</script>

<template>
  <div
    class="flex cursor-pointer gap-3 rounded-lg border border-solid border-light-gray p-4 desktop:grow desktop:flex-col"
    :class="isActiveClasses"
  >
    <div class="flex flex-col desktop:mb-8 desktop:w-9">
      <img :src="iconSrc" />
    </div>
    <div class="flex flex-col gap-0.5">
      <p class="mb-0 font-medium text-marine-blue">{{ props.title }}</p>
      <span class="text-sm font-normal text-cool-gray">{{ props.price }}</span>
      <span v-if="showFreeText" class="text-xs text-marine-blue">
        2 months free
      </span>
    </div>
  </div>
</template>
