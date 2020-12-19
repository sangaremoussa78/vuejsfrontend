<template>
    <div class="product-image-wrapper">
      <div class="single-products">
        <div class="productinfo text-center">
          <img v-bind:src="item.gallery[0].image_url.medium" v-bind:alt="item.title" style="width: auto !important;" />
          <h2>${{ item.price_after_discount }}</h2>
          <del v-if="item.is_discount_active">${{ item.price }}</del>
          <p>{{ item.title_short }}</p>
          <a v-if="!this.isProductAddedToCart(item.id)" href="javascript:void(0);" class="btn btn-default add-to-cart" @click.prevent="addToCart(item.id)"><i class="fa fa-shopping-cart"></i>Add to cart</a>
          <a v-if="this.isProductAddedToCart(item.id)" href="javascript:void(0);" class="btn btn-default add-to-cart" @click.prevent="removeFromCart(item.id)"><i class="fa fa-shopping-cart"></i>Remove from cart</a>
        </div>
        <div class="product-overlay">
          <div class="overlay-content">
            <h2>${{ item.price_after_discount }}</h2>
            <del v-if="item.is_discount_active">${{ item.price }}</del>
            <p>{{ item.title_short }}</p>
            <a v-if="!this.isProductAddedToCart(item.id)" href="javascript:void(0);" class="btn btn-default add-to-cart" @click.prevent="addToCart(item.id)"><i class="fa fa-shopping-cart"></i>Add to cart</a>
            <a v-if="this.isProductAddedToCart(item.id)" href="javascript:void(0);" class="btn btn-default add-to-cart" @click.prevent="removeFromCart(item.id)"><i class="fa fa-shopping-cart"></i>Remove from cart</a>
          </div>
        </div>
        <div class="discount-ribbon" v-if="item.is_discount_active"><span>{{ item.discount }}%</span></div>
      </div>
      <div class="choose">
        <ul class="nav nav-pills nav-justified">
          <li v-if="!item.in_wishlist"><a href="javascript:void(0);" @click.prevent="addToWishList(item)"><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
          <li v-if="item.in_wishlist"><a href="javascript:void(0);" @click.prevent="removeFromWishlist(item)"><i class="fa fa-trash-o"></i>Erase from wishlist</a></li>
          <li><nuxt-link :to="'/p/' + item.id + '/' + item.slug"><i class="fa fa-eye"></i>view item</nuxt-link></li>
        </ul>
      </div>
    </div>
</template>

<script>
    import {addToCart, removeFromCartByProductId, isProductInCart} from '../../helpers/cart';
    import {addToWishlist, removeFromWishlist} from '../../helpers/wishlist';

    export default {
        name: "ProductTemplateNormal",
        props: ["item"],
        data() {
          return {

          }
        },
        methods: {
            addToCart(productId) {
              addToCart(productId, 1, this.$store, this.$router);
            },
            isProductAddedToCart(productId) {
              return isProductInCart(productId, this.$store);
            },
            removeFromCart(productId) {
              removeFromCartByProductId(productId, this.$store, this.$router);
            },
            addToWishList(product) {
              addToWishlist(product.id);

              if(this.$router.currentRoute.name == 'index') {
                product.in_wishlist = true;
              } else {
                this.$store.commit('general/setWishedProduct', product.id);
              }
            },
            removeFromWishlist(product) {
              removeFromWishlist(product.id);

              if(this.$router.currentRoute.name == 'index') {
                product.in_wishlist = false;
              } else {
                this.$store.commit('general/setUnwishedProduct', product.id);
              }
            }
        }
    }
</script>
