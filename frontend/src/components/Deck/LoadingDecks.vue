<template>
    <div class="divide-y divide-gray-200">
        <div
            class="grid grid-cols-1 bg-white sm:grid-cols-5"
            v-for="index in 5"
            :key="index"
        >
            <div class="relative flex items-center col-span-3 px-8 py-4">
                <div
                    class="absolute inset-0 flex items-center justify-center w-8 "
                >
                    <!-- star icon -->
                    <div
                        class="block w-5 h-5 bg-gray-400 rounded-full animate-pulse"
                    ></div>
                </div>
                <!-- deck name -->
                <div
                    class="block w-full h-5 bg-gray-400 rounded-sm animate-pulse"
                ></div>
            </div>
            <div
                class="flex items-center justify-between col-span-2 px-2 py-0 pb-2 sm:py-2"
            >
                <div class="ml-6 sm:ml-0">
                    <!-- card count/due -->
                    <div
                        class="block w-10 h-5 bg-gray-400 rounded-sm animate-pulse"
                    ></div>
                </div>
                <div class="flex items-center justify-end space-x-4">
                    <!-- buttons -->
                    <div
                        class="block w-5 h-5 bg-gray-400 rounded-full animate-pulse"
                    ></div>
                    <div
                        class="block w-5 h-5 bg-gray-400 rounded-full animate-pulse"
                    ></div>
                    <div
                        class="block w-5 h-5 bg-gray-400 rounded-full animate-pulse"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>