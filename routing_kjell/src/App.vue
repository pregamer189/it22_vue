<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { provide } from 'vue'

const HomeViews = ref(0);

provide ('HomeViews', HomeViews);
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/my">Min sida</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView/>
</template>

<style scoped></style>
