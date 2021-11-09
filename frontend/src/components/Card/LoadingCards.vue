<template>
    <div class="divide-y divide-gray-200 dark:divide-gray-600">
        <div
            class="grid grid-cols-1 bg-white sm:grid-cols-6 dark:bg-gray-700"
            v-for="index in 5"
            :key="index"
        >
            <div class="relative flex items-center col-span-2 px-8 py-4">
                <div
                    class="absolute inset-0 flex items-center justify-center w-8 "
                >
                    <!-- star icon -->
                    <div
                        class="block w-5 h-5 bg-gray-400 rounded-full animate-pulse"
                    ></div>
                </div>
                <!-- card question -->
                <div
                    class="block w-full h-5 bg-gray-400 rounded-sm animate-pulse"
                    :style="{ maxWidth: getRandomWidth() + '%' }"
                ></div>
            </div>
            <div
                class="relative flex items-center col-span-2 px-8 pb-4 -mt-2 sm:mt-0 sm:py-4"
            >
                <!-- card answer -->
                <div
                    class="block w-full h-5 bg-gray-400 rounded-sm animate-pulse"
                    :style="{ maxWidth: getRandomWidth() + '%' }"
                ></div>
            </div>
            <div
                class="flex items-center justify-between col-span-2 px-2 py-0 pb-2 sm:py-2"
            >
                <div class="ml-6 sm:ml-0">
                    <!-- review date -->
                    <div
                        class="block w-32 h-5 bg-gray-400 rounded-sm animate-pulse"
                    ></div>
                </div>
                <div>
                    <!-- button -->
                    <div
                        class="block w-5 h-5 bg-gray-400 rounded-full animate-pulse"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        getRandomWidth() {
            return Math.floor(Math.random() * 100) + 20;
        },
    },
};
</script>