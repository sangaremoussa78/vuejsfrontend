<template>
  <header id="header"><!--header-->

    <div class="header-middle"><!--header-middle-->
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-4 clearfix">
            <div class="logo pull-left">
              <nuxt-link to="/"><img src="/images/home/logo.png" alt="" /></nuxt-link>
            </div>
          </div>

          <div class="col-md-8 clearfix">
            <div class="shop-menu clearfix pull-right">
              <ul class="nav navbar-nav">
                <li><nuxt-link to="/account"><i class="fa fa-user"></i>Mon Compte</nuxt-link></li>
                <li><nuxt-link to="/wishlist"><i class="fa fa-star"></i> Wishlist</nuxt-link></li>
                <li><nuxt-link to="/orders"><i class="fa fa-list"></i>Commandes</nuxt-link></li>
                <li><nuxt-link to="/cart"><i class="fa fa-shopping-cart"></i> Panier <span class="badge badge-danger" v-if="this.cart.length > 0">{{this.cart.length}}</span></nuxt-link></li>
                <li v-if="!this.isLogged"><nuxt-link to="/login"><i class="fa fa-sign-in"></i>Connexion</nuxt-link></li>
                <li v-if="this.isLogged"><a href="#" v-on:click.prevent="signout()"><i class="fa fa-sign-out"></i>Deconnexion </a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div><!--/header-middle-->
     <!-- <div class="banner" style="margin:20px; height:400px;background-image:url(); border:2px solid green;
      display:flex; justify-content:center;align-items:center;">
        <div class="container" style="border:1px solid yellow ;align-items:center;" >
          <div class="row">
            <div class="col-md-8" style="
            border:1px solid red;
            display:flex;
            justify-content:center;
            align-items:center;
            ">
              <input type="text" placeholder=" Rechercher" class="form-control">
            </div>
          </div>
        </div>
      </div>-->
    <div class="header-bottom" ><!--header-bottom-->
    <div class="container-fluid">
      <div class="container" >
        <div class="row" >
          <div class="col-sm-9">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div class="mainmenu pull-left">
              <ul class="nav navbar-nav collapse navbar-collapse">
                <li><nuxt-link to="/" :class="{active: this.$route.path === '/'}">Accueil</nuxt-link></li>
                <li><nuxt-link to="/shop" :class="{active: this.$route.path.indexOf('shop') !== -1}">Produits</nuxt-link></li>
                <li class="dropdown">
                  <a href="#">Categories<i class="fa fa-angle-down"></i></a>
                  <CategoryTree v-if="this.categoriesTree.length" :dataTree="categoriesTree"></CategoryTree>
                </li>
               <!-- <li><nuxt-link to="/contactus" :class="{active: this.$route.path.indexOf('contactus') !== -1}">Contact</nuxt-link></li>-->
              </ul>
            </div>
          </div>
          <div class="col-sm-3">
            <form method="get" @submit.prevent="search()">
              <div class="search_box pull-right">
                <input type="text" name="keyword" placeholder="Cherchez votre Medicament" v-model="keyword"/>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
    </div><!--/header-bottom-->
  </header>
</template>

<script>
    import CategoryTree from '../../components/partials/CategoryTree';
    export default {
        name: "FrontHeader",
        components: {CategoryTree},
        data() {
          return {
            keyword: ""
          }
        },
        computed: {
          categoriesTree() {
            return this.$store.state.general.categoriesTree;
          },
          isLogged() {
            return this.$store.state.general.auth.is_logged;
          },
          cart() {
            return this.$store.state.cart.cart;
          }
        },
        methods: {
          search() {
            // reset shop filter
            this.$store.dispatch('general/resetShopFilter');

            this.$store.commit('general/setKeyword', this.keyword);

            this.$router.push({ path: "/search", query: {keyword: this.keyword}});

            this.$store.dispatch('general/fetchShopProducts');
          },
          signout() {
            this.$axios.setHeader('Authorization', "Bearer " + localStorage.getItem('auth_token'));
            this.$axios.get('/api/logout').then(response => {
              if(response.data.success) {

                localStorage.removeItem('auth_token');
                localStorage.removeItem('is_authenticated');
                localStorage.removeItem('user_data');

                this.$store.dispatch('general/resetAuthData');

                this.onAfterSignout();

                this.$router.push('/');
              }
            }).catch(err => {
              console.log(err.response);
              this.onAfterSignout();
            });
          },
          onAfterSignout() {
            this.$store.commit('cart/clear');
          }
        },
        mounted() {
          this.$store.dispatch('general/fetchCategoryTree');
        }
    }
</script>

<style scoped>
  .search_box input {
    font-size: 18px;
    color: #424040;
  }

  .badge-danger {
    color: #fff;
    background-color: #dc3545;
  }
</style>
