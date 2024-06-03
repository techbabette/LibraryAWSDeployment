<script>
export default {
    name: "InputImage",

    props: {
        show_preview: {
            Type: Boolean,
            default: true
        },
        old_source: {
            Type: String,
            default: ""
        }
    },

    data() {
        return {
            imageSource: ""
        }
    },

    computed: {
        ImagePreview: function () {
            return this.show_preview && this.ImageSource;
        },
        ImageSource: function () {
            if (this.imageSource) {
                return this.imageSource;
            }

            if (this.old_source && typeof this.old_source === 'string') {
                try {
                    let res = '/' + process.env.VUE_APP_IMAGE_SOURCE + this.old_source;
                    return res;
                }
                catch {
                    return false;
                }
            }

            return false;
        }
    },

    methods: {
        onSelectFile(event) {
            this.$emit('input', event.target.files[0]);
            this.imageSource = window.URL.createObjectURL(event.target.files[0]);
        },
    }
}
</script>

<template>
    <div>
        <input type="file" @change="onSelectFile" />
        <img class="w-100" v-if="ImagePreview" :src="ImageSource" />
    </div>
</template>