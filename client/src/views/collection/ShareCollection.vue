<template>
    <div class="container">
        <h1>Share Collection | {{$route.params.slug}}</h1>
        <input class="centered" type="text" placeholder="Username" v-model="userInput">
    </div>
</template>

<script>
export default{
    name: 'ShareCollection',
    data(){
        return{
            userInput: '',
            
        }
    }
}
</script>