<script setup lang="ts">
import { SearchX } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

defineProps<{
  title?: string;
  description?: string;
  actionLabel?: string;
}>();

defineEmits(["reset"]);
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 text-center px-4">
    <div class="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
      <SearchX class="h-10 w-10 text-muted-foreground" />
    </div>
    <h3 class="text-2xl font-bold tracking-tight mb-2 text-foreground">
      {{ title || "No products found" }}
    </h3>
    <p class="text-muted-foreground max-w-sm mb-8">
      {{ description || "We couldn't find what you were looking for. Try adjusting your search or filters." }}
    </p>
    <Button v-if="actionLabel" @click="$emit('reset')" variant="outline">
      {{ actionLabel }}
    </Button>
  </div>
</template>
