<template>
    <div class="container">
        <h1>{{text}}</h1>
    </div>
</template>

<script>
import axios from 'axios'
export default{
    name: 'DeleteCard',
    data(){
        return {
            text: ''
        }
    },
    mounted(){
        axios
            .delete
    }
}
</script>