<script>
import BookShelf from "./BookShelf";
import InputDropdownSelectMultiple from "./InputDropdownSelectMultiple";
import DropdownSelect from "./InputDropdownSelect.vue";
import ButtonsPagination from "./ButtonsPagination.vue";
import InputAdaptable from "./InputAdaptable.vue";
import pageReady from "@/lib/pageReady";
export default {
  name: "PageBooksSearch",

  components: {
    BookShelf,
    InputDropdownSelectMultiple,
    ButtonsPagination,
    DropdownSelect,
    InputAdaptable
  },

  data() {
    return {
      params: {
        perPage: 4,
      },
      paramOptions: {
        sort: [],
        categories: [],
        authors: []
      }
    }
  },

  computed: {
    selectedCategories: {
      get() {
        return this.$store.getters['books/getSearchParam']('categories');
      },
      set(value) {
        this.$store.commit("books/setSearchParam", { value, name: 'categories' });
      }
    },
    searchTitle: {
      get() {
        return this.$store.getters['books/getSearchParam']('title');
      },
      set(value) {
        this.$store.commit("books/setSearchParam", { value, name: 'title' });
      }
    },
    selectedAuthors: {
      get() {
        return this.$store.getters['books/getSearchParam']('authors');
      },
      set(value) {
        this.$store.commit("books/setSearchParam", { value, name: 'authors' });
      }
    },
    selectedSort: {
      get() {
        return this.$store.getters['books/getSearchParam']('sort');
      },
      set(value) {
        this.$store.commit("books/setSearchParam", { value, name: 'sort' });
      }
    },
    page: {
      get() {
        return this.$store.getters['books/getSearchParam']('page');
      },
      set(value) {
        this.$store.commit("books/setSearchParam", { value, name: 'page' });
      }
    },
    maximumPage: function () {
      return this.$store.getters['books/getSearchParam']("maximumPage");
    },
    Params: function () {
      let paramObject = {
        perPage: this.params.perPage, categories: this.selectedCategories, authors: this.selectedAuthors,
        page: this.page ?? 0, sortSelected: this.selectedSort, title: this.searchTitle
      };
      return paramObject;
    }
  },

  watch: {
    Params: {
      handler: async function (newValue, oldValue) {
        if (newValue.page == oldValue.page) {
          this.page = 1;
        }
        await this.getItems(newValue);
      },
      deep: true
    }
  },

  async created() {
    let bookResult = await this.getItems(this.Params);

    let [categoryResult, authorResult, sortResult] = await Promise.all([
      this.$store.dispatch("fetch", { url: 'category', params: { bookCountInName: true, havingBooks: true, noPage: true } }),
      this.$store.dispatch("fetch", { url: 'author', params: { bookCountInName: true, havingBooks: true, noPage: true } }),
      this.$store.dispatch("fetch", { url: 'book', params: { sortOptions: true } }),
    ])
    let sortOptions = [];
    sortResult.data.body.forEach((el) => {
      if (el.text.startsWith("!!")) {
        return;
      }
      sortOptions.push({ id: `${el.id}_desc`, text: `${el.text} (Desc)` }),
        sortOptions.push({ id: `${el.id}_asc`, text: `${el.text} (Asc)` })
    }
    )

    this.paramOptions.categories = categoryResult.data.body;
    this.paramOptions.authors = authorResult.data.body;
    this.paramOptions.sort = sortOptions;

    this.items = bookResult;

    pageReady();
  },

  methods: {
    async getItems(params) {
      let result = await this.$store.dispatch("books/fetch", { params, name: "SearchBooks" });

      let maximumPage = result.data.body.last_page;
      this.$store.commit("books/setSearchParam", { value: maximumPage, name: 'maximumPage' });
    },
    removeFilters() {
      this.$store.commit("books/clearSearchParams");
    }
  }
}
</script>
<template>
  <div class="mk-solo-page page container-fluid">
    <div class="row spec-row d-flex flex-row">
      <div id="filters">
        <InputAdaptable class="d-flex flex-column text-center" v-model="searchTitle" label="Search by title" />
        <DropdownSelect options_text_field="text" label="Sort options" :options="paramOptions.sort"
          v-model="selectedSort" />
        <InputDropdownSelectMultiple hint="Category" :hint_only="true" :options="paramOptions.categories"
          text_field="text" v-model="selectedCategories" />
        <InputDropdownSelectMultiple hint="Author" :hint_only="true" :options="paramOptions.authors"
          text_field="full_name_book_count" v-model="selectedAuthors" />
        <a class="btn btn-dark w-100" id="resetFilterButton" @click.prevent="removeFilters" href="#">Remove filters</a>
      </div>
      <div class="mk-holder" id="filter-holder">
        <div class="container-fluid">
          <div class="row">
            <h2 id="mk-book-category">Books</h2>
            <hr>
          </div>
          <div id="event-div" class="row mk-clear w-100">
            <BookShelf source="SearchBooks" />
          </div>
        </div>
        <ButtonsPagination v-model="page" :maximum_page="maximumPage" />
      </div>
    </div>
  </div>
</template>