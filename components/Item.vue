<template>
  <v-card
    class="mx-auto"
    max-width="344"
    elevation="2"
  >
    <RepairDialog 
      :dialog="dialogData"
    />
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
        :value="index * 10"
        :color="color"
        class="text-4xl select-none"
      >
        {{ text() }}
      </v-progress-circular>
    </v-list-item>
    <v-btn 
      block 
      depressed
      x-large
      class="text-4xl"
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
        color="warning"
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
        @click="edit"
      >
        <v-icon left>
          mdi-pencil
        </v-icon>
        Засах
      </v-btn>
      <v-btn
        outlined
        rounded
        text
        x-small
        color="error"
      >
        <v-icon left>
          mdi-delete
        </v-icon>
        Устгах
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
      },
      index: {
        default: () => 0,
        type: Number,
      }
    },
    data: () => ({
        value: 0,
        color: 'primary',
        dialogData: {},
    }),
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
    methods: {
      text () {
        const tmp = this.index * 10
        this.value = tmp
        return Math.floor(tmp / 60) + ":"  + tmp % 60 + ":" + 12
      },
      edit () {
        this.dialogData = {
          show: true,
          repair: this.repair,
        }
      },
    },
  }
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
.text-4xl {
  font-size: 2.25rem !important;
}
</style>
