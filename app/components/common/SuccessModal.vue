<script setup lang="ts">
import { Check } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

defineProps<{
  isOpen: boolean;
  title: string;
  description: string;
  buttonText?: string;
}>();

const emit = defineEmits(["close"]);
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
    <div class="bg-background border rounded-xl shadow-2xl max-w-sm w-full p-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
      <div class="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
        <Check class="h-8 w-8" />
      </div>

      <div class="space-y-2">
        <h3 class="text-xl font-bold">{{ title }}</h3>
        <p class="text-muted-foreground text-sm">{{ description }}</p>
      </div>

      <Button class="w-full" size="lg" @click="$emit('close')">
        {{ buttonText || "Continue" }}
      </Button>
    </div>
  </div>
</template>
