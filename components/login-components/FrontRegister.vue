<template>
  <div class="signup-form"><!--sign up form-->
    <h2>New User Signup!</h2>
    <form action="#" method="post" @submit.prevent="register()">
      <input type="text" placeholder="Name" name="name" v-model="register_data.name" />
      <input type="email" placeholder="Email Address" name="email" v-model="register_data.email"/>
      <input type="password" placeholder="Password" name="password" v-model="register_data.password" />
      <input type="password" placeholder="Password Confirmation" name="password_confirmation" v-model="register_data.password_confirmation" />
      <button type="submit" class="btn btn-default">Signup</button>
    </form>
  </div><!--/sign up form-->
</template>

<script>
    export default {
        name: "FrontRegister",
        data() {
          return {
            register_data: {
              name: "",
              email: "",
              password: "",
              password_confirmation: ""
            }
          }
        },
        methods: {
          register() {

          }
        }
    }
</script>

<style scoped>

</style>
