<template>
  <ul :class="ulclass">
    <li class="active">
      <a href="#">
        <i class="fas fa-tachometer-alt"></i>Dashboard</a>
    </li>
    <li>
      <a href="#">
        <i class="fas fa-list"></i>Categories</a>
    </li>
    <li>
      <a href="#">
        <i class="fas fa-shopping-cart"></i>Products</a>
    </li>
    <li>
      <a href="#">
        <i class="far fa-map"></i>Shipping addresses</a>
    </li>
    <li>
      <a href="#">
        <i class="fas fa-gears"></i>Orders</a>
    </li>
    <li>
      <a href="#">
        <i class="fas fa-credit-card"></i>Payment methods</a>
    </li>
    <li>
      <a href="#">
        <i class="fas fa-users"></i>Users</a>
    </li>
    <li>
      <a href="#">
        <i class="fas fa-sign-out-alt"></i>Logout</a>
    </li>
  </ul>
</template>

<script>
    export default {
        name: "nav-menu",
        props: ['ulclass']
    }
</script>

<style scoped>

</style>
