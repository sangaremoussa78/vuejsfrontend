<template>
  <div class="features_items">
    <h2 class="title text-center">Latest Items</h2>

    <ProductTemplateNormal v-for="(item, index) in this.latestProducts" :key="index" :item="item"></ProductTemplateNormal>

  </div>
</template>

<script>
    import ProductTemplateNormal from "../product-templates/ProductTemplateNormal";
    export default {
        name: "LatestItems",
        components: {ProductTemplateNormal},
        props: ["latestProducts"]
    }
</script>

<style scoped>

</style>
