<template>
  <v-card>
    <v-footer
      absolute
      :padless="true"
    >
      <v-card
        flat
        tile
        width="100%"
        class="grey text-center"
      >
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} он — 
          <strong>ⓒ Моннис</strong>, Бүх эрх хуулиар хамгаалагдсан.
        </v-card-text>
      </v-card>
    </v-footer>
  </v-card>
</template>
<script>
  export default {
  }
</script>
