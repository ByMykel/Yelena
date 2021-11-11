<template>
    <div>
        <div v-if="showStats">
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
                        class="space-x-1 font-semibold text-gray-400 dark:text-gray-200"
                    >
                        <span class="text-gray-500 dark:text-gray-300">{{
                            item.cards_count
                        }}</span>
                        <span>{{ item.quality }}</span>
                    </span>
                </div>
            </div>
        </div>
        <div
            v-else
            class="font-medium text-center text-gray-700 dark:text-gray-200"
        >
            No data
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: Array,
    },
    data() {
        return {
            colors: {
                Incorrect: "#EF4444",
                Hard: "#F59E0B",
                Good: "#3B82F6",
                Easy: "#10B981",
            },
        };
    },
    computed: {
        showStats() {
            return [...this.data].reduce(
                (total, count) => total + count.cards_count,
                0
            );
        },
        pieData() {
            let data = [
                {
                    quality: "Total",
                    color: "#111827",
                    cards_count: this.data.reduce(
                        (a, b) => a + b.cards_count,
                        0
                    ),
                },
            ];

            for (let item of [...this.data]) {
                data.push({
                    quality: item.quality,
                    color: this.colors[item.quality],
                    cards_count: item.cards_count,
                });
            }

            return data;
        },
        pieChart() {
            const data = [...this.data];
            const sortedData = data.sort((a, b) => {
                return a.cards_count - b.cards_count;
            });
            const totalCards = data.reduce(
                (total, count) => total + count.cards_count,
                0
            );

            let conicGradient = [];

            if (totalCards) {
                for (let item of sortedData) {
                    let color = this.colors[item.quality];

                    conicGradient.push(
                        `${color} 0, ${color} ${
                            (item.cards_count * 100) / totalCards
                        }%`
                    );
                }
            }

            if (!conicGradient.length) {
                conicGradient = "rgb(17, 24, 39) 0, rgb(17, 24, 39) 100%";
            }

            let radialGradientColor = this.isDarkMode ? "#27272b" : "#fff";

            return `background: radial-gradient(circle closest-side, transparent 100%, ${radialGradientColor}), conic-gradient(${conicGradient});`;
        },
        isDarkMode() {
            return (
                localStorage.theme === "dark" ||
                (!("theme" in localStorage) &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches)
            );
        },
    },
};
</script>