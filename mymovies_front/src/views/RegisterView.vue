<template>
  <h3>Register page</h3>
  <p>Mail</p>
  <input v-model="mailtext" placeholder="Mail">
  <p>Password</p>
  <input v-model="passwordtext" placeholder="Password">
  <button v-on:click="registeruser">Register</button>
</template>

<script>


export default {
  name: 'HomeView',
  components: {

  },
  data (){
    return {
      mailtext : '',
      passwordtext : ''
    }

  },
  methods : {
    async registeruser(){

      let data = {
        "email" : this.mailtext,
        "password" : this.passwordtext,
      }

      await fetch('http://localhost:8080/register', {
        method : 'POST',
        headers : {
          'content-type': 'application/json',
        },
        body : JSON.stringify(data)

      }).then(response => console.log(response)).then(this.$router.push('/login'));

    }
  }
}
</script>
