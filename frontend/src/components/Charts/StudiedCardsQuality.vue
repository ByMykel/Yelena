<template>
    <div>
        <div class="flex justify-center">
            <figure
                class="h-96 pie-chart w-96"
                :style="pieChart + 'max-width: 300px;'"
            ></figure>
        </div>
        <div class="flex flex-wrap space-x-3">
            <div
                v-for="(item, index) in pieData"
                :key="index"
                class="flex items-center"
            >
                <span
                    class="block w-3 h-3 mr-1 rounded-full"
                    :style="{ background: item.color }"
                ></span>
                <span
                    class="space-x-1 font-semibold text-gray-400 "
                >
                    <span class="text-gray-500">{{ item.cards_count }}</span>
                    <span>{{ item.quality }}</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: Array
    },
    data() {
        return {
            colors: {
                Incorrect: "#EF4444",
                Hard: "#F59E0B",
                Good: "#3B82F6",
                Easy: "#10B981"
            }
        };
    },
    computed: {
        pieData() {
            let data = [
                {
                    quality: "Total",
                    color: "#111827",
                    cards_count: this.data.reduce(
                        (a, b) => a + b.cards_count,
                        0
                    )
                }
            ];

            for (let item of [...this.data]) {
                data.push({
                    quality: item.quality,
                    color: this.colors[item.quality],
                    cards_count: item.cards_count
                });
            }

            return data;
        },
        pieChart() {
            const data = [...this.data];
            const sortedData = data.sort((a, b) => {
                return a.cards_count - b.cards_count;
            });
            const maxData = Math.max(...data.map(item => item.cards_count));

            let conicGradient = [];

            for (let item of sortedData) {
                let color = this.colors[item.quality];

                conicGradient.push(
                    `${color} 0, ${color} ${(item.cards_count * 100) /
                        maxData}%`
                );
            }

            return `background: radial-gradient(circle closest-side, transparent 100%, white 0), conic-gradient(${conicGradient});`;
        }
    }
};
</script>