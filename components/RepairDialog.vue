<template>
  <v-dialog
    v-model="open"
    max-width="500px"
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                v-model="editedItem.veNumber"
                label="Машины дугаар"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-combobox
                v-model="editedItem.role"
                :items="zausers"
                label="Засварын ажилтан"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-combobox
                v-model="editedItem.role"
                :items="uzusers"
                label="Үйлчилгээний зөвлөх"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="close"
        >
          Болих 
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="save"
        >
          Хадгалах
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'
export default {
    middleware: 'authenticated',
    props: {
      dialog: {
        default: () => {},
        type: Object,
      },
    },
    data: () => ({
      open: false,
      loading: true,
      editedItem: {
        veNumber: '',
        duration: '',
        comment: '',
      },
      defaultItem: {
        veNumber: '',
        duration: '',
        comment: '',
      },
    }),
    computed: {
      ...mapState ({
        authUser: (state) => state.authUser,
      }),
      ...mapGetters ({
        isLoggedIn: 'isLoggedIn',
        uzusers: 'operators',
        zausers: 'repairmen',
      }),
      formTitle () {
        return this.dialog.create ? 'Шинэ захиалга нэмэх' : 'Засах'
      },
    },

    watch: {
      dialog (val) {
        this.open = val.show
        this.editedItem = val.repair
      },
    },

    methods: {
      close () {
        this.open = false
      },
      saveToDB (url) {
        if (url) this.editedItem.url = url
        const saveUser = this.$fire.functions.httpsCallable('save')
        saveUser(this.editedItem).then((result) => {
          console.log('Success',result);
          this.loading = false;
        }).catch((error) => {
          console.log(error)
          this.loading = false;
        });
        this.close()
      },
      save () {
        alert("Hello")
      },
      onFileChange() {
        const file = this.editedItem.photoURL
        this.editedItem.url = URL.createObjectURL(file)
      }
    },
}
</script>
