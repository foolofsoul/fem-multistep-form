<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '@/store';
import StepHeader from '@/components/StepHeader.vue';
import AddOnOption from '@/components/AddOnOption.vue';

const store = useDataStore();

const addOnOptions = computed(() => ({
  service: {
    active: store.getAddOns.service.active,
    title: store.getAddOns.service.title,
    description: 'Access to multiplayer games',
    price: store.getAddOns.service.price,
  },
  storage: {
    active: store.getAddOns.storage.active,
    title: store.getAddOns.storage.title,
    description: 'Extra 1TB of cloud save',
    price: store.getAddOns.storage.price,
  },
  profile: {
    active: store.getAddOns.profile.active,
    title: store.getAddOns.profile.title,
    description: 'Custom theme on your profile',
    price: store.getAddOns.profile.price,
  },
}));

function checkOption(key) {
  store.setAddOn(key);
}
</script>

<template>
  <StepHeader
    title="Pick add-ons"
    description="Add-ons help enhance your gaming experience."
  />

  <form class="flex flex-col gap-y-4">
    <AddOnOption
      v-for="(option, key) in addOnOptions"
      :key="key"
      :option-id="key"
      :active="option.active"
      :title="option.title"
      :description="option.description"
      :price="option.price"
      @input="checkOption(key)"
    />
  </form>
</template>
