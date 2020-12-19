<template>
  <div>
    <Slider v-if="sliderProducts.length" :sliderProducts="sliderProducts"></Slider>

    <section>
      <div class="container">
        <div class="row">

          <div class="col-sm-12 padding-right">
            <LatestItems v-if="latestProducts.length" :latestProducts="latestProducts"></LatestItems>

            <FeaturedCategories v-if="featuredCategories.length" :featured-categories="featuredCategories"></FeaturedCategories>

            <FeaturedProducts v-if="featuredItems.length" :featuredItems="featuredItems"></FeaturedProducts>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {HomeApis} from '../api/home';
  import Slider from '../components/home-components/Slider';
  import LatestItems from "../components/home-components/LatestItems";
  import FeaturedCategories from "../components/home-components/FeaturedCategories";
  import FeaturedProducts from "../components/home-components/FeaturedProducts";
  import {updateWishlistProducts} from '../helpers/wishlist';

  export default {
    components: {
      FeaturedProducts,
      FeaturedCategories,
      LatestItems,
      Slider
    },
    data() {
      return {
        sliderProducts: [],
        latestProducts: [],
        featuredCategories: [],
        featuredItems: []
      }
    },
    head() {
      return {
        title: 'Online Shop | Home',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Online Shop Home Page'
          }
        ]
      }
    },
    mounted() {
      // retrieve slider products
      HomeApis.getSliderProducts(this.$axios).then(res => {
        this.sliderProducts = res.products;
      });

      // retrieve latest items
      HomeApis.getLatestProducts(this.$axios).then(res => {
        this.latestProducts = res.products;
        updateWishlistProducts(this.latestProducts);
      });

      // featured categories
      HomeApis.getFeaturedCategories(this.$axios).then(res => {
        this.featuredCategories = res.categories;

        this.featuredCategories.map(category => {
          category.products = category.products.slice(0, 4);
        });
      });

      // featured products
      // Try to reduce the main products array into sub arrays, each array with 3 products in order for
      // the bootstrap carousal to render them properly
      HomeApis.getFeaturedProducts(this.$axios).then(res => {
        if(res.products.length == 0) {
          this.featuredItems = [];
        } else {
          const totalProducts = res.products.length;
          const numCarousalItems = Math.ceil(totalProducts / 3);

          for(let i = 0; i < numCarousalItems; i++) {
            this.featuredItems.push({
              id: i + '-' + i + '-' + i,
              products: []
            });
          }

          for(let i = 0; i < res.products.length; i++) {
              const itemIndex = parseInt(i / 3);
              if(this.featuredItems[itemIndex].products.length == 3) {
                this.featuredItems[itemIndex + 1].products.push(res.products[i]);
              } else {
                this.featuredItems[itemIndex].products.push(res.products[i]);
              }
          }
        }
      });
    }
  }
</script>
