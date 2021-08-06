<template>
    <div class="bg-gray-800">
        <nav class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="flex py-2">
                <router-link
                    to="/"
                    class="block px-3 py-2 rounded-md text-sm font-medium"
                    :class="
                        $route.name === 'Home'
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-black-200 hover:text-white'
                    "
                    >Home</router-link
                >

                <router-link
                    to="/cards"
                    class="block px-3 py-2 rounded-md text-sm font-medium"
                    :class="
                        $route.name === 'Cards'
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-black-200 hover:text-white'
                    "
                    >Cards</router-link
                >

                <router-link
                    to="/decks"
                    class="block px-3 py-2 rounded-md text-sm font-medium"
                    :class="
                        $route.name === 'Decks'
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-black-200 hover:text-white'
                    "
                    >Decks</router-link
                >
            </div>
        </nav>
    </div>
</template>

<script>
export default {};
</script>