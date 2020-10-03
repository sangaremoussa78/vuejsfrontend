<template>
  <header id="header"><!--header-->

    <div class="header-middle"><!--header-middle-->
      <div class="container">
        <div class="row">
          <div class="col-sm-4">
            <div class="logo pull-left">
              <nuxt-link to="/"><img src="images/home/logo.png" alt="" /></nuxt-link>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="shop-menu pull-right">
              <ul class="nav navbar-nav">
                <li><a href="#"><i class="fa fa-user"></i> Account</a></li>
                <li><a href="#"><i class="fa fa-star"></i> Wishlist</a></li>
                <li><a href="#"><i class="fa fa-list"></i> My Orders</a></li>
                <li><nuxt-link to="/cart"><i class="fa fa-shopping-cart"></i> Cart</nuxt-link></li>
                <li><nuxt-link to="/login"><i class="fa fa-lock"></i> Login</nuxt-link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div><!--/header-middle-->

    <div class="header-bottom"><!--header-bottom-->
      <div class="container">
        <div class="row">
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
                <li><nuxt-link to="/" :class="{active: this.$route.path === '/'}">Home</nuxt-link></li>
                <li><nuxt-link to="/shop" :class="{active: this.$route.path.indexOf('shop') !== -1}">Shop</nuxt-link></li>
                <li class="dropdown">
                  <a href="#">Categories<i class="fa fa-angle-down"></i></a>
                  <CategoryTree v-if="this.categoriesTree.length" :dataTree="categoriesTree"></CategoryTree>
                </li>
                <li><nuxt-link to="/contactus" :class="{active: this.$route.path.indexOf('contactus') !== -1}">Contact</nuxt-link></li>
              </ul>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="search_box pull-right">
              <input type="text" placeholder="Search"/>
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
        computed: {
          categoriesTree() {
            return this.$store.state.general.categoriesTree;
          }
        },
        mounted() {
          this.$store.dispatch('general/fetchCategoryTree');
        }
    }
</script>

<style scoped>

</style>
