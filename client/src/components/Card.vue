<template>
    <div class="f-card">
        <div v-show="!testMode" @click="this.$emit('deleteCard', this.id)" class="cancel-btn">Delete</div>
        <h1>{{this.header}}</h1>
        <div class="f-card-body">
            <div v-if="this.show">{{this.body}}</div>
        </div>
        <button @click="showAnswer" class="card-btn">{{btnTitle}}</button>
    </div>
</template>


<script>
export default{
    name: 'Card',
    props: {
        header: String,
        body: String,
        btnTitle: String,
        id: String,
        testMode: {
            type: Boolean,
            default: false
        },
    },
    data(){
        return{
            show: false,
        }
    },
    methods: {
        showAnswer(){
            this.show = !this.show
        }
    }
}
</script>

<style scoped>
.f-card-body > div{
    animation-name: showAnswerAnimation;
    animation-duration: 500ms;
}
.cancel-btn{
    position: absolute;
    top: -8px;
    left: 5px;
    background-color: var(--primary-color);
    color: #fff;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    padding: 0.25em 1em;
    border-radius: 1em;
}

@keyframes showAnswerAnimation {
    from{
        opacity: 0;
    }
    to{
        opacity: 100;
    }
}

</style>