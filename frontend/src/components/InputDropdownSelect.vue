<script>
export default {
    name : "InputDropdownSelect",

    props: {
        value : {
            type: [String, Number]
        },
        label : {
            type: String,
            required: false
        },
        name : {
            type: String,
            default: "field"
        },
        hint : {
            Type : String
        },
        error_message : {
            Type : String
        },
        options : {
            type: Array,
            required : false
        },
        options_value_field : {
            type: String,
            default: "id"
        },
        options_text_field : {
            type: String,
            default: "name"
        },
        check_on_blur : {
            Type : Boolean,
            default : true
        }
    },

    data(){
        return {
            localValue : this.value,
            id : Math.floor(Math.random() * 1000) + this.name
        }
    },

    watch: {
       localValue: function() {
           this.$emit("input", this.localValue)
       },
       value: function() {
           this.localValue = this.value
       }
   },

   methods : {
        setValueToSelf(newValue){
            this.localValue = newValue;
        }
   }
}
</script>
<template>
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" :id="id" data-bs-toggle="dropdown" aria-expanded="false">
          {{ label }}
        </button>
        <ul class="dropdown-menu" :aria-labelledby="id">
            <div v-for="option, key of options" :key="key" class="d-flex flex-row justify-content-between dropdown-item">
                <a :id="option[options_value_field]" class="w-100" :class="{active : localValue === option[options_value_field]}"
                 href="#" @click.prevent="setValueToSelf(option[options_value_field])"> {{ option[options_text_field] }}</a>
            </div>
        </ul>
    </div>
</template>