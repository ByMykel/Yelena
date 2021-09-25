<template>
    <div
        class="flex items-center"
        tabindex="0"
        @keyup.enter="editMode = !editMode"
    >
        <input
            v-show="editMode"
            class="w-full p-0 m-0 text-sm font-medium border-0 focus:ring-0"
            type="text"
            v-model="editableDeck.name"
            v-todo-focus="true"
            @blur="finishEditing()"
        />
        <div v-show="!editMode" @click="editMode = true">{{ deck.name }}</div>
        <svg
            v-show="!editMode"
            class="w-3 h-3 ml-1 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
        </svg>
    </div>
</template>

<script>
import repository from "../../api/repository";
import store from "../../store";

export default {
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
        finishEditing() {
            this.saveNewName();
            this.editMode = false;
        },
        saveNewName() {
            if (this.deck.name === this.editableDeck.name) return;
            if (!this.editableDeck.name) return;

            store.dispatch("deck/updateDeckName", {
                id: this.deck.id,
                newName: this.editableDeck.name,
            });

            repository.updateDeckById(this.deck.id, this.editableDeck);
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