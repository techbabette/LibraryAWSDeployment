<script>
import GenericTable from "./GenericTable"
import TableTab from "./GenericTableTab"
import PageButtons from "./ButtonsPagination.vue"
import InputForm from "./InputForm.vue"
import axiosInstance from "@/axios/axios"
export default {
    name: "GenericTableComplete",
    components: {
        GenericTable,
        TableTab,
        PageButtons,
        InputForm
    },

    props: {
        _tabs: Object,
        _forms: Object,
        _default_tab: String,
    },

    data() {
        return {
            tabs: {},
            forms: {},
            currentTabName: this._default_tab,
            currentItemPage: 1,
            formData: {},
            formErrors: {},
            showForm: false,
            openFormIndex: -1,
            renderForm: true,
            refreshForm: false,
        }
    },

    computed: {
        currentTab: function () {
            return this.tabs[this.currentTabName];
        },
        currentForm: function () {
            return this.forms[this.currentTabName];
        },
        baseEndpoint: function () {
            return this.currentTab.endpoint.split("?")[0];
        },
        saerchInformation: function () {
            return {
                tab: this.currentTabName,
                page: (this.currentTab ?? { page: 1 }).page ?? 1,
                searchParams: (this.currentTab ?? { searchParams: "empty" }).searchParams ?? {},
                selectedSort: (this.currentTab ?? { selectedSort: "" }).selectedSort ?? ""
            }
        },
        formSubmitText: function () {
            return `${this.openFormIndex > 0 ? "Edit" : "Create"} ${this.currentTab?.title.toLowerCase()}`
        }
    },

    watch: {
        saerchInformation: {
            handler: function (oldData, newData) {
                if (oldData.page === newData.page && (oldData.tab === newData.tab)) {
                    this.currentTab.page = 1;
                    this.currentItemPage = 1;
                }
                if (!(oldData.tab === newData.tab)) {
                    this.currentItemPage = this.currentTab.page;
                }
                this.refresh();
            },
            deep: true
        },
        tabs: {
            handler: function () {
                this.$emit("newTabState", this.tabs);
            },
            deep: true
        },
        currentTabName: {
            handler: function () {
                this.$emit("newTab", this.currentTabName);
            }
        },
        _default_tab: {
            handler: function () {
                this.currentTabName = this._default_tab;
            }
        },
        _tabs: {
            handler: function () {
                this.tabs = this._tabs;
            },
            deep: true
        }
    },

    beforeMount() {
        this.tabs = this._tabs;
        this.forms = this._forms ?? {};
        this.currentTabName = this._default_tab;
    },

    methods: {
        changeTab: function (newTab) {
            this.currentTabName = newTab;
        },
        fetchItems: async function () {
            // this.tabs[this.currentTabName].items = [];

            let params = { ...this.currentTab.searchParams };

            if (this.currentTab.selectedSort) {
                params.sortSelected = this.currentTab.selectedSort;
            }

            params.page = this.currentTab.page;

            let items = await this.$store.dispatch("fetch", { url: this.currentTab.endpoint, params });

            if (!items.success) {
                return;
            }

            this.tabs[this.currentTabName].items = items.body.data;
            this.tabs[this.currentTabName].maximumPage = items.body.last_page;

            this.currentItemPage = items.body.current_page;
            if (items.data.sortOptions) {
                let newSortOptions = items.data.sortOptions.map((option) => option.id);
                if (items.data.sortDefault && !this.currentTab.selectedSort) {
                    this.currentTab.selectedSort = items.data.sortDefault;
                }
                this.tabs[this.currentTabName].sortOptions = newSortOptions;
            }
        },
        newSort: function (field) {
            let currentlyActive = (this.currentTab.selectedSort ?? "").startsWith(field);
            if (!currentlyActive) {
                this.currentTab['selectedSort'] = `${field}_desc`;
                return;
            }
            //If currently active
            let currentlyDesc = (this.currentTab.selectedSort ?? "").endsWith("_desc");
            if (currentlyDesc) {
                this.currentTab['selectedSort'] = `${field}_asc`;
                return;
            }

            this.currentTab['selectedSort'] = `${field}_desc`;
            return;
        },
        closeForm: function () {
            this.showForm = false;
            this.reRenderForm();
        },
        openForm: async function (callerId = 0) {
            //If called with id, get current information and store to formData before opening
            this.openFormIndex = callerId;
            this.formData = {};
            this.formErrors = {};

            if (callerId) {
                let currentInformation = await axiosInstance.get(`${this.baseEndpoint}/edit/${callerId}`);
                if (!currentInformation.success) {
                    return;
                }
                this.formData = currentInformation.body;
            }

            //After form is ready, set showForm to true
            this.showForm = true;
        },
        submitForm: async function () {
            let url = this.baseEndpoint;
            let verb = "post";

            if (this.openFormIndex) {
                url += `/update/${this.openFormIndex}`;
                verb = "patch";
            }

            let keysToSend = Object.keys(this.currentForm);
            let limitedDataObject = {};

            for (let key of keysToSend) {
                let formElement = this.currentForm[key];
                if (formElement.field_type === "image" && !(this.formData[key] instanceof File)) {
                    continue;
                }
                if (formElement.field_type === 'password' && !this.formData[key]) {
                    continue;
                }
                limitedDataObject[key] = this.formData[key];
            }

            let result = await axiosInstance({ method: verb, url, data: limitedDataObject });

            if (result.success) {
                this.$store.commit("messages/display", { text: result.message, success: result.success });
                this.fetchItems();
                this.closeForm();
            }
            if (result.errors) {
                this.refreshForm = true;
                this.formErrors = result.errors;
            }
        },
        reRenderForm: function () {
            this.renderForm = false;

            this.$nextTick(() => {
                this.renderForm = true;
            });
        },
        refresh: async function () {
            await this.fetchItems();
        }
    }
}
</script>
<template>
    <div>
        <div class="overflow-x-scroll d-flex">
            <TableTab v-for="tab, index in Object.keys(tabs)" :key="index" :title="tab"
                :is_currenctly_active="currentTabName === tab" @click.native="changeTab(tab)" />
        </div>
        <div class="adminBorder rounded-left rounded-bottom rounded-right">
            <div v-if="Object.keys(currentTab.searchInputs ?? {}).length > 0">
                <InputForm :elements="currentTab.searchInputs" v-model="currentTab.searchParams"
                    class="col-12 d-flex justify-content-start" />
            </div>
            <div v-else>
                Search options will appear here if available
            </div>

            <GenericTable :items="currentTab.items" :headers="currentTab.tableHeaders" :options="currentTab.itemOptions"
                :table_options="currentTab.table_options" @refresh="fetchItems" :sort_options="currentTab.sortOptions ?? []"
                :current_sort="currentTab.selectedSort ?? ''" @newSort="newSort"
                :first_item_positon="(currentItemPage - 1) * (currentTab.perPage ?? 5)" @showForm="openForm" />
        </div>

        <div id="modal-background" class="mk-modal" v-if="currentForm && renderForm" :class="{ hidden: !showForm }">
            <form class="mk-modal-content" @submit.prevent="submitForm">
                <InputForm :elements="currentForm" :errors="formErrors" v-model="formData" :refresh_signal="refreshForm"
                    @refresh="refreshForm = false" />
                <button type="submit" class="col-12 btn btn-success text-light my-2" @click.prevent="submitForm">
                    {{ formSubmitText }}
                </button>
                <button class="col-12 btn btn-danger text-light my-2" type="button" @click.prevent="closeForm">
                    Close form
                </button>
            </form>
        </div>

        <PageButtons v-model="currentTab['page']" :maximum_page="currentTab.maximumPage" buttonClass="bg-white text-dark" />
    </div>
</template>

<style>
.adminBorder {
    border: 2px solid black;
    border-top: 0px;
}

.text-dark {
    color: grey !important;
}

.text-dark.active {
    border: 1.5px solid black !important;
    color: black !important;
}

.text-dark:hover {
    color: black !important;
}
</style>

<style scoped>
.overflow-x-scroll {
    overflow-x: scroll;
    scrollbar-width: thin;
}

.mk-modal-content {
    color: white;
}
</style>