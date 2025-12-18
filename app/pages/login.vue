<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const email = ref("");
const password = ref("");
const loading = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  try {
    await authStore.login(email.value, password.value);
    router.push("/");
  } catch (e) {
    alert("Login failed: " + e.message);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex min-h-[80vh] items-center justify-center px-4 py-12">
    <Card class="w-full max-w-md">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl font-bold text-center">Welcome Back</CardTitle>
        <CardDescription class="text-center"> Enter your email to sign in to your account </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <label for="email" class="text-sm font-medium">Email</label>
          <Input id="email" type="email" placeholder="m@example.com" v-model="email" />
        </div>
        <div class="grid gap-2">
          <label for="password" class="text-sm font-medium">Password</label>
          <Input id="password" type="password" v-model="password" />
        </div>
      </CardContent>
      <CardFooter class="flex flex-col gap-4">
        <Button class="w-full" @click="handleLogin" :disabled="loading">
          {{ loading ? "Signing in..." : "Sign In" }}
        </Button>
        <p class="text-center text-sm text-muted-foreground">
          Don't have an account?
          <NuxtLink to="/signup" class="underline text-primary hover:text-primary/80">Sign up</NuxtLink>
        </p>
      </CardFooter>
    </Card>
  </div>
</template>
