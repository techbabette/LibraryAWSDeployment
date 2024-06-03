<script>
import InputDropdownSelectMultiple from './InputDropdownSelectMultiple.vue';
import InputImage from './InputImage.vue';
export default {
    name: 'InputAdaptable',

    components : {InputDropdownSelectMultiple, InputImage},

    data() {
        return {
            localValue: undefined,
            id: Math.floor(Math.random() * 1000) + this.name
        }
    },

    props: {
        value: {
            type: [String, Number, Array, File]
        },
        field_type: {
            type: String,
            default: "string"
        },
        label: {
            type: String,
            required: false
        },
        name: {
            type: String,
            default: "field"
        },
        hint: {
            Type: String
        },
        error_message: {
            Type: String
        },
        options: {
            type: Array,
            required: false
        },
        options_value_field: {
            type: String,
            default: "id"
        },
        options_text_field: {
            type: String,
            default: "name"
        },
        check_on_blur: {
            Type: Boolean,
            default: true
        },
        show_values : {
            Type: Boolean,
            default: false
        },
        old_source : {
            Type: String,
            default : ""
        }
    },

    computed: {
        ShowHint() {
            return this.hint && !this.error_message && this.field_type !== "selectMultiple";
        }
    },

    watch: {
        localValue: function () {
            this.$emit("input", this.localValue)
        },
        value: function () {
            this.localValue = this.value
        }
    },

    mounted() {
        this.localValue = this.value;
    },

    methods: {
        makeUpperCase(string) {
            if(!string){
                return;
            }
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        onChangeFile(event){
            this.$emit('input', event.target.files[0]);
        },
        emitName() {
            this.$emit("blur", this.name);
        },
        emitNameOnBlur() {
            if (!this.check_on_blur) {
                return;
            }

            this.emitName();
        }
    },
}
</script>
<template>
    <div class="form-group">
        <label v-if="label" :for="id" class="form-label">{{ label }}</label>
        
        <input v-if="field_type == 'string'" v-model="localValue" :name="name" :id="id" type="text" class="form-control"
            @blur="emitNameOnBlur">

        <textarea v-if="field_type === 'text'" v-model="localValue" :name="name" :id="id" cols="30" rows="5"
        class="form-control" @blur="emitNameOnBlur"></textarea>

        <input v-if="field_type == 'password'" v-model="localValue" :name="name" :id="id" type="password"
            class="form-control" @blur="emitNameOnBlur">

        <input v-if="field_type == 'number'" v-model="localValue" :name="name" :id="id" type="number" class="form-control"
            @blur="emitNameOnBlur">

        <input v-if="field_type == 'datetime'" v-model="localValue" :name="name" :id="id" type="datetime-local"
        @blur="emitNameOnBlur">

        <select v-if="field_type == 'select'" v-model="localValue" :name="name" :id="id" class="col-12 form-select">
            <option value="-1" disabled>Select option</option>
            <option v-for="option in options" :key="option[options_value_field]" :value="option[options_value_field]">
                {{ makeUpperCase(option[options_text_field]) }}
            </option>
        </select>

        <InputDropdownSelectMultiple v-if="field_type == 'selectMultiple'" :options="options" 
        :text_field="options_text_field" :value_field="options_value_field" :name="label"
        v-model="localValue" :id="id" :hint="hint"/>

        <InputImage v-if="field_type == 'image'" :old_source="old_source" v-model="localValue"/>

        <p v-if="error_message" class="alert alert-danger py-2 my-1">{{ error_message }}</p>
        <p v-if="ShowHint">{{ hint }}</p>
    </div>
</template>