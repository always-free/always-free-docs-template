<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" v-for="page in pages" :key="page.title">
        <v-card class="mb-8" max-width="780px" outlined>
          <v-card-title class="text-h5">{{ page.title }}</v-card-title>
          <v-card-subtitle>
            {{ page.frontmatter.description }}
          </v-card-subtitle>
          <v-card-actions>
            <v-btn :to="page.path" text color="#3eaf7c"> Learn more </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BlogList",
  props: {
    blogType: {
      type: String,
      default: "article",
    },
  },
  data() {
    return {
      pages: [],
    };
  },
  mounted() {
    this.$site.pages.forEach((page) => {
      if (page.frontmatter.type === this.blogType) {
        this.pages.push(page);
      }
    });
  },
};
</script>