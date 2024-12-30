<template>
  <div class="home">
    <h1>Welcome to My App</h1>
    <router-link to="/login" class="btn">Login</router-link>
    <router-link to="/register" class="btn">Register</router-link>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  margin-top: 3rem;
}
.btn {
  display: inline-block;
  margin: 1rem;
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
.btn:hover {
  background: #0056b3;
}
</style>
