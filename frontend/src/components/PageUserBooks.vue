<script>
import GenericTableComplete from "./GenericTableComplete.vue";
import pageReady from "@/lib/pageReady";
export default {
    name: "PageUserBooks",

    components: {
        GenericTableComplete,
    },

    data() {
        return {
            tabs: {
                "Currently loaned": {
                    "title": "Currently loaned",
                    "endpoint": "loan?current=true",
                    "idField": "id",
                    "tableHeaders": [
                        {
                            "text": "Book",
                            "field": "book.name",
                        },
                        {
                            "text": "Loaned on",
                            "field": "started_at"
                        },
                        {
                            "text": "Return by",
                            "field": "end"
                        },
                        {
                            "text": "Late",
                            "field": "end",
                            "change": function (item) {
                                return Math.floor(new Date(item.end).getTime() / 1000) <= Math.floor((new Date()).getTime() / 1000) ? "Yes" : "No";
                            }
                        },
                        {
                            "text": "Extended",
                            "field": "extended",
                            "change": function (item) {
                                return item.extended ? 'Yes' : 'No'
                            }
                        },
                    ],
                    "itemOptions": [
                        {
                            "name": "View",
                            "class": "btn btn-primary mx-1",
                            "onClick": "dispatch|navigation/openBookPage|callerField:book.id"
                        },
                        {
                            "name": "Return",
                            "class": "btn btn-dark mx-1",
                            "onClick": "patch|loan/return"
                        },
                        {
                            "name": "Extend",
                            "class": "btn btn-success mx-1",
                            "onClick": "patch|loan/extend",
                            "onlyIf": function (item) {
                                return !item.extended;
                            }
                        },
                    ],
                    items: [],
                    searchInputs: {
                        "since": {
                            label: "Loaned after",
                            field_type: "datetime"
                        },
                        "before": {
                            label: "Loaned before",
                            field_type: "datetime"
                        }
                    },
                    searchParams: {
                    },
                    "selectedSort": "", "page": 1,
                    maximumPage: 1,
                },
                "Late": {
                    "title": "Late",
                    "endpoint": "loan?late=true",
                    "idField": "id",
                    "tableHeaders": [
                        {
                            "text": "Book",
                            "field": "book.name",
                        },
                        {
                            "text": "Loaned on",
                            "field": "started_at"
                        },
                        {
                            "text": "Return by",
                            "field": "end"
                        },
                        {
                            "text": "Days late",
                            "field": "end",
                            "change": function (item) {
                                let currentDate = new Date().getTime();
                                let returnBy = new Date(item.end);
                                let daysLate = Math.ceil((currentDate - returnBy) / (1000 * 60 * 60 * 24));
                                return daysLate;
                            }
                        },
                        {
                            "text": "Extended",
                            "field": "extended",
                            "change": function (item) {
                                return item.extended ? 'Yes' : 'No'
                            }
                        }
                    ],
                    "itemOptions": [
                        {
                            "name": "View",
                            "class": "btn btn-primary mx-1",
                            "onClick": "dispatch|navigation/openBookPage|callerField:book.id"
                        },
                        {
                            "name": "Extend",
                            "class": "btn btn-success mx-1",
                            "onClick": "patch|loan/extend",
                            "onlyIf": function (item) {
                                return !item.extended;
                            }
                        },
                        {
                            "name": "Return",
                            "class": "btn btn-dark mx-1",
                            "onClick": "patch|loan/return"
                        },
                    ],
                    items: [],
                    searchInputs: {
                        "since": {
                            label: "Loaned after",
                            field_type: "datetime"
                        },
                        "before": {
                            label: "Loaned before",
                            field_type: "datetime"
                        }
                    },
                    searchParams: {
                    },
                    "selectedSort": "", "page": 1,
                    maximumPage: 1,
                },
                "Previously loaned": {
                    "title": "Previously loaned",
                    "endpoint": "loan?previous=true",
                    "idField": "id",
                    "tableHeaders": [
                        {
                            "text": "Book",
                            "field": "book.name",
                        },
                        {
                            "text": "Loaned on",
                            "field": "started_at"
                        },
                        {
                            "text": "Returned on",
                            "field": "returned_at"
                        },
                        {
                            "text": "Days kept",
                            "field": "!!computed",
                            "change": function (item) {
                                let startDate = new Date(item.started_at);
                                let returnDate = new Date(item.returned_at);
                                let daysKept = Math.floor((returnDate - startDate) / (1000 * 60 * 60 * 24));
                                return daysKept;
                            }
                        }
                    ],
                    "itemOptions": [
                        {
                            "name": "View",
                            "class": "btn btn-primary mx-1",
                            "onClick": "dispatch|navigation/openBookPage|callerField:book.id"
                        }
                    ],
                    items: [],
                    searchInputs: {
                        "since": {
                            label: "Loaned after",
                            field_type: "datetime"
                        },
                        "before": {
                            label: "Loaned before",
                            field_type: "datetime"
                        }
                    },
                    searchParams: {
                    },
                    "selectedSort": "", "page": 1,
                    maximumPage: 1,
                },
                "Favorites": {
                    "title": "Favorites",
                    "endpoint": "favorite",
                    "idField": "id",
                    "tableHeaders": [
                        {
                            "text": "Book",
                            "field": "book.name",
                        },
                        {
                            "text": "Added at",
                            "field": "created_at"
                        }
                    ],
                    "itemOptions": [
                        {
                            "name": "View",
                            "class": "btn btn-primary mx-1",
                            "onClick": "dispatch|navigation/openBookPage|callerField:book.id"
                        },
                        {
                            "name": "Remove",
                            "class": "btn btn-danger mx-1",
                            "onClick": "delete|favorite"
                        },
                    ],
                    items: [],
                    searchParams: {
                    },
                    "selectedSort": "", "page": 1,
                    maximumPage: 1,
                }
            },
            currentTab: "Currently loaned"
        }
    },

    computed: {
        username: function () {
            return this.$store.getters['user/claims'].name;
        },
    },

    mounted() {
        pageReady();
    },
}
</script>
<template>
    <div class="mk-solo-page mx-3">
        <div>
            Hello {{ username }}, these are your books
            <GenericTableComplete :_tabs="tabs" :_default_tab="currentTab" />
        </div>
    </div>
</template>