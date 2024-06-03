<script>
import InputForm from "./InputForm.vue";
import axios from "@/axios/axios";
import pageReady from "@/lib/pageReady";
export default {
    name: "PageContact",

    components: {
        InputForm
    },

    data() {
        return {
            formElements: {
                "title": {
                    field_type: "string",
                    label: "Title"
                },
                "message_type_id": {
                    field_type: "select",
                    label: "Message type",
                    source: "get|messagetype?noPage=true"
                },
                "body": {
                    field_type: "text",
                    label: "Message text",
                }
            },
            errors: {

            },
            message: {
                title: "",
                body: "",
                message_type_id: -1
            },
            messageTypes: []
        }
    },

    mounted() {
        pageReady();
    },

    methods: {
        sendMessage: async function () {
            let result = await axios.post("message", this.message);

            if (result.success) {
                this.errors = {};
                this.$store.commit("messages/display", { text: "Successfully sent message!", success: true });
            } else {
                this.errors = result.errors;
            }
        }
    }
}
</script>

<template>
    <div class="mk-solo-page page container-fluid">
        <form action="" class="p-4 rounded col-12 col-md-6" @submit.prevent="sendMessage">
            <h2>Send a message to the administration team</h2>
            <InputForm :elements="formElements" :errors="errors" v-model="message" />
            <button type="submit" @click.prevent="sendMessage" class="btn btn-light w-100 bigButton my-2">
                Send
            </button>
        </form>
    </div>
</template>