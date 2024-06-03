<script>
import InputAdaptable from "@/components/InputAdaptable.vue" 
import getParam from "@/lib/getParam";
import handleParamRequest from "@/lib/paramRequest";
export default {
    name : "InputForm",

    components : {
        InputAdaptable
    },

    props : {
        elements : {
            Type : Object,
            default : () => {}
        },
        value : {
            Type : Object,
            default : () => {}
        },
        errors : {
            Type : Object,
            required : false,
            default : () => {}
        },
        refresh_signal : {
            Type : Boolean,
            required: false,
            default : false
        },
        _class : {
            Type : String,
            default : ""
        }
    },

    data(){
        return {
            formValue : {},
            formSources : {}
        }
    },

    watch: {
        value: function () {
            this.formValue = this.value
        },
        localValue: function () {
            this.$emit("input", this.formValue)
        },
        elements : {
            handler : function(){
                this.loadSources();
            },
            deep : true
        },
        refresh_signal: async function(){
            if(this.refresh_signal){
                this.$emit("refresh", false);
                await this.loadSources();
            }
        }
    },

    mounted(){
        this.formValue = this.value;
        this.loadSources();
    },

    methods : {
        loadSources : async function(){
            if(!this.elements){
                return;
            }
            for(let key of Object.keys(this.elements)){
                let currentElement = this.elements[key];

                if(!currentElement){
                    continue;
                }

                let usesSource = Object.hasOwn(currentElement, "source");
                if(!usesSource){
                    continue;
                }

                let sourceLocal = getParam(currentElement['source'], 'sourceLocal');
                if(sourceLocal){
                    continue;
                }

                let response = await handleParamRequest(currentElement['source']);
                if(!response.success){
                    continue;
                }
                let items = response.body;
                this.$set(this.formSources, key, items);
            }
        },
        elementSource : function(key){
            let element = this.elements[key]
            let sourceLocal = getParam(element['source'], 'sourceLocal');
            let sourceData = getParam(element['source'], 'sourceData');
            if(sourceLocal){
                return this.formSources[sourceLocal];
            }

            if(sourceData){
                return this.formValue[sourceData];
            }

            return this.formSources[key];
        },
        imageSource : function(key){
            let element = this.elements[key]
            if(!element['old_source']){
                return false;
            }

            let sourceData = getParam(element['old_source'], 'sourceData');
            if(sourceData){
                return this.formValue[sourceData];
            }

            return "";
        }
    }
}
</script>

<template>
    <div :class="_class">
        <InputAdaptable v-for="inputBind, index of Object.keys(elements)" 
        :key="index + 'a'" v-bind="elements[inputBind]" :options="elementSource(inputBind)"
        :error_message="(errors ?? {})[inputBind]" :old_source="imageSource(inputBind)"
        v-model="formValue[inputBind]"/>
    </div>
</template>