<template>
  <v-card
    class="mx-auto"
    max-width="344"
    elevation="2"
  >
    <v-list-item two-line>
      <v-list-item-avatar
        size="80"
      >
        <img
          src="https://cdn.vuetifyjs.com/images/john.jpg"
        >
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ repair.staffName }}
        </v-list-item-title>
        <v-list-item-subtitle>Үйлчилгээний зөвлөх</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item 
      two-line 
      class="flex justify-center"
    >
      <v-progress-circular
        :rotate="-90"
        :size="200"
        :width="25"
        :value="repair.value"
        :color="color"
      >
        {{ repair.text }}
      </v-progress-circular>
    </v-list-item>
    <v-btn 
      block 
      depressed
      x-large
    >
      {{ repair.veNumber }}
    </v-btn>
    <v-btn 
      block 
      depressed
      text
    >
      {{ repair.comment }}
    </v-btn>
    <v-card-actions v-show="isLoggedIn">
      <v-btn
        outlined
        rounded
        text
        color="error"
      >
        <v-icon left>
          mdi-alarm
        </v-icon>
        Дуусгах
      </v-btn>
      <v-btn
        outlined
        rounded
        text
        color="success"
      >
        <v-icon left>
          mdi-pencil
        </v-icon>
        Засах
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
  export default {
    props: {
      repair: {
        default: () => {},
        type: Object,
      }
    },
    data () {
      return {
        interval: {},
        value: 0,
        color: 'primary',
      }
    },
    computed: {
      ...mapState({
        authUser: (state) => state.authUser,
        claims: (state) => state.claims,
      }),
      ...mapGetters({
        isLoggedIn: 'isLoggedIn',
      }),
    },
    watch: {
      value: function (value) { 
        if (value < 33) 
          this.color = 'primary'
        if (value < 66 && value >= 33) 
          this.color = 'teal'
        if (value < 100 && value >= 66) 
          this.color = 'green'
        if (value >= 100) 
          this.color = 'red'
      }, 
    },
    beforeUnmount () {
    },
    mounted () {
    },
  }
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
