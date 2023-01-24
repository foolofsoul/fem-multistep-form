<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { useDataStore } from '@/store';

const store = useDataStore();

const props = defineProps<{
  optionId: string;
  active: boolean;
  title: string;
  description: string;
  price: number;
}>();

const formattedPrice = computed(
  () => `+$${props.price}/${store.getShortBilingStr}`
);

const input = useAttrs().input;
</script>

<template>
  <label
    :for="`addOnCheckbox${props.optionId}`"
    class="flex cursor-pointer items-center justify-between gap-2 rounded-lg border border-solid border-light-gray px-4 py-3 desktop:px-6 desktop:py-4"
    :class="{
      'border-purplish-blue bg-pastel-blue bg-opacity-10': props.active,
    }"
  >
    <div class="flex items-center gap-4 desktop:gap-6">
      <div class="order-2 flex flex-col">
        <span
          class="text-md text-marine-blue desktop:mb-0.5 desktop:text-lg desktop:font-medium"
          >{{ props.title }}</span
        >
        <span
          class="text-xs text-cool-gray desktop:text-sm desktop:font-normal"
          >{{ props.description }}</span
        >
      </div>
      <input
        :id="`addOnCheckbox${props.optionId}`"
        type="checkbox"
        :checked="props.active"
        :value="props.active"
        class="focus:ring-blue-500 peer h-5 w-5 rounded-2xl border-light-gray accent-purplish-blue focus:ring-2"
        v-bind="input"
      />
    </div>
    <span
      class="text-xs text-purplish-blue desktop:text-sm desktop:font-normal"
      >{{ formattedPrice }}</span
    >
  </label>
</template>
