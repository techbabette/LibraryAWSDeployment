<script>
import SingleBook from "./BookShelfItem.vue";
export default {
    name : "BookShelf",
    components : {
        SingleBook
    },
    props : {
        source : String,
        mount_action : String,
        query_params : Object 
    },
    computed : {
        Books : function(){
            return this.$store.getters['books/get'](this.source);
        },
        booksExist : function(){
            if(this.Books && this.Books.length >= 1){
                return true;
            }
            return false;
        }
    },
    mounted(){
        if(this.mount_action){
            this.$store.dispatch(this.mount_action, {name : this.source, params : this.query_params});
        }
    }
}
</script>
<template>
    <div class="container-fluid col-12">
        <div class="row" v-if="booksExist">
            <SingleBook v-for="book, key in Books" :key="key" :book="book"/>
        </div>
        <div class="d-flex justify-content-center" v-else>
            <p>No books found</p>
        </div>
    </div>
</template>