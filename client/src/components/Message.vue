<template>
<div>
    <p class="msg-box" :class="msg.successful ? 'success' : 'err'">
        {{msg.text}}
    </p>
</div>
</template>

<script>
export default {
    name: "Message",
    props: {
        msg: Object
    },
}
</script>

<style scoped>
div{
    width: 100%;
    display: flex;
    justify-content: center;
}
.msg-box{
    min-width: 350px;
    font-size: 18px;
    border-radius: 1.5rem;
    text-align: center;
    padding: 11px 2em;
}
.success{
    background-color: var(--second-color);
}
.err{
    background-color: var(--red-color);
}
</style>