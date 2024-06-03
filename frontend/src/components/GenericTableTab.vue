<script>
export default {
    name: "GenericTableTab",
    props: {
        title: {
            Type: String,
            require: true
        },
        is_currenctly_active: {
            Type : Boolean,
            require : true
        }
    }
}
</script>

<template>
    <button class="btn admin-tab" :class="{ 'PrimaryButton': !is_currenctly_active, 'PrimaryButtonActive': is_currenctly_active }">
        {{ title }}
    </button>
</template>

<style scoped>
.admin-tab {
    border-radius: 15px 2px 2px 2px;
    margin-right: 2px;
}
.PrimaryButton{
    border: 1px solid black;
}
.PrimaryButtonActive{
    border: 2px solid black;
    border-bottom: 0px;
}
</style>