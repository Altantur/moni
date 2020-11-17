<template>
  <div class="min-h-screen">
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
      :loading="loading"
      loading-text="Уншиж байна... Түр хүлээнэ үү"
    >
      <template #top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Хэрэглэгчид</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
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
                Шинэ ажилтан нэмэх
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text class="ofHidden">
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.displayName"
                        label="Нэр"
                        :rules="namerules"
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
                        :rules="emailrules"
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
                        :rules="phoneNumrules"
                        type="number"
                        class="noButtons"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-select
                        v-model="editedItem.role"
                        :items="roles"
                        label="Хэрэглэгчийн төрөл"
                        :rules="rolerules"
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
                        :rules="passwordrules"
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
          <v-dialog
            v-model="dialogDelete"
            max-width="500px"
          >
            <v-card>
              <v-card-title class="headline">
                Үнэхээр устгахыг хүсэж байга уу? Дахин сэргээх боломжгүй.
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="closeDelete"
                >
                  Болих
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteItemConfirm"
                >
                  OK
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #[`item.url`]="{ item }">
        <v-img
          class="mx-2 bRadius"
          :src="item.url ? item.url : '/default_user.png'"
          max-height="40"
          max-width="40"
          contain
        />
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
    layout: 'dashboard',
    middleware: ['authenticated', 'authorized'],
    data: () => ({
      namerules: [
            value => !!value || 'Хоосон байх боломжгүй.',
            value => (value && value.length >= 3) || 'Доод тал 3 тэмдэгт орсон.'
      ],
      emailrules: [
            value => !!value || 'Хоосон байх боломжгүй.',
            value => (value && value.length >= 6) || 'Доод тал 6 тэмдэгт орсон.',
            value => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Е-мэйл хаяг оруулна уу.'
         ],
      phoneNumrules: [
            value => !!value || 'Хоосон байх боломжгүй.',
            value => (value && value.length == 8) || '8 тэмдэгт шаардлагатай.'
      ],
      rolerules: [
            value => !!value || 'Хоосон байх боломжгүй.'
      ],
      passwordrules: [
            value => (value && value.length >= 8) || 'Доод тал нь 8 тэмдэгт орсон.'
      ],
      dialog: false,
      loading: true,
      dialogDelete: false,
      headers: [
        { text: 'Зураг', 
          align: 'start',
          sortable: false,
          value: 'url' 
          },
        {
          text: 'Нэр',
          sortable: false,
          value: 'displayName',
        },
        {
          text: 'Е-мэйл',
          sortable: false,
          value: 'email',
        },
        {
          text: 'Утас',
          sortable: false,
          value: 'phoneNumber',
        },
        {
          text: 'Хэрэглэгчийн төрөл',
          sortable: true,
          value: 'role',
        },
        { text: 'Үйлдлүүд', value: 'actions', sortable: false },
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        displayName: '',
        email: '',
        role: '',
        photoURL: null,
        phoneNumber: '',
        password: '',
        url: '',
        uid: '',
      },
      defaultItem: {
        displayName: '',
        email: '',
        role: '',
        photoURL: null,
        phoneNumber: '',
        password: '',
        url: '',
        uid: '',
      },
      roles: [
        'Админ',
        'Үйлчилгээний зөвлөх',
        'Засварчин',
      ],
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

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.loading = true
        const ref = this.$fire.database.ref('users')
        ref.on('value', (data) => {
          if (data.val())
          this.users = Object.values(data.val())
          this.loading = false
        });
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
      passwordchecker () {
        if(this.editedItem.password === undefined) {
          return true;
        }
        if(this.editedItem.password.length >= 8) {
          return true
        }
        return false
      },
      save () {
        if(this.editedItem.displayName.length >= 3 && this.editedItem.role.length >= 1 && this.editedItem.phoneNumber.length == 8 && this.passwordchecker() && this.editedItem.email.length >= 6) {
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
        }
      },
      onFileChange() {
        const file = this.editedItem.photoURL
        this.editedItem.url = URL.createObjectURL(file)
      }
    },
}
</script>

<style>

.noButtons input::-webkit-outer-spin-button, 
.noButtons input::-webkit-inner-spin-button{
  -webkit-appearance: none;
}
.ofHidden {
  overflow: hidden;
}
.bRadius {
  border-radius: 50%;
}
</style>
