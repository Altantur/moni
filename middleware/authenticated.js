export default function ({ app, redirect }) {
  // If the user is not authenticated
  if (app.$fire.auth) {
      //return redirect('/login')
      console.log(app.store);
  }
}
