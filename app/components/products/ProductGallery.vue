<script setup>
defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="space-y-4">
    <div class="aspect-square bg-secondary/30 rounded-xl overflow-hidden relative border border-border">
      <img :src="imageUrl" alt="Product Image" class="w-full h-full object-cover object-center" />
    </div>
  </div>
</template>
