<template>
  <div class="container">
    <div class="bg">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="title text-left">My Profile</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-6">
          <div class="well well-sm">
            <div class="row">
              <div class="col-sm-12">
                <h4>
                  {{ user_data.name ? user_data.name : "" }}</h4>

                <ul>
                  <li title="email"><i class="glyphicon glyphicon-envelope"></i> {{ user_data.email ? user_data.email : "" }}</li>
                  <li title="date joined"><i class="glyphicon glyphicon-gift"></i> {{ user_data.created_at ? this.getFormattedDate(user_data.created_at) : "" }}</li>
                </ul>

                <div class="row">
                  <div class="col-md-4">
                    <nuxt-link to="/edit-account" class="btn btn-primary"><i class="fa fa-edit"></i> Update Profile</nuxt-link>
                  </div>
                  <div class="col-md-4">
                    <button type="button" class="btn btn-danger" style="margin-top: 14px" @click="signout()"><i class="fa fa-sign-out"></i> Signout</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
    export default {
        name: "MyAccount",
        middleware: "auth",
        computed: {
          user_data() {
            return this.$store.state.general.auth.user_data;
          }
        },
        head() {
          return {
            title: "My Profile",
            meta: [
              {
                hid: 'description',
                name: 'description',
                content: 'My Profile'
              }
            ]
          }
        },
        methods: {
          getFormattedDate(date) {
            return new Date(date).toISOString().slice(0,10);
          },
          signout() {
            this.$axios.setHeader('Authorization', "Bearer " + localStorage.getItem('auth_token'));
            this.$axios.get('/api/logout').then(response => {
              if(response.data.success) {

                localStorage.removeItem('auth_token');
                localStorage.removeItem('is_authenticated');
                localStorage.removeItem('user_data');

                this.$store.dispatch('general/resetAuthData');

                this.$router.push('/');
              }
            }).catch(err => {
              console.log(err.response);
            });
          }
        }
    }
</script>
