<template>
  <h1>Movies View</h1>
  <p>{{text}}</p>
  <div v-for="movie in movies" :key="movie.id">
    <MovieComponent :name="movie.title" :release="movie.release_date" :runtime="movie.runtime"></MovieComponent>
  </div>
</template>


 <script>
 import MovieComponent from "@/components/MovieComponent";
 export default {
   name: 'MoviesView',
   components: {
     MovieComponent

   },
   data (){
     return {
       text : '',
       movies : [] ,
     }

   },
   async beforeMount() {
     if (localStorage.getItem("usertoken") === ''){
       // The user don't have access to the movies bc he is not connected
       this.text = "You need to be logged to see the movies"
     }else{
       // Show the movies
       let res = await fetch('http://localhost:8080/', {
         method : 'GET',
         headers : {
           'content-type': 'application/json',
         },
       })


       res = await res.json();
       this.movies = res
       console.log(this.movies[0].runtime)
     }
   }

 }
 </script>


<style scoped>

</style>