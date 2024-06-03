<script>
import BookButtonFollowValue from './BookButtonFollowValue.vue'
import LimitToFullWords from '@/lib/limitToFullWords';
export default {
    name: "BookShelfItem",
    components: { BookButtonFollowValue },
    props: {
        book: Object
    },
    methods: {
        LimitToFullWords: function (text, maximumCharacterLength) {
            return LimitToFullWords(text, maximumCharacterLength);
        },
        imgSource: function (img) {
            try {
                let res = '/' + process.env.VUE_APP_IMAGE_SOURCE + img;
                return res;
            }
            catch {
                return "";
            }
        },
    },
}
</script>
<template>
    <div class="flex col-12 col-md-6 col-lg-3 justify-content-center">
        <div class="card book mk-card-limit">
            <router-link :to="{ name: 'Book preview', params: { id: book.id } }"> <img :src="imgSource(book.img)"
                    :alt="book.name" class="card-img-top book-prev img-fluid"></router-link>
            <div class="card-body book-body">
                <router-link :to="{ name: 'Book preview', params: { id: book.id } }">
                    <h5 class="card-title book-title">{{ book.name }}</h5>
                </router-link>
                <p class="card-text book-desc"><em> {{ LimitToFullWords(book.description, 30) }}</em></p>
                <p class="card-text mk-light-yellow">
                    <BookButtonFollowValue :text="book.category.text" :value="book.category" name="categories" />
                </p>
                <p class="card-text">
                    <BookButtonFollowValue :text='book.author.name + " " + book.author.last_name' :value="book.author"
                        name="authors" />
                </p>
            </div>
        </div>
    </div>
</template>