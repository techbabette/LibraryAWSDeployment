<script>
import getNestedField from '@/lib/getNestedField'
import getParam from '@/lib/getParam';
import paramRequest from '@/lib/paramRequest'
export default {
    name: "GenericTable",
    props: {
        items: {
            Type: Array
        },
        headers: {
            Type: Array
        },
        options: {
            Type: Array
        },
        table_options: {
            Type: Array
        },
        sort_options : {
            Type: Array,
            default : () => []
        },
        current_sort : {
            Type : String
        },
        first_item_positon : {
            Type : Number,
            default : 0
        },
        identification_field: {
            Type: String,
            default: "id"
        }
    },
    computed: {
        ShowTable: function () {
            return this.items && this.items.length > 0;
        }
    },
    methods: {
        applyChanges(item, header) {
            if (!header.change) {
                return getNestedField(item, header.field);
            }

            return header.change(item);
        },
        displayValue(item, header){
            return this.applyChanges(item, header);
        },
        fieldHasSort(field){
            return this.sort_options.includes(field);
        },
        emitFieldName(field){
            this.$emit("newSort", field);
        },
        headerSortSignifier(field){
            let isActive = this.current_sort.startsWith(field);
            if(!isActive){
                return "";
            }
            let currentlyDesc = this.current_sort.endsWith("_desc");
            if(currentlyDesc){
                    return "&darr;"
            }
            return "&uarr;"
        },
        getOptionsForItem(item) {
            let itemOptions = [];
            for(let option of this.options){
                if(!option.onlyIf){
                    itemOptions.push(option);
                    continue;
                }
                if(option.onlyIf(item)){
                    itemOptions.push(option);
                }
            }
            return itemOptions
        },
        async handleClick(onClick, item = undefined){
            let callerField = getParam(onClick, "callerField") ?? this.identification_field;
            let refresh = getParam(onClick, "refresh") ?? true;
            let caller = 0;

            if(getParam(onClick, "emit")){
                console.log(getParam(onClick, 'emit'));
                this.$emit(getParam(onClick, 'emit'), item ? getNestedField(item,callerField) : 0);
                return;
            }

            if(item){
                caller = getNestedField(item, callerField);
            }

            caller = getParam(onClick, "caller") ?? caller;

            let result = await paramRequest(onClick, caller);

            if(refresh){
                this.$emit('refresh');
            }

            if(result.success && result.message){
                this.$store.commit("messages/display", {text : result.message, success : true});
            }
        }
    }
}
</script>
<template>
    <div class="table-responsive">
        <table v-if="ShowTable" class="table table-responsive table-hover" id="element-table">
            <thead>
                <tr id="header-table-row">
                    <th>#</th>
                    <th v-for="header, index in headers" :key="index" :class="{clickable : fieldHasSort(header.field)}"
                    v-on="fieldHasSort(header.field) ? {click: () => emitFieldName(header.field)} : {}">
                    {{ header.text }} <span v-html="headerSortSignifier(header.field)"></span></th>
                    <th v-if="options">Options</th>
                </tr>
            </thead>
            <tbody id="table-result-holder">
                <tr v-for="item, index in items" :key="index">
                    <td>{{ index + first_item_positon + 1 }}</td>
                    <td v-for="header, hIndex in headers" :key="hIndex">{{ displayValue(item, header) }}</td>
                    <td v-if="options">
                        <button v-for="option, oIndex in getOptionsForItem(item)" :data-id="item[identification_field]" :key="oIndex"
                            :class="option.class" @click="handleClick(option.onClick, item)">{{ option.name }}</button>
                    </td>
                </tr>
            </tbody>
            <button v-for="table_option, index in table_options" @click="handleClick(table_option.onClick)" :class="table_option.class"
                :key="index">{{ table_option.name }}</button>
        </table>
        <p v-else>No items found</p>
    </div>
</template>

<style scoped>
.clickable {
    cursor: pointer
}
.clickable:hover{
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>