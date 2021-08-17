<template>
    <div class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="flex justify-between py-2 items-center">
                <nav>
                    <div class="flex">
                        <router-link
                            to="/"
                            class="block px-3 py-2 rounded-md font-medium"
                            :class="
                                $route.name === 'Home'
                                    ? 'text-blue-500'
                                    : 'text-white hover:text-gray-300'
                            "
                            >Home</router-link
                        >
                        <router-link
                            to="/decks"
                            class="block px-3 py-2 rounded-md font-medium"
                            :class="
                                $route.name === 'Decks'
                                    ? 'text-blue-500'
                                    : 'text-white hover:text-gray-300'
                            "
                            >Decks</router-link
                        >
                    </div>
                </nav>
                <div class="flex space-x-2">
                    <button
                        class="
                            flex
                            items-center
                            jutify-center
                            bg-gray-600 bg-opacity-50
                            hover:bg-opacity-75
                            px-2
                            py-2
                            rounded
                            text-sm text-white
                            font-medium
                        "
                        @click="$emit('create-deck')"
                    >
                        <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <span class="mx-1">Deck</span>
                    </button>
                    <button
                        class="
                            flex
                            items-center
                            jutify-center
                            bg-gray-600 bg-opacity-50
                            hover:bg-opacity-75
                            px-2
                            py-2
                            rounded
                            text-sm text-white
                            font-medium
                        "
                        @click="$emit('create-card')"
                    >
                        <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <span class="mx-1">Card</span>
                    </button>
                    <button
                        class="
                            flex
                            items-center
                            jutify-center
                            bg-gray-600 bg-opacity-50
                            hover:bg-opacity-75
                            px-2
                            py-2
                            rounded
                            text-sm text-white
                            font-medium
                        "
                        @click="$emit('import-card')"
                    >
                        <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd"
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