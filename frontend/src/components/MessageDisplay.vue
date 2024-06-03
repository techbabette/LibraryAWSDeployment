<script>
export default {
    name: "MessageDisplay",
    computed: {
        messages() {
            return this.$store.getters['messages/get'];
        }
    }
}
</script>
<style scoped>
#message-holder {
    position: fixed;
    bottom: 40px;
    right: 20px;
    padding: 20px;
    z-index: 5;
    pointer-events: none;
    text-align: center;
}

.disappearing {
    animation-fill-mode: forwards;
    animation: disappear 5s forwards;
}

@keyframes disappear {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>
<template>
    <div id="message-holder" class="d-flex flex-column">
        <span v-for="message, index in messages" :key="index" class="alert disappearing"
            :class="{ 'alert-danger': !message.success, 'alert-success': message.success }">{{ message.text }}</span>
    </div>
</template>