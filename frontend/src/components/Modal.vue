<template>
    <div
        v-show="show"
        class="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-25 "
    >
        <div class="w-full mx-2" style="max-width: 28rem">
            <div class="relative">
                <button
                    class="absolute right-0 flex items-center justify-center w-6 h-6 bg-black rounded-full shadow cursor-pointer bg-opacity-80 -top-8 hover:bg-opacity-100"
                    @click="$parent.$emit('close-modal')"
                >
                    <svg
                        class="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>
            <div
                class="overflow-y-auto bg-white rounded-md shadow"
                style="max-height: calc(100vh - 150px)"
            >
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: Boolean,
    },
    watch: {
        show(value) {
            if (value) {
                return document
                    .querySelector("body")
                    .classList.add("overflow-hidden");
            }

            return document
                .querySelector("body")
                .classList.remove("overflow-hidden");
        },
    },
};
</script>