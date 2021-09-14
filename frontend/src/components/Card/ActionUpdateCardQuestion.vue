<template>
    <div class="flex items-center">
        <input
            class="w-full p-0 m-0 text-sm font-medium border-0 focus:ring-0"
            v-show="editMode"
            type="text"
            v-model="editableCard.question"
            @blur="finishEditing()"
            @keyup.enter="finishEditing()"
            v-todo-focus="true"
        />
        <div v-show="!editMode" @click="editMode = true">{{ card.question }}</div>
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
        card: Object,
    },
    data() {
        return {
            editableCard: { ...this.card },
            editMode: false,
        };
    },
    methods: {
        finishEditing() {
            this.saveNewQuestion();
            this.editMode = false;
        },
        saveNewQuestion() {
            if (this.card.question === this.editableCard.question) return;
            if (!this.editableCard.question) return;

            store.dispatch("card/updateDeckQuestion", {
                id: this.card.id,
                newQuestion: this.editableCard.question,
            });

            repository.updateCardById(this.card.id, this.editableCard);
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