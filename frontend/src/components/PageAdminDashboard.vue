<script>
import InfoBlock from '@/components/InfoBlock.vue';
import ChartBar from './ChartBar.vue';
import pageReady from "@/lib/pageReady";
export default {
    name: "PageAdminDashboard",

    components: {
        InfoBlock,
        ChartBar
    },

    data() {
        return {
            InfoBlocksData: {
                "activeLoans": 0,
                "lateLoans": 0,
                "newLoans": 0,
                "totalLoans": 0
            },
            ChartData: [],
            chartOptions: {
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Loans by Category'
                    },
                    colors: {
                        enabled: true
                    }
                },
                scales: {
                    x: {
                        title: {
                            text: "Category",
                            display: true,
                            color: "#911"
                        }
                    },
                    y: {
                        title: {
                            text: "Number of loans",
                            display: true,
                            color: "#911"
                        },
                        ticks: {
                            beginAtZero: true,
                            callback: function (val) {
                                // when the floored value is the same as the value we have a whole number
                                if (Math.floor(val) === val) {
                                    return val;
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    computed: {
        adminName: function () {
            return this.$store.getters['user/claims'].name;
        },
        chartDataLabels: function () {
            return this.ChartData.map((el) => el.text);
        },
        chartDatasetActive: function () {
            return { data: this.ChartData.map((el) => el.active_loans_count), label: "Active loans (Includes late)", backgroundColor: "#0DCAF0", hidden: true, };
        },
        chartDatasetLate: function () {
            return { data: this.ChartData.map((el) => el.late_loans_count), label: "Late loans", backgroundColor: "#DC3545", hidden: true, };
        },
        chartDatasetNew: function () {
            return { data: this.ChartData.map((el) => el.new_loans_count), label: "New loans (last 24h)", backgroundColor: "#0D6EFD", hidden: true, };
        },
        chartDatasetAll: function () {
            return { data: this.ChartData.map((el) => el.loans_count), label: "All-time loans", backgroundColor: "#FFC107" };
        },
        chartDatasets: function () {
            return [this.chartDatasetAll, this.chartDatasetActive, this.chartDatasetNew, this.chartDatasetLate,];
        }
    },

    mounted() {
        this.loadInfoBlocksData();

        pageReady();
    },

    methods: {
        loadInfoBlocksData: async function () {
            let yesterdayDate = new Date();
            yesterdayDate.setDate(yesterdayDate.getDate() - 1);
            yesterdayDate = yesterdayDate.toISOString();
            let [totalLoans, newLoans, activeLoans, lateLoans, categoriesWithLoans] = await Promise.all([
                this.$store.dispatch("fetch", { url: "/loan", params: { allCount: true } }),
                this.$store.dispatch("fetch", { url: "/loan", params: { onlyCount: true, since: yesterdayDate, panel: true } }),
                this.$store.dispatch("fetch", { url: "/loan", params: { onlyCount: true, panel: true } }),
                this.$store.dispatch("fetch", { url: "/loan", params: { onlyCount: true, late: true, panel: true } }),
                this.$store.dispatch("fetch", {
                    url: "/category",
                    params: { onlyLoanCount: true, withActiveLoanCount: true, withLateLoanCount: true, withNewLoanCount: true, currentAndPrevious: true }
                }),
            ])

            this.InfoBlocksData.activeLoans = activeLoans.body;
            this.InfoBlocksData.lateLoans = lateLoans.body;
            this.InfoBlocksData.newLoans = newLoans.body;
            this.InfoBlocksData.totalLoans = totalLoans.body;

            this.ChartData = categoriesWithLoans.body;
        }
    },
}
</script>
<template>
    <div class="">
        <h2>Welcome to the dashboard, {{ adminName }}</h2>
        <hr>
        <div class="col-12 d-flex flex-row flex-wrap p-2 align-items-center">
            <div class="col-12 d-flex flex-column col-md-6 justify-content-center">
                <InfoBlock prop_class="border shadow rounded col-12 col-md-11 my-2 p-2 bg-warning text-white text-center"
                    title="Total loans" :max_value="this.InfoBlocksData.totalLoans" />
                <InfoBlock prop_class="border shadow rounded col-12 col-md-11 my-2 p-2 bg-primary text-white text-center"
                    title="New loans" :max_value="this.InfoBlocksData.newLoans" />
            </div>
            <div class="col-12 d-flex flex-column col-md-6 align-items-center">
                <InfoBlock prop_class="border shadow rounded col-12 col-md-11 my-2 p-2 bg-info text-white text-center"
                    title="Active loans" :max_value="this.InfoBlocksData.activeLoans" />
                <InfoBlock prop_class="border shadow rounded col-12 col-md-11 my-2 p-2 bg-danger text-white text-center"
                    title="Late loans" :max_value="this.InfoBlocksData.lateLoans" />
            </div>
        </div>
        <ChartBar id="mychart" title="Loans by category" class="chartHeight" :options="chartOptions"
            :labels="this.chartDataLabels" :datasets="this.chartDatasets" />
    </div>
</template>

<style scoped>
.chartHeight {
    max-height: 80vh;
}

@media only screen and (min-width: 600px) {
    .chartHeight {
        max-height: 55vh !important;
    }
}
</style>