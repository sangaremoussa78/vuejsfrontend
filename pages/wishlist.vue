<template>
  <div class="container">
    <div class="bg">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="title text-left">My Wishlist</h2>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          <account-sidebar></account-sidebar>
        </div>
        <div class="col-sm-9 col-md-9">

        </div>
      </div>

    </div>
  </div>
</template>

<script>
    import AccountSidebar from "../components/account-components/AccountSidebar";

    export default {
        name: "wishlist",
      components: {AccountSidebar}
    }
</script>

<style scoped>

</style>
