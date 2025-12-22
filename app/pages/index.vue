<script setup>
import { Button } from "@/components/ui/button";
import DatabaseSeeder from "~/components/ui/DatabaseSeeder.vue";
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Walk with Confidence.</h1>
    <p class="text-xl text-muted-foreground mb-8 max-w-2xl">Discover our exclusive collection of sneakers. From classic retro styles to the latest drops, we have something for every step.</p>
    <NuxtLink to="/products">
      <Button size="lg" class="rounded-full px-8">Shop Now</Button>
    </NuxtLink>
  </div>
</template>
