<template>
  <v-app class="flex justify-center items-center h-screen w-screen flex-col">
      <v-form @submit.prevent="submit">
        <v-container>
          <v-img
            lazy-src="/monnis.jpg"
            max-height="150"
            max-width="250"
            src="/monnis.jpg"
            class="mb-4"
          ></v-img>
          <v-row>
              <v-text-field
                v-model="username"
                label="Е-мэйл"
                :rules="emailrules"
                filled
              ></v-text-field>
          </v-row>
          <v-row>
              <v-text-field
                v-model="password"
                label="Нууц үг"
                :rules="passrules"
                filled
                :type="'password'"
              ></v-text-field>
          </v-row>
        </v-container>
        <v-btn
          class="text-black"
          :loading="loading"
          :disabled="loading"
          large
          type="submit"
        >
          Нэвтрэх
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
      </v-form>
      <v-dialog
        v-model="error_msg"
        max-width="290"
      >
        <v-card>
          <v-card-text class="pt-4">
            Е-мэйл эсвэл нууц үг буруу байна.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="error_msg = false"
            >
              Хаах
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-app>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
    computed: {
      ...mapState({
        authUser: (state) => state.authUser,
      }),
      ...mapGetters({
        isLoggedIn: 'isLoggedIn',
      }),
    },
    data () {
      return {
         emailrules: [
            value => !!value || 'Хоосон байх боломжгүй.',
            value => (value && value.length >= 6) || 'Доод тал 6 тэмдэгт орсон.',
            value => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Е-мэйл хаяг оруулна уу.'
         ],
         passrules: [
            value => !!value || 'Хоосон байх боломжгүй.',
            value => (value && value.length >= 6) || 'Доод тал 6 тэмдэгт орсон.',
         ],
         username: "",
         password: "",
         loading: false,
         error_msg: false,
      }
    },
    methods: {
      async submit () {
        this.loading = true

        try {
          await this.$fire.auth.signInWithEmailAndPassword(
            this.username,
            this.password
          )
          this.loading = false
          this.$router.push({
            name: 'dashboard',
          })
        } catch (e) {
          this.loading = false
          this.error_msg = true
        }
      },
    },
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
