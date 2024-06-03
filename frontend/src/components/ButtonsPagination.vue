<script>
export default {
    name: "ButtonsPagination",

    props: {
        value: {
            Type: Number,
        },
        buttonClass: {
            Type: String,
            default : "",
        },
        maximum_page: Number
    },

    data() {
        return {
            currentPage: 1
        }
    },

    computed: {
        ShowPageButtons: function () {
            return this.maximum_page > 1;
        },
        pageButtons: function () {
            let pageButtonsToShow = [];
            if (this.currentPage === 1) {
                let seoondPage = this.currentPage + 1;
                pageButtonsToShow = [this.currentPage, seoondPage];

                let thirdPageExists = this.nextPageExists(seoondPage);
                if (thirdPageExists) {
                    pageButtonsToShow.push(seoondPage + 1);
                }

                if(!pageButtonsToShow.includes(this.maximum_page)){
                    pageButtonsToShow.push(this.maximum_page);
                }

                return pageButtonsToShow;
            }

            let previousPage = this.currentPage - 1;

            pageButtonsToShow = [previousPage, this.currentPage];

            if(previousPage - 1 > 0 && this.currentPage === this.maximum_page){
                pageButtonsToShow.unshift(previousPage - 1);
            }

            if (this.nextPageExists(this.currentPage)) {
                pageButtonsToShow.push(this.currentPage + 1);
            }

            if(!pageButtonsToShow.includes(1)){
                pageButtonsToShow.unshift(1);
            }

            if(!pageButtonsToShow.includes(this.maximum_page)){
                pageButtonsToShow.push(this.maximum_page);
            }

            return pageButtonsToShow;
        },
    },

    watch: {
        currentPage: function () {
            this.$emit("input", this.currentPage)
        },
        maximum_page: function (newMaxPage){
            if(newMaxPage < this.currentPage){
                console.log("in here!");
                this.currentPage = newMaxPage;
            }
        },
        value: function () {
            this.currentPage = this.value;
        }
    },

    mounted() {
        this.currentPage = this.value;
    },

    methods: {
        changePage: function (newPage) {
            this.currentPage = newPage;
        },
        nextPageExists: function (fromPage) {
            return fromPage + 1 <= this.maximum_page;
        },
        classObject : function(button){
            let obj = {};
            obj.active = button === this.currentPage;
            obj[this.buttonClass] = true;
            return obj;
        }
    }
}
</script>
<template>
    <p v-if="ShowPageButtons" id="pageButtonsHolder">
        <button @click="changePage(button)" :key="key" v-for="button, key in pageButtons" class="shadow rounded border"
            :class="classObject(button)">
            {{ button }}
        </button>
    </p>
</template>