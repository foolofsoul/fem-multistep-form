<script setup lang="ts">
import ThankYouIcon from '@/assets/images/icon-thank-you.svg';
</script>

<template>
  <div
    class="flex flex-col items-center py-12 desktop:-m-3 desktop:h-full desktop:justify-center desktop:p-0"
  >
    <div class="mb-6 w-14 desktop:w-20">
      <img class="w-full" :src="ThankYouIcon" alt="" />
    </div>

    <h2 class="mb-2 text-xl text-marine-blue desktop:text-2xl">Thank You!</h2>
    <p class="text-center text-cool-gray desktop:leading-relaxed">
      Thanks for confirming your subscription! We hope you have fun using our
      platform. If you ever need support, please feel free to email us at
      support@loremgaming.com.
    </p>
  </div>
</template>
