<script>
import GenericTableComplete from "./GenericTableComplete.vue";
import pageReady from "@/lib/pageReady";
export default {
    name: "PageAdminControl",

    components: {
        GenericTableComplete
    },

    data() {
        return {
            forms: {
                "Books": {
                    "name": {
                        "label": "Name",
                        "field_type": "string"
                    },
                    "category_id": {
                        "label": "Category",
                        "field_type": "select",
                        "source": "get|category?noPage=true",
                        "options_text_field": "text"
                    },
                    "author_id": {
                        "label": "Author",
                        "field_type": "select",
                        "source": "get|author?noPage=true",
                        "options_text_field": "full_name"
                    },
                    "description": {
                        "label": "Description",
                        "field_type": "text"
                    },
                    "number_owned": {
                        "label": "Number owned",
                        "field_type": "number"
                    },
                    "img": {
                        "label": "Cover image",
                        "field_type": "image",
                        "old_source": "sourceData:img"
                    }
                },
                "Inactive books": {
                    "name": {
                        "label": "Name",
                        "field_type": "string"
                    },
                    "category_id": {
                        "label": "Category",
                        "field_type": "select",
                        "source": "get|category?noPage=true&currentAndPrevious=true&statusInName=true",
                        "options_text_field": "text"
                    },
                    "author_id": {
                        "label": "Author",
                        "field_type": "select",
                        "source": "get|author?noPage=true&currentAndPrevious=true&statusInName=true",
                        "options_text_field": "full_name_status"
                    },
                    "description": {
                        "label": "Description",
                        "field_type": "text"
                    },
                    "number_owned": {
                        "label": "Number owned",
                        "field_type": "number"
                    },
                    "img": {
                        "label": "Cover image",
                        "field_type": "image",
                        "old_source": "sourceData:img"
                    }
                },
                "Categories": {
                    "text": {
                        "label": "Category name",
                        "field_type": "string"
                    },
                },
                "Inactive categories": {
                    "text": {
                        "label": "Category name",
                        "field_type": "string"
                    },
                },
                "Authors": {
                    "name": {
                        "label": "First name",
                        "field_type": "string"
                    },
                    "last_name": {
                        "label": "Last name",
                        "field_type": "string"
                    }
                },
                "Inactive authors": {
                    "name": {
                        "label": "First name",
                        "field_type": "string"
                    },
                    "last_name": {
                        "label": "Last name",
                        "field_type": "string"
                    }
                },
                "Message Types": {
                    "name": {
                        "label": "Message type name",
                        "field_type": "string"
                    }
                },
                "Links": {
                    "text": {
                        "label": "Text",
                        "field_type": "string"
                    },
                    "to": {
                        "label": "Leads to",
                        "field_type": "string"
                    },
                    "weight": {
                        "label": "Weight",
                        "field_type": "number"
                    },
                    "link_position_id": {
                        "label": "Position",
                        "field_type": "select",
                        "source": "get|linkposition?noPage=true",
                        "options_text_field": "position"
                    },
                    "access_level_id": {
                        "label": "Show to",
                        "field_type": "select",
                        "source": "get|accesslevel?noPage=true",
                        "options_text_field": "name"
                    },
                    "icon": {
                        "label": "Icon",
                        "field_type": "string"
                    },
                },
                "Users": {
                    "name": {
                        "label": "First name",
                        "field_type": "string"
                    },
                    "last_name": {
                        "label": "Last name",
                        "field_type": "string"
                    },
                    "email": {
                        "label": "Email",
                        "field_type": "string"
                    },
                    "password": {
                        "label": "Password",
                        "field_type": "password"
                    },
                    "access_level_id": {
                        "label": "Access level",
                        "field_type": "select",
                        "source": "get|accesslevel?noPage=true",
                        "options_text_field": "name"
                    },
                    "address": {
                        "label": "Address",
                        "field_type": "string"
                    }
                }
            }
        }
    },

    computed: {
        adminTabs: function () {
            return this.$store.getters['admin/getTabs'];
        },
        currentTabName: function () {
            return this.$store.getters['admin/getCurrentTab'];
        }
    },

    mounted() {
        pageReady();
    },

    methods: {
        setTabState: function (newTabState) {
            this.$store.commit('admin/setTabs', newTabState);
        },
        setTabName: function (newTabName) {
            this.$store.commit('admin/setCurrentTab', newTabName);
        }
    }
}
</script>
<template>
    <div>
        <GenericTableComplete :_tabs="adminTabs" :_forms="forms" :_default_tab="currentTabName" @newTabState="setTabState"
            @newTab="setTabName" />
    </div>
</template>