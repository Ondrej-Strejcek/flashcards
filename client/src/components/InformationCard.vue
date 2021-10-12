<template>
    <div class="information-card">
        <div class="information-header">
            <h3>{{header}}</h3>
        </div>
        <div class="information-text">
            {{text}}
        </div>
        <button class="card-btn btn"><router-link class="btn-title" :to="to">{{btnTitle}}</router-link></button>
    </div>
</template>

<script>
export default {
    name: "Information Card",
    props: {
        header: String,
        text: String,
        btnTitle: String,
        to: String,
    }
}
</script>

<style scoped>
.information-card{
    background-color: var(--third-color);
    width: 315px;
    height: 350px;
    border-radius: 2rem;
    padding: 10px 5px;
    position: relative;
}
.information-header{
    height: 30px;
    max-width: 90%;
    word-wrap: break-word;
    margin: 0.25em auto;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
}
.information-text{
    max-width: 80%;
    word-wrap: break-word;
    margin: 0 auto; 
    height: 250px;
}
.card-btn{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 325px;
    height: 60px;
    padding: 0 0.5rem;
    font-size: 18px;
    font-weight: bold;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
}
.btn-title{
    text-decoration: none;
    color: #fff;
}
</style>
