<script>
import axios from "@/axios/axios";
import BookButtonFollowValue from './BookButtonFollowValue.vue'
import pageReady from "@/lib/pageReady";
export default {
  name: "PageBookSingle",

  components: {
    BookButtonFollowValue
  },

  data() {
    return {
      bookInformation: {

      },
      loanRequestInFlight: false,
      favoriteRequestInFlight: false
    };
  },

  computed: {
    bookReady: function () {
      return Object.keys(this.bookInformation).length > 0;
    },
    loanedToUser() {
      return this.bookInformation.loan_to_user_id ? true : false;
    },
    favorite() {
      return this.bookInformation.favorite_to_user_id ? true : false
    },
    numberAvailable() {
      return Math.max(this.bookInformation.number_owned - this.bookInformation.loans_count, 0);
    },
    showLoanButton: function () {
      return !this.inactive || this.loanedToUser
    },
    loanButtonText: function () {
      return this.loanedToUser ? "Return book" : "Borrow book";
    },
    inactive: function () {
      return this.bookInformation.deleted_at ? true : false;
    },
    inactiveText: function () {
      return this.inactive ? "<INACTIVE>" : "";
    }
  },

  async mounted() {
    await this.updateBookInfo();
    pageReady();
  },

  methods: {
    imgSource: function (img) {
      let res = '/' + process.env.VUE_APP_IMAGE_SOURCE + img;
      return res;
    },
    loanOut: async function () {
      if (this.bookInformation.currently_available < 1) {
        this.$store.commit("messages/display", { text: "Zero copies available", success: false })
        return;
      }
      let result = await (axios.post('/loan', { book_id: this.bookInformation.id }));

      if (result.success) {
        this.$store.commit("messages/display", { text: result.message, success: true })
        this.updateBookInfo();
      }
    },
    returnBook: async function () {
      let result = await (axios.patch(`/loan/return/${this.bookInformation.loan_to_user_id}`));
      if (result.success) {
        this.$store.commit("messages/display", { text: result.message, success: true })
        this.updateBookInfo();
      }
    },
    handleLoanButtonClick: async function () {
      if (this.loanRequestInFlight) {
        return;
      }
      this.loanRequestInFlight = true;
      if (this.loanedToUser) {
        await this.returnBook();
      } else {
        await this.loanOut();
      }
      this.loanRequestInFlight = false;
    },
    addtoFavorites: async function () {
      let result = await (axios.post('/favorite', { book_id: this.bookInformation.id }));

      if (result.success) {
        this.$store.commit("messages/display", { text: result.message, success: true })
        this.bookInformation.favorite_to_user_id = result.body.favorite_id;
      }
    },
    removeFromFavorites: async function () {
      let result = await (axios.delete(`/favorite/${this.bookInformation.favorite_to_user_id}`));
      if (result.success) {
        this.$store.commit("messages/display", { text: result.message, success: true })
        this.bookInformation.favorite_to_user_id = false;
      }
    },
    handleFavoriteButtonClick: async function () {
      if (this.favoriteRequestInFlight) {
        return;
      }
      this.favoriteRequestInFlight = true;
      if (this.favorite) {
        await this.removeFromFavorites();
      } else {
        await this.addtoFavorites();
      }
      this.favoriteRequestInFlight = false;
    },
    updateBookInfo: async function () {
      let result = await this.$store.dispatch("fetch", { url: `/book/${this.$route.params.id}` });
      if (!result.success) {
        return;
      }
      this.bookInformation = result.body;
      document.title = this.bookInformation.name;
    }
  }
}
</script>
<template>
  <div class="mk-solo-page page container-fluid flex-column">
    <div v-if="bookReady" class="row" id="bookPage">
      <div class="col-12 col-lg-3">
        <div class="position-relative">
          <img :src="imgSource(bookInformation.img)" id="bookImage" class="card-img-top img-fluid image-zoom data-zoom"
            alt="Korica knjige">
          <a href="#" @click.prevent="handleFavoriteButtonClick" class="mk-favorite-icon-holder">
            <IconifyIcon class="iconify mk-favorite-icon"
              :icon="favorite ? 'mdi:cards-heart' : 'mdi:cards-heart-outline'"></IconifyIcon>
          </a>
        </div>
      </div>
      <div class="col-12 col-lg-9" id="bookInfo">
        <div class="w-100 mk-yellow">
          <h2 id="book-title">{{ bookInformation.name }} <span class="text-danger">{{ inactiveText }}</span></h2>
        </div>
        <p id="book-description"> {{ bookInformation.description }}</p>
        <div>
          <div class="dynamic-field" id="author-field">
            <p>Author:
              <BookButtonFollowValue :text='bookInformation.author.name + " " + bookInformation.author.last_name'
                :value="bookInformation.author" name="authors" />
            </p>
          </div>
          <div class="dynamic-field" id="category-field">
            <p>Category:
              <BookButtonFollowValue :text="bookInformation.category.text" :value="bookInformation.category"
                name="categories" />
            </p>
          </div>
          <div class="dynamic-field">
            <p id="loaned-field">Loaned {{ bookInformation.all_loans_count }} times</p>
          </div>
          <div class="dynamic-field" v-if="!inactive">
            <p id="availability-field">Number of available copies: {{ numberAvailable }}</p>
          </div>
          <a class="btn bigButton btn-light w-50" @click.prevent="handleLoanButtonClick" v-if="showLoanButton">{{
            loanButtonText }}</a>
        </div>
      </div>
    </div>
    <div v-else>
      No book found
    </div>
  </div>
</template>