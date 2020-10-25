<template>
  <section>
    <div class="container">
      <h2 class="title text-left">Latest Items In {{ this.category ? this.category.title : "" }}</h2>
      <div class="row">
        <div class="col-sm-3">
          <ShopSidebar pageType="category"></ShopSidebar>
        </div>

        <div class="col-sm-9 padding-right" v-if="this.products.data && this.products.data.length">
          <div class="features_items">

            <div class="col-sm-4" v-for="(item, index) in this.products.data" :key="index">
              <ProductTemplateNormal :item="item"></ProductTemplateNormal>
            </div>

            <FrontPagination :data="this.products" v-on:handlePagination="paginate"></FrontPagination>
          </div>
        </div>
        <div class="col-sm-9 padding-right" v-else>
          <p class="text-center no-products"><i class="fa fa-exclamation-triangle"></i> No products available in this category! Check back later</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
    import ShopSidebar from "../../../../components/shop-components/ShopSidebar";
    import ProductTemplateNormal from "../../../../components/product-templates/ProductTemplateNormal";
    import FrontPagination from "../../../../components/helpers/FrontPagination";
    import {paginate} from "../../../../helpers/functions";

    export default {
        name: "Category",
        validate({params}) {
          return /^\d+$/.test(params.id);
        },
        components: {
            FrontPagination,
            ProductTemplateNormal,
            ShopSidebar
       },
      head() {
          return {
            title: 'Online Shop | ' + (this.categoryDetails ? this.categoryDetails.title : ""),
            meta: [
              {
                hid: 'description',
                name: 'description',
                content: (this.categoryDetails ? ( this.categoryDetails.description ? this.categoryDetails.description : this.categoryDetails.title ) : "")
              }
            ]
          }
      },
      asyncData(context) {
        context.store.dispatch('general/resetShopFilter');
        context.store.commit('general/setCategoryId', context.params.id);
        return context.store.dispatch('general/fetchCategory', context.params.id).then((category) => {
          return {
            categoryDetails: category
          }
        });
      },
      computed: {
        category() {
          return this.$store.state.general.category;
        },
        products() {
          return this.$store.state.general.shop.products;
        },
        page() {
          return this.$store.state.general.shop.page;
        }
      },
      methods: {
        paginate(page_number) {
          paginate(page_number);
        }
      },
      mounted() {
         // load brands by this category
         this.$store.dispatch('general/fetchBrandsByCategory', this.$route.params.id);

         if (this.$route.query.page) {
           this.$store.commit('general/setPage', this.$route.query.page);
         }

         if (this.$route.query.brand_id) {
           this.$store.commit('general/setBrand', this.$route.query.brand_id);
         }

         if (this.$route.query.from_price) {
           this.$store.commit('general/setFromPrice', this.$route.query.from_price);
         }

         if (this.$route.query.to_price) {
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
