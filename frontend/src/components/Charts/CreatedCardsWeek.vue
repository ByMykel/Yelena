<template>
    <div class="flex justify-center h-56 p-3 m-1 space-x-2 lg:mx-20">
        <div
            v-for="(item, index) in data"
            :key="index"
            class="flex flex-col items-center justify-end w-full"
            :style="{
                maxWidth: calculateMaxWidth + '%',
            }"
        >
            <div
                class="relative w-full h-full"
                :style="{
                    maxHeight:
                        calculateBarHeight(item.created_cards_count) + 'rem',
                }"
            >
                <span
                    class="block h-full bg-gray-400 rounded-t-sm dark:bg-gray-300"
                    :style="{
                        maxHeight:
                            calculateBarHeight(item.created_cards_count) +
                            'rem',
                    }"
                ></span>
            </div>
            <span
                class="w-full text-center bg-gray-600 dark:bg-gray-500 p-0.5"
                :class="[
                    calculateBarHeight(item.created_cards_count)
                        ? 'rounded-b-sm'
                        : 'rounded-sm',
                ]"
            >
                <p class="px-2 text-xs text-white truncate sm:text-sm">
                    {{ item.created_cards_count }}
                </p>
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-200">
                <p class="hidden sm:block" :title="item.date">
                    {{ getDayName(item.date, "en-EN") }}
                </p>
                <p
                    class="block sm:hidden"
                    :title="getDayName(item.date, 'en-EN') + ' - ' + item.date"
                >
                    {{ item.day }}
                </p>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: Array,
    },
    computed: {
        calculateMaxWidth() {
            return 100 / 7;
        },
    },
    methods: {
        calculateBarHeight(value) {
            const maxValue = Math.max(
                ...this.data.map((element) => element.created_cards_count)
            );

            return (value * 10) / maxValue;
        },
        getDayName(dateStr, locale) {
            const date = new Date(dateStr);

            return date.toLocaleDateString(locale, { weekday: "long" });
        },
    },
};
</script>