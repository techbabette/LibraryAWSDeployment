<script>
export default {
    name: "InfoBlock",
    
    props: {
        title: String,
        max_value: Number,
        start_value: {
            Type: Number,
            default: 0
        },
        step: {
            Type: Number,
            default: 1
        },
        time_to_load: {
            Type: Number,
            default : 2500
        },
        prop_class: {
            Type: String,
            default : "col-12 col-md-6 info-block mk-flex-column-center"
        }
    },

    data() {
        return {
            shownValue: this.start_value
        }
    },

    watch: {
        max_value: function () {
            this.countToValue();
        }
    },

    mounted() {
        this.countToValue();
    },

    methods: {
        countToValue() {
            let that = this;
            let interval = this.time_to_load / Math.abs(this.start_value - this.max_value);
            let counter = setInterval(function () {
                if (that.max_value === that.shownValue) {
                    clearInterval(counter);
                    return;
                }
                if (that.shownValue > that.max_value) {
                    that.shownValue -= that.step;
                    return;
                }
                that.shownValue += that.step
            }, interval)
        }
    }
}
</script>
<template>
    <div :class="prop_class">
        <h2 id="memNum">{{ shownValue }}</h2>
        <h3>{{ title }}</h3>
    </div>
</template>