<template>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <ShopSidebar pageType="shop" :categoriesTree="categoriesTree"></ShopSidebar>
          </div>

          <div class="col-sm-9 padding-right" v-if="this.products.data && this.products.data.length">
            <div class="features_items">
              <h2 class="title text-center">Latest Items</h2>

              <div class="col-sm-4" v-for="(item, index) in this.products.data" :key="index">
                <ProductTemplateNormal :item="item"></ProductTemplateNormal>
              </div>

              <FrontPagination :data="this.products" v-on:handlePagination="paginate"></FrontPagination>
            </div>
          </div>
          <div class="col-sm-9 padding-right" v-else>
            <p class="text-center no-products"><i class="fa fa-exclamation-triangle"></i> No products found that match your search criteria!</p>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
    import ShopSidebar from "../components/shop-components/ShopSidebar";
    import ProductTemplateNormal from "../components/product-templates/ProductTemplateNormal";
    import FrontPagination from "../components/helpers/FrontPagination";

    export default {
      name: "Shop",
      components: {
        FrontPagination,
        ProductTemplateNormal,
        ShopSidebar
      },
      computed: {
        categoriesTree() {
          return this.$store.state.general.categoriesTree;
        },
        products() {
          return this.$store.state.general.shop.products;
        },
        page() {
          return this.$store.state.general.shop.page;
        }
      },
      head() {
        return {
          title: 'Online Shop | Shop',
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: 'Shop Page'
            }
          ]
        }
      },
      methods: {
        paginate(page_number) {
          this.$store.commit('general/setPage', page_number);

            this.updateRouteQueryString('page', page_number);

            this.$store.dispatch('general/fetchShopProducts');
        },
        updateRouteQueryString(key, value) {
          let query = {...this.$route.query};

          query[key] = value;

          this.$router.push({ path: 'shop', query});
        }
      },
      mounted() {
        // reset shop filter
        this.$store.dispatch('general/resetShopFilter');


        if(this.$route.query.page) {
          this.$store.commit('general/setPage', this.$route.query.page);
        }

        if(this.$route.query.category_id) {
          this.$store.commit('general/setCategoryId', this.$route.query.category_id);

          // load brands by this category
          this.$store.dispatch('general/fetchBrandsByCategory', this.$route.query.category_id);
        }

        if(this.$route.query.brand_id) {
          this.$store.commit('general/setBrand', this.$route.query.brand_id);
        }

        if(this.$route.query.from_price) {
          this.$store.commit('general/setFromPrice', this.$route.query.from_price);
        }

        if(this.$route.query.to_price) {
          this.$store.commit('general/setToPrice', this.$route.query.to_price);
        }

        this.$nextTick(() => {
          this.$nuxt.$loading.start();

          this.$store.dispatch('general/fetchShopProducts').then(() => {
            this.$nuxt.$loading.finish();
          });
        });
      }
    }
</script>

<style scoped>
   .col-sm-4 {
     height: 437px !important;
     margin-bottom: 30px !important;
   }
  .no-products {
    color: #696763;
    font-size: 15px;
    font-family: 'Roboto', sans-serif;
  }
</style>
