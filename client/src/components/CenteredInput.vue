<template>
    <div class="centered-input">
        <div>
            <div @click="this.$emit('hide-input')" class="cancel-btn">Close</div>
            <input type="text" :placeholder="placeholder_text" v-model="inputText">
            <button @click="submitForm" class="btn btn-large">Create</button>
        </div>
    </div>
</template>

<script>

export default{
    name: "CenteredInput",
    data(){
        return {
            inputText: '',
        }
    },
    props: {
        placeholder_text: String
    },
    methods: {
        submitForm(){
            this.$emit('submitted', this.inputText)
        },
    },
}
</script>


<style scoped>
.centered-input{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
}
.centered-input > div{
    display: flex;
    border-radius: 1rem;
    box-shadow: 1px 2px 8px 5px rgba(0,0,0,0.25);
    background-color: var(--third-color);
    animation-name: appear;
    animation-duration: 500ms;
    position: relative;
    padding: 5px;
    margin-bottom: 50vh;
}
input{
    margin: 0px !important;
    width: 70vw;
    border: none;
    border-radius: 1rem;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    height: 60px;
}
.centered-input .btn{
    margin: 0px !important;
    border-radius: 1rem;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
}

.cancel-btn{
    position: absolute;
    top: -22px;
    left: 2px;
    background-color: var(--primary-color);
    color: #fff;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    padding: 0.25em 1em;
    border-radius: 1em;
}
.centered-input > div > *{
    margin: 0.5em 0;
}
@keyframes appear {
  from {opacity: 0;}
  to {opacity: 100;}
}
</style>