<template>

  <p>Name: {{name}}</p>
  <p>Release date: {{release}}</p>
  <p>Runtime: {{runtime}}</p>
  <img :src="image">

</template>

<script>
export default {
  name: "MovieComponent",
  props : {
    name : {required : true, type : String},
    release : {required : true, type : String},
    runtime : {required : true, type : Number},
    image : {required : false, type : URL}
  }
}
</script>

<style scoped>

img{
  width: 50px;
}

</style>