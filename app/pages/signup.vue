<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const firstname = ref("");
const lastname = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const handleRegister = async () => {
  loading.value = true;
  try {
    const fullName = `${firstname.value} ${lastname.value}`;
    await authStore.register(email.value, password.value, fullName);
    router.push("/");
  } catch (e) {
    alert("Registration failed: " + e.message);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex min-h-[80vh] items-center justify-center px-4 py-12">
    <Card class="w-full max-w-md">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl font-bold text-center">Create an Account</CardTitle>
        <CardDescription class="text-center"> Enter your information to get started </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <label class="text-sm font-medium">First Name</label>
            <Input placeholder="John" v-model="firstname" />
          </div>
          <div class="grid gap-2">
            <label class="text-sm font-medium">Last Name</label>
            <Input placeholder="Doe" v-model="lastname" />
          </div>
        </div>
        <div class="grid gap-2">
          <label class="text-sm font-medium">Email</label>
          <Input type="email" placeholder="m@example.com" v-model="email" />
        </div>
        <div class="grid gap-2">
          <label class="text-sm font-medium">Password</label>
          <Input type="password" v-model="password" />
        </div>
      </CardContent>
      <CardFooter class="flex flex-col gap-4">
        <Button class="w-full" @click="handleRegister" :disabled="loading">
          {{ loading ? "Creating Account..." : "Sign Up" }}
        </Button>
        <p class="text-center text-sm text-muted-foreground">
          Already have an account?
          <NuxtLink to="/login" class="underline text-primary hover:text-primary/80">Login</NuxtLink>
        </p>
      </CardFooter>
    </Card>
  </div>
</template>
