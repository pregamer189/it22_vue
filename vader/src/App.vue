<script setup>
import { RouterLink, RouterView } from 'vue-router';



</script>

<template>
  <header>

    <div class="wrapper">

      <nav>
        <ul>
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/about">About</RouterLink>
          </li>
          <li>
            <RouterLink to="/contact">Contact</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <RouterView/>
</template>
<style scoped>

</style>
