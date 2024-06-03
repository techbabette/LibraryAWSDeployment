<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Colors } from 'chart.js';

ChartJS.register(Colors);

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
    name : "ChartBar",
    components : {
        Bar
    },

    props : {
        id : {
            Type: String,
            default : "id"
        },
        labels :{
            Type : Array,
            default : () => []
        },
        datasets : {
            Type : Array,
            default : () => []
        },
        options : {
            Type : Object,
            default : () => {}
        }
    },

    computed : {
        chartData : function(){
            return {
                labels : this.labels,
                datasets : this.datasets
            }
        }
    }
}
</script>
<template>
    <Bar :id="id" :options="options" :data="chartData"/>
</template>