<template>
    <div class="pb-64 bg-blue-600">
        <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div
                class="flex items-center justify-between py-2 border-b border-blue-300 border-opacity-25 "
            >
                <nav class="flex space-x-2">
                    <router-link
                        v-for="(link, index) in links"
                        :key="index"
                        :to="link.to"
                        class="block px-3 py-2 font-medium text-white rounded-md "
                        :class="
                            $route.name === link.route_name
                                ? 'bg-blue-700 bg-opacity-40'
                                : 'hover:bg-blue-500 hover:bg-opacity-50'
                        "
                        >{{ link.name }}</router-link
                    >
                </nav>
                <div class="flex space-x-2">
                    <button
                        v-for="(action, index) in actions"
                        :key="index"
                        class="flex items-center px-2 py-2 text-sm font-medium text-white bg-blue-500 bg-opacity-50 rounded focus:outline-none jutify-center focus:bg-opacity-75 hover:bg-opacity-75"
                        @click="$emit(action.emit)"
                    >
                        <hero-icons-outline
                            :class="action.class"
                            :name="action.icon"
                        ></hero-icons-outline>
                        <span class="mx-1">{{ action.name }}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeroIconsOutline from "./HeroIconsOutline.vue";
export default {
    components: { HeroIconsOutline },
    data() {
        return {
            links: [
                {
                    name: "Home",
                    route_name: "Home",
                    to: "/"
                },
                {
                    name: "Decks",
                    route_name: "Decks",
                    to: "/decks"
                },
                {
                    name: "Stats",
                    route_name: "Stats",
                    to: "/stats"
                }
            ],
            actions: [
                {
                    name: "Deck",
                    emit: "create-deck",
                    icon: "plus",
                    class: "w-5 h-5"
                },
                {
                    name: "Card",
                    emit: "create-card",
                    icon: "plus",
                    class: "w-5 h-5"
                },
                {
                    name: "Import Cards",
                    emit: "import-card",
                    icon: "upload",
                    class: "w-5 h-5"
                }
            ]
        };
    }
};
</script>