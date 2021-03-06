<template>
    <nav>
        <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div
                class="relative flex items-center justify-between h-16 border-b border-blue-300 border-opacity-25 "
            >
                <div
                    class="absolute inset-y-0 left-0 flex items-center sm:hidden"
                >
                    <!-- Mobile menu button-->
                    <button
                        type="button"
                        class="inline-flex items-center justify-center p-2 text-gray-200 rounded-md outline-none hover:text-white hover:bg-blue-500"
                        aria-controls="mobile-menu"
                        aria-expanded="false"
                        @click="showMobileMenu = !showMobileMenu"
                    >
                        <span class="sr-only">Open main menu</span>
                        <hero-icons-outline
                            class="w-6 h-6"
                            :class="[showMobileMenu ? 'hidden' : 'block']"
                            name="menu"
                        ></hero-icons-outline>
                        <hero-icons-outline
                            class="w-6 h-6"
                            :class="[showMobileMenu ? 'block' : 'hidden']"
                            name="x"
                        ></hero-icons-outline>
                    </button>
                </div>
                <div
                    class="flex items-center justify-start flex-1 ml-12 sm:ml-0 sm:items-stretch"
                >
                    <div
                        class="flex items-center text-3xl font-bold text-white"
                    >
                        YELENA
                    </div>
                    <div class="hidden sm:block sm:ml-8">
                        <div class="flex space-x-4">
                            <router-link
                                v-for="(link, index) in links"
                                :key="index"
                                :to="link.to"
                                class="block px-3 py-2 font-medium text-white rounded-md "
                                :class="
                                    $route.name === link.route_name
                                        ? 'bg-blue-700 text-white'
                                        : 'text-gray-200 hover:bg-blue-500 hover:text-white outline-none focus:bg-blue-500 focus:text-white'
                                "
                                >{{ link.name }}</router-link
                            >
                        </div>
                    </div>
                </div>
                <div
                    class="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
                >
                    <button
                        v-for="(action, index) in actions"
                        :key="index"
                        type="button"
                        class="p-2 text-white rounded-full outline-none hover:bg-blue-500 focus:bg-blue-500"
                        @click="openModal(action.modal)"
                    >
                        <hero-icons-outline
                            :class="action.class"
                            :name="action.icon"
                        ></hero-icons-outline>
                    </button>
                    <button
                        class="p-2 text-white rounded-full outline-none hover:bg-blue-500 focus:bg-blue-500"
                        type="button"
                        @click="toggleTheme()"
                    >
                        <hero-icons-outline
                            v-if="isDarkMode"
                            class="w-5 h-5"
                            name="sun"
                        ></hero-icons-outline>
                        <hero-icons-outline
                            v-else
                            class="w-5 h-5"
                            name="moon"
                        ></hero-icons-outline>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile menu, show/hide based on menu state. -->
        <div v-show="showMobileMenu" class="sm:hidden" id="mobile-menu">
            <div
                class="absolute z-40 w-full px-2 pt-2 pb-3 space-y-1 bg-blue-600 shadow rounded-b-md"
                @click="showMobileMenu = false"
            >
                <router-link
                    v-for="(link, index) in links"
                    :key="index"
                    :to="link.to"
                    class="block px-3 py-2 font-medium text-white rounded-md"
                    :class="
                        $route.name === link.route_name
                            ? 'bg-blue-700 text-white'
                            : 'text-gray-200 hover:bg-blue-500 hover:text-white'
                    "
                    >{{ link.name }}</router-link
                >
                <div
                    class="h-2 border-b border-blue-300 border-opacity-25"
                ></div>
            </div>
            <div class="fixed inset-0 z-10 bg-gray-900 bg-opacity-80 top-20"></div>
        </div>
    </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import HeroIconsOutline from "./HeroIconsOutline.vue";

export default {
    components: { HeroIconsOutline },
    data() {
        return {
            showMobileMenu: false,
            links: [
                {
                    name: "Decks",
                    route_name: "Decks",
                    to: "/",
                },
                {
                    name: "Stats",
                    route_name: "Stats",
                    to: "/stats",
                },
            ],
            actions: [
                {
                    name: "Deck",
                    modal: "create_deck",
                    icon: "collection",
                    class: "w-5 h-5",
                },
                {
                    name: "Card",
                    modal: "create_card",
                    icon: "document-text",
                    class: "w-5 h-5",
                },
                {
                    name: "Import Cards",
                    modal: "import_card",
                    icon: "upload",
                    class: "w-5 h-5",
                },
            ],
        };
    },
    computed: {
        ...mapGetters("theme", ["getTheme"]),
        isDarkMode() {
            return this.getTheme === 'dark';
        }
    },
    watch: {
        showMobileMenu(val) {
            if (val) {
                document.body.classList.add("overflow-hidden");
                document.body.classList.add("md:overflow-auto");
            } else {
                document.body.classList.remove("overflow-hidden");
                document.body.classList.remove("md:overflow-auto");
            }
        },
    },
    methods: {
        ...mapActions("modals", ["toggleModalVisibility"]),
        ...mapActions("theme", ["changeTheme"]),
        openModal(modal) {
            this.toggleModalVisibility({
                modal,
                visibility: true,
            });
        },
        toggleTheme() {
            if (this.getTheme === 'light') {
                this.changeTheme("dark");
                document.documentElement.classList.add('dark')
            } else {
                this.changeTheme("light");
                document.documentElement.classList.remove('dark')
            }
        },
    },
};
</script>