<script>
export default {
    name : "ButtonBackToTop",
    
    data(){
        return {
            showSelf : false
        }
    },

    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    },

    methods : {
      handleScroll() {
        if(window.scrollY > 0){
            this.showSelf = true;
            return;
        }
        this.showSelf = false;
      }  
    },
}
</script>
<template>
    <a href="#" :class="{invisible : showSelf === false}" id="goBackUp">&uArr;</a>
</template>