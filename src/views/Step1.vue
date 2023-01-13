<script setup lang="ts">
import FormInput from '@/components/FormInput.vue';
</script>

<template>
  <div class="mb-2 text-xl text-marine-blue">Personal Info</div>
  <p class="mb-4 text-cool-gray">
    Please provide your name, email address, and phone number.
  </p>

  <form class="flex flex-col gap-y-4">
    <FormInput
      id="name"
      type="text"
      label="Name"
      name="name"
      placeholder="e.g. Jimmy Douglas"
    />
    <FormInput
      id="email"
      type="email"
      label="Email Address"
      name="email"
      placeholder="e.g. jimmydouglas@lorem.com"
    />
    <FormInput
      id="phone"
      type="tel"
      label="Phone Number"
      name="phone"
      placeholder="e.g. +1 234 567 890"
    />
  </form>
</template>
