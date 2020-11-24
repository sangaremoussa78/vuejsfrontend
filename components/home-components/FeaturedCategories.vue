<template>
  <div class="category-tab">
    <div class="col-sm-12">
      <ul class="nav nav-tabs">
        <li v-for="(category, index) in this.featuredCategories" :key="index" :class="{'active': index == 0}">
          <a :href="'#' + category.id + '-' + category.id" data-toggle="tab">{{ category.title }}</a>
        </li>
      </ul>
    </div>
    <div class="tab-content">
      <div v-for="(category, index) in this.featuredCategories" :key="index" :class="'tab-pane fade ' + (index == 0 ? 'active in' : '')" :id="category.id + '-' + category.id" >
        <div class="col-sm-3" v-if="category.products.length" v-for="product in category.products" :key="product.id">
          <ProductTemplateSmall :item="product"></ProductTemplateSmall>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import ProductTemplateSmall from "../product-templates/ProductTemplateSmall";
    export default {
        name: "FeaturedCategories",
        components: {ProductTemplateSmall},
        props: ["featuredCategories"]
    }
</script>

<style scoped>

</style>
