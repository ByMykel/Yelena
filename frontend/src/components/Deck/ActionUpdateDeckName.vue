<template>
    <div class="w-full" @keyup.enter="editMode = !editMode">
        <input
            v-show="editMode"
            class="w-full p-0 m-0 text-sm font-medium border-0 focus:ring-0 dark:bg-gray-700 dark:text-gray-200"
            style="max-width: calc(100% - 2.3rem)"
            type="text"
            v-model="editableDeck.name"
            v-todo-focus="true"
            @blur="finishEditing()"
        />
        <span
            class="flex items-center group focus:outline-none"
            tabindex="0"
            @click="editMode = true"
        >
            <div
                v-show="!editMode"
                class="truncate"
                style="max-width: calc(100% - 1.5rem)"
            >
                {{ deck.name }}
            </div>
            <hero-icons-outline
                v-show="!editMode"
                class="w-3 h-3 ml-1 text-gray-500 duration-300 cursor-pointer dark:text-gray-300 group-focus:w-4 group-hover:w-4 group-focus:h-4 group-hover:h-4 group-focus:text-blue-600 group-hover:text-blue-600 group-focus:animate-bounce group-hover:animate-bounce"
                name="pencil"
            ></hero-icons-outline>
        </span>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import HeroIconsOutline from "../HeroIconsOutline.vue";

export default {
    components: { HeroIconsOutline },
    props: {
        deck: Object,
    },
    data() {
        return {
            editableDeck: { ...this.deck },
            editMode: false,
        };
    },
    methods: {
        ...mapActions("deck", ["updateDeckName"]),
        finishEditing() {
            this.saveNewName();
            this.editMode = false;
        },
        saveNewName() {
            if (this.deck.name === this.editableDeck.name) return;
            if (!this.editableDeck.name) return;

            this.updateDeckName({
                id: this.deck.id,
                deck: this.editableDeck,
            });
        },
    },
    directives: {
        "todo-focus": function (el, binding) {
            if (binding.value) {
                el.focus();
            }
        },
    },
};
</script>