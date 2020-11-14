<template>
    <div class="min-h-screen">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>User Management</v-list-item-title>
        <v-list-item-subtitle>Үйлчилгээний ажилтан</v-list-item-subtitle>
        <v-list-item-subtitle>Засварчин</v-list-item-subtitle>
        <v-list-item-subtitle>Админ</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Vehicle management</v-list-item-title>
        <v-list-item-subtitle>Цагыг оруулах</v-list-item-subtitle>
        <v-list-item-subtitle>Улсын дугаар оруулах машины</v-list-item-subtitle>
        <v-list-item-subtitle>Засварчиныг тохируулах</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Admin management</v-list-item-title>
        <v-list-item-subtitle>Пасспорт солих</v-list-item-subtitle>
        <v-list-item-subtitle>Хугацаагаар шүүж татаж авах </v-list-item-subtitle>
        <v-list-item-subtitle>Үйлчилгээний ажилтантай адилхан үйлдэл хийх боломжтой</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    </div>
</template>

<script>
export default {
    layout: 'dashboard',
    middleware: ['authenticated', 'authorized'],
    data () {
        return {
      }
    },
    methods: {
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
#box-container {
  width: 70%;
}
.boxes {
  float: left;
}
</style>
