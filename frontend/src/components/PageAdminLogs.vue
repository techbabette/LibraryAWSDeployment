<script>
import GenericTableComplete from "./GenericTableComplete.vue"
import pageReady from "@/lib/pageReady";
export default {
    name: "PageAdminLogs",

    components: {
        GenericTableComplete
    },

    data() {
        return {
            tabs: {
                "Logs": {
                    "title": "Users",
                    "weight": 100,
                    "endpoint": "log",
                    "idField": "id",
                    "tableHeaders": [
                        {
                            "text": "Actor",
                            "field": "issuer",
                        },
                        {
                            "text": "Action",
                            "field": "action"
                        },
                        {
                            "text": "Performed on",
                            "field": "created_at"
                        }
                    ],
                    searchInputs: {
                        "since": {
                            label: "Performed after",
                            field_type: "datetime"
                        },
                        "before": {
                            label: "Performed before",
                            field_type: "datetime"
                        }
                    },
                    items: [],
                    searchParams: {
                    },
                    "selectedSort": "", "page": 1,
                    maximumPage: 1,
                },
            },
            currentTab: "Logs"
        }
    },

    mounted() {
        pageReady();
    },
}
</script>
<template>
    <GenericTableComplete :_tabs="tabs" :_default_tab="currentTab" />
</template>