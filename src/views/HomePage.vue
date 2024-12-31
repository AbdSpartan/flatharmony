<template>
  <div class="home">
    <h1>Welcome to FlatHarmony</h1>
    <router-link v-if="!isLoggedIn" to="/login" class="btn">Login</router-link>
    <router-link v-if="!isLoggedIn" to="/register" class="btn">Register</router-link>
    <router-link v-if="isLoggedIn" to="/dashboard" class="btn">Dashboard</router-link>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true
    }
  }
})
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}

.btn {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.btn:hover {
  background-color: #0056b3;
}
</style>