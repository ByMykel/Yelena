<template>
    <div class="pb-64 bg-blue-600">
        <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="flex items-center justify-between py-2 border-b border-blue-300 border-opacity-25">
                <nav>
                    <div class="flex">
                        <router-link
                            to="/"
                            class="block px-3 py-2 font-medium text-white rounded-md"
                            :class="
                                $route.name === 'Home'
                                    ? 'bg-blue-500 bg-opacity-50'
                                    : 'hover:text-gray-200'
                            "
                            >Home</router-link
                        >
                        <router-link
                            to="/decks"
                            class="block px-3 py-2 font-medium text-white rounded-md"
                            :class="
                                $route.name === 'Decks'
                                    ? 'bg-blue-500 bg-opacity-50'
                                    : 'hover:text-gray-200'
                            "
                            >Decks</router-link
                        >
                    </div>
                </nav>
                <div class="flex space-x-2">
                    <button
                        class="flex items-center px-2 py-2 text-sm font-medium text-white bg-blue-500 bg-opacity-50 rounded jutify-center hover:bg-opacity-75"
                        @click="$emit('create-deck')"
                    >
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                        </svg>
                        <span class="mx-1">Deck</span>
                    </button>
                    <button
                        class="flex items-center px-2 py-2 text-sm font-medium text-white bg-blue-500 bg-opacity-50 rounded jutify-center hover:bg-opacity-75"
                        @click="$emit('create-card')"
                    >
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                        </svg>
                        <span class="mx-1">Card</span>
                    </button>
                    <button
                        class="flex items-center px-2 py-2 text-sm font-medium text-white bg-blue-500 bg-opacity-50 rounded jutify-center hover:bg-opacity-75"
                        @click="$emit('import-card')"
                    >
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            ></path>
                        </svg>
                        <span class="mx-1">Import Cards</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>