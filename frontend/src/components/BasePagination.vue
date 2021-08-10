<template>
    <div class="px-4 py-3 flex items-center justify-between sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
            <button
                class="
                    relative
                    inline-flex
                    items-center
                    px-4
                    py-2
                    border border-gray-300
                    text-sm
                    font-medium
                    rounded-md
                    text-gray-700
                    bg-white
                    hover:bg-gray-50
                    disabled:opacity-50
                "
                :disabled="previousPage === null"
                @click="toPage(previousPage)"
            >
                Previous
            </button>
            <button
                class="
                    ml-3
                    relative
                    inline-flex
                    items-center
                    px-4
                    py-2
                    border border-gray-300
                    text-sm
                    font-medium
                    rounded-md
                    text-gray-700
                    bg-white
                    hover:bg-gray-50
                    disabled:opacity-50
                "
                :disabled="nextPage === null"
                @click="toPage(nextPage)"
            >
                Next
            </button>
        </div>
        <div
            class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
        >
            <div>
                <p class="text-sm text-gray-700">
                    Showing <span class="font-medium">{{ meta.from }}</span> to
                    <span class="font-medium">{{ meta.to }}</span> of
                    <span class="font-medium">{{ meta.total }}</span> results
                </p>
            </div>
            <div>
                <nav
                    class="
                        relative
                        z-0
                        inline-flex
                        rounded-md
                        shadow-sm
                        -space-x-px
                    "
                    aria-label="Pagination"
                >
                    <button
                        class="
                            relative
                            inline-flex
                            items-center
                            px-2
                            py-2
                            rounded-l-md
                            border border-gray-300
                            bg-white
                            text-sm
                            font-medium
                            text-gray-500
                            hover:bg-gray-50
                            disabled:opacity-50
                        "
                        :disabled="previousPage === null"
                        @click="toPage(previousPage)"
                    >
                        <span class="sr-only">Previous</span>
                        <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    <button
                        v-for="page in pages"
                        :key="page"
                        :to="`/decks/?page=${page}`"
                        class="
                            relative
                            inline-flex
                            items-center
                            px-4
                            py-2
                            border
                            text-sm
                            font-medium
                        "
                        :class="
                            meta.current_page === page
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        "
                        @click="toPage(page)"
                    >
                        <span>{{ page }}</span>
                    </button>
                    <button
                        class="
                            relative
                            inline-flex
                            items-center
                            px-2
                            py-2
                            rounded-r-md
                            border border-gray-300
                            bg-white
                            text-sm
                            font-medium
                            text-gray-500
                            hover:bg-gray-50
                            disabled:opacity-50
                        "
                        :disabled="nextPage === null"
                        @click="toPage(nextPage)"
                    >
                        <span class="sr-only">Next</span>
                        <svg
                            class="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import store from "../store";

export default {
    props: {
        action: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            default: null,
        },
        meta: {
            type: Object,
            required: true,
        },
    },
    computed: {
        pages() {
            let pages = [];

            let first = Math.max(this.meta.current_page - 3, 1);
            let last = Math.min(
                this.meta.current_page + 4,
                this.meta.last_page
            );

            for (let i = first; i <= last; i++) {
                pages.push(i);
            }

            return pages;
        },
        previousPage() {
            return this.meta.current_page - 1 > 0
                ? this.meta.current_page - 1
                : null;
        },
        nextPage() {
            return this.meta.current_page + 1 <= this.meta.last_page
                ? this.meta.current_page + 1
                : null;
        },
        currentPage() {
            return this.$route.params.page || 1;
        },
    },
    methods: {
        toPage(page) {
            if (!page || page === this.meta.current_page) return;

            store.dispatch(this.action, page).then(() => {
                if (this.path) {
                    this.$router.push({
                        path: this.path,
                        query: { page: page },
                    });
                }
            });
        },
    },
};
</script>