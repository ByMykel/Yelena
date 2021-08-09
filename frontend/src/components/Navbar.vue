<template>
    <div class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="flex justify-between py-2 items-center">
                <nav>
                    <div class="flex">
                        <router-link
                            to="/"
                            class="
                                block
                                px-3
                                py-2
                                rounded-md
                                text-sm
                                font-medium
                            "
                            :class="
                                $route.name === 'Home'
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-black-200 hover:text-white'
                            "
                            >Home</router-link
                        >
                        <router-link
                            to="/decks"
                            class="
                                block
                                px-3
                                py-2
                                rounded-md
                                text-sm
                                font-medium
                            "
                            :class="
                                $route.name === 'Decks'
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-black-200 hover:text-white'
                            "
                            >Decks</router-link
                        >
                    </div>
                </nav>
                <div>
                    <button
                        class="
                            flex
                            items-center
                            jutify-center
                            bg-green-400
                            hover:bg-green-500
                            p-1
                            rounded
                            text-sm
                            font-medium
                        "
                        @click="$emit('create-deck')"
                    >
                        Create deck
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>