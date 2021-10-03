<template>
    <div class="flex justify-center h-56 p-3 m-1 mx-10 space-x-2">
        <div
            v-for="(item, index) in data"
            :key="index"
            class="flex flex-col items-center justify-end w-full"
            :style="{
                maxWidth: calculateMaxWidth + '%',
            }"
        >
            <div
                class="relative w-full h-full rounded-md group"
                :style="{
                    maxHeight:
                        calculateBarHeight(item.created_cards_count) + 'rem',
                }"
            >
                <span
                    class="block h-full bg-gray-700 rounded-md cursor-pointer hover:bg-green-400"
                    :style="{
                        maxHeight:
                            calculateBarHeight(item.created_cards_count) +
                            'rem',
                    }"
                ></span>
                <span
                    class="absolute z-10 hidden px-2 py-1 truncate bg-gray-100 rounded-md shadow left-1 -top-6 group-hover:block"
                >
                    <p class="text-sm">{{ item.created_cards_count }} cards</p>
                </span>
            </div>
            <span class="text-xs text-gray-500">
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
        data: Array
    },
    computed: {
        calculateMaxWidth() {
            return 100 / 7;
        }
    },
    methods: {
        calculateBarHeight(value) {
            const maxValue = Math.max(
                ...this.data.map(element => element.created_cards_count)
            );

            return (value * 10) / maxValue + 0.1;
        },
        getDayName(dateStr, locale) {
            const date = new Date(dateStr);

            return date.toLocaleDateString(locale, { weekday: "long" });
        }
    }
};
</script>