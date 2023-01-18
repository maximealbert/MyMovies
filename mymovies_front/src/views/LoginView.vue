<template>
  <h3>Login page</h3>
  <p>Mail</p>
  <input v-model="mailtext" placeholder="Mail">
  <p>Password</p>
  <input v-model="passwordtext" placeholder="Password">
  <button v-on:click="loginuser">Login</button>
  <button v-on:click="disconnectuser">Disconnect</button>

  <p>Your token: {{youruuid}}</p>
</template>


<script>

export default {
  name: 'LoginView',
  components: {

  },
  data (){
    return {
      mailtext : '',
      passwordtext : '',
      youruuid : ''
    }

  },
  methods : {
    async loginuser(){

      let data = {
        "email" : this.mailtext,
        "password" : this.passwordtext,
      }

      await fetch('http://localhost:8080/login', {
        method : 'POST',
        headers : {
          'content-type': 'application/json',
        },
        body : JSON.stringify(data)

      }).then(response=>response.json())
          .then(data=>{ console.log(data.token); localStorage.setItem("usertoken", data.token); this.youruuid = data.token; this.$router.push('/movies') })
      // Store the generated token in the localstorage under the key 'usertoken'
    },
    disconnectuser(){
      localStorage.setItem("usertoken", '')
      window.alert("User successfully disconnect")
    }
  }
}
</script>