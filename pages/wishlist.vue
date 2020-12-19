<template>
  <div class="container">
    <div class="bg">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="title text-center">My Wishlist</h2>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <div class="table-responsive">
            <table class="table table-cart">
              <tbody v-if="this.products.length === 0">
                 <tr>
                   <td colspan="5" class="text-center">You have no items in your wishlist!</td>
                 </tr>
              </tbody>
              <tbody v-if="this.products.length > 0">
              <tr class="cart-item" v-for="item in this.products" :key="item.id">
                <td class="product-remove">
                  <a href="#" @click.prevent="removeFromWishlist(item.id)">
                    <i class="fa fa-trash-o"></i>
                  </a>
                </td>
                <td class="product-thumbnail">
                  <nuxt-link :to="'/p/' + item.id + '/' + item.slug"><img :src="item.gallery[0].image_url.small" v-bind:alt="item.title"></nuxt-link>
                </td>
                <td class="product-name">
                  <nuxt-link :to="'/p/' + item.id + '/' + item.slug">{{ item.title }}</nuxt-link>
                </td>
                <td class="product-price">$<span>{{ item.price_after_discount }}</span></td>
                <td class="product-stock">
                  <span>{{ item.amount > 0 ? 'In Stock' : 'Out Of Stock' }}</span>
                </td>
              </tr>
              </tbody>
            </table>


          </div>

          <button class="btn btn-danger pull-right" style="margin: 10px" v-if="this.products.length > 0" @click="clearWishlist()">Clear Wishlist</button>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
    import {clearWishlist, getProductsInWishlist, removeFromWishlist} from "../helpers/wishlist";

    export default {
        name: "wishlist",
        data() {
          return {
            products: []
          }
        },
        mounted() {
          this.getProducts();
        },
        methods: {
          getProducts() {
            if(getProductsInWishlist() != null && getProductsInWishlist().length > 0) {
              this.$axios.get("/api/product/products-by-ids?ids=" + getProductsInWishlist()).then(response => {
                this.products = response.data.products;
              });
            } else {
              this.products = [];
            }
          },
          removeFromWishlist(productId) {
            removeFromWishlist(productId);
            this.getProducts();
          },
          clearWishlist() {
            if(confirm("Are you sure?")) {
              clearWishlist();
              this.products = [];
            }
          }
        }
    }
</script>

<style scoped>
  .table-cart.table>tbody>tr {
    border-top: 1px dashed #ddd;
    text-align: left;
  }

  .table-cart.table>tbody>tr:first-child {
    border-top: none;
  }

  .table-cart .product-remove {
    display: table-cell;
    vertical-align: middle;
    height: 100%;
    font-size: 1.1rem;
  }

  .table-cart td:first-child {
    width: 50px;
    padding: 0;
  }

  .table-cart.table>tbody>tr:first-child>td {
    border-top: none;
  }

  .table-cart img {
    height: 100%;
    max-height: 100px;
  }

  .table-cart .product-name {
    font-weight: 600;
  }

  .product-remove i {
    font-size: 19px;
  }
</style>
