<template>
    <div class="flex items-center justify-between px-4 py-3 sm:px-6">
        <div class="flex justify-between flex-1 sm:hidden">
            <button
                class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="previousPage === null"
                @click="toPage(previousPage)"
            >
                Previous
            </button>
            <button
                class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <p class="text-sm text-gray-700 dark:text-gray-200">
                    Showing <span class="font-medium">{{ meta.from }}</span> to
                    <span class="font-medium">{{ meta.to }}</span> of
                    <span class="font-medium">{{ meta.total }}</span> results
                </p>
            </div>
            <div>
                <nav
                    class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm "
                    aria-label="Pagination"
                >
                    <button
                        class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:hover:bg-gray-600 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-200"
                        :disabled="previousPage === null"
                        @click="toPage(previousPage)"
                    >
                        <span class="sr-only">Previous</span>
                        <hero-icons-solid
                            class="w-5 h-5"
                            name="chevron-left"
                        ></hero-icons-solid>
                    </button>
                    <button
                        v-for="(page, index) in pages"
                        :key="index"
                        class="relative inline-flex items-center px-4 py-2 text-sm font-medium border dark:bg-gray-700 dark:text-gray-200"
                        :class="pageClass(page)"
                        :disabled="page === '...'"
                        @click="toPage(page)"
                    >
                        <span>{{ page }}</span>
                    </button>
                    <button
                        class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:hover:bg-gray-600 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-200"
                        :disabled="nextPage === null"
                        @click="toPage(nextPage)"
                    >
                        <span class="sr-only">Next</span>
                        <hero-icons-solid
                            class="w-5 h-5"
                            name="chevron-right"
                        ></hero-icons-solid>
                    </button>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import HeroIconsSolid from "./HeroIconsSolid.vue";
export default {
    components: { HeroIconsSolid },
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

            let first = Math.max(this.meta.current_page - 2, 1);
            let last = Math.min(
                this.meta.current_page + 2,
                this.meta.last_page
            );

            if (first != 1) {
                pages.push(1);

                if (first != 2) {
                    pages.push("...");
                }
            }

            for (let i = first; i <= last; i++) {
                pages.push(i);
            }

            if (last != this.meta.last_page) {
                if (last + 1 != this.meta.last_page) {
                    pages.push("...");
                }

                pages.push(this.meta.last_page);
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
            if (page === "...") return;

            if (this.path) {
                this.$router.push({
                    path: this.path,
                    query: { page: page },
                });
            }
        },
        pageClass(page) {
            if (page === "...") {
                return "cursor-default border-gray-300 text-gray-500";
            }

            return this.meta.current_page === page
                ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600";
        },
    },
};
</script>