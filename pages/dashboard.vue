<template>
  <div class="min-h-screen">
    <v-toolbar
      color="primary"
      dark
      class="d-flex flex-column justify-space-between"
    >
      <v-toolbar-title>Засварууд</v-toolbar-title>
      <v-spacer />
      <div>
        <v-list-item
          append
        >
          <v-btn 
            @click="create"
          >
            <v-icon>
              mdi-plus
            </v-icon>
            Захиалга нэмэх
          </v-btn>
        </v-list-item>
      </div>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>
        <v-icon left>
          mdi-home-outline
        </v-icon>
        <v-badge
          color="green"
          content="6"
          class="mr-4"
        >
          Яг одоо
        </v-badge>
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-phone-in-talk
        </v-icon>
        <v-badge
          color="green"
          content="16"
          class="mr-4"
        >
          Хийгдэх
        </v-badge>
      </v-tab>

      <v-tab-item class="flex flex-wrap pb-20">
        <Item 
          v-for="index in 8" 
          :key="index" 
          class="m-4"
          :repair="repair"
        />
      </v-tab-item>
      <v-tab-item>
        <TimeLine />
      </v-tab-item>
    </v-tabs>
    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          class="mb-2"
          v-bind="attrs"
          v-on="on"
        >
          Шинэ захиалга нэмэх
        </v-btn>
      </template>
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
                  v-model="editedItem.vecNumber"
                  label="Машины дугаар"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="editedItem.email"
                  label="Е-мэйл"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="editedItem.phoneNumber"
                  label="Утас(976)"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-combobox
                  v-model="editedItem.role"
                  :items="roles"
                  label="Хэрэглэгчийн төрөл"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-img
                  class="mx-2"
                  :src="editedItem.url ? editedItem.url : '/default_user.png'"
                  max-height="200"
                  max-width="100"
                  contain
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-file-input
                  v-model="editedItem.photoURL"
                  accept="image/*"
                  truncate-length="15"
                  label="Зураг оруулах"
                  prepend-icon="mdi-account"
                  @change="onFileChange"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="editedItem.password"
                  type="password"
                  label="Нууц үг"
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
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
    layout: 'dashboard',
    middleware: 'authenticated',
    data: () => ({
      repair: {
        staffName: "Б.Ганцбаатар",
        veNumber: "2348-УНБ", 
        value: 50, // Percent
        text: "39мин", // Time left
        comment: "Дугуй сольж байна.", // Time left
      },
      dialog: false,
      loading: true,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        vecNumber: '',
        duration: '',
        comment: '',
      },
      defaultItem: {
        vecNumber: '',
        duration: '',
        comment: '',
      },
    }),
    computed: {
      ...mapState({
        authUser: (state) => state.authUser,
      }),
      ...mapGetters({
        isLoggedIn: 'isLoggedIn',
      }),
      formTitle () {
        return this.editedIndex === -1 ? 'Шинэ ажилтан нэмэх' : 'Засах'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    mounted () {
        this.$fire.database.ref('message').on('value', snapshot => {
            this.message = snapshot.val().message;
        })
    },
    methods: {
      create () {
        alert()
      },
      editItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log(item);
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.loading = true;
        const delUser = this.$fire.functions.httpsCallable('deleteUser')
        delUser(this.editedItem).then((result) => {
          this.users.splice(this.editedIndex, 1)
          console.log('Success',result);
          this.loading = false;
        }).catch((error) => {
          console.log(error)
          this.loading = false;
        });
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
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
        if (this.editedIndex > -1) {
          Object.assign(this.users[this.editedIndex], this.editedItem)
        } else {
          this.users.push(this.editedItem)
        }
        this.close()
      },

      save () {
        this.loading = true;
        if (this.editedItem.photoURL) {
          const ref = this.$fire.storage.ref().child(this.editedItem.email + '/' + this.editedItem.photoURL.name)
          ref.put(this.editedItem.photoURL).then((snapshot) => {
            ref.getDownloadURL().then((url) => {
              this.saveToDB (url)
            }).catch((error) => {
              console.log(error)
              this.loading = false;
            });
          });
        } else {
          this.saveToDB(null);
        }
      },
      onFileChange() {
        const file = this.editedItem.photoURL
        this.editedItem.url = URL.createObjectURL(file)
      },
      async writeToRealtimeDb() {
          const messageRef = this.$fire.database.ref('message')
          try {
              await messageRef.set({
                message: this.message,
              })
          } catch (e) {
              console.log(e)
              return
          }   
          alert('Success.')
      },
    },
}
</script>

<style>
</style>
