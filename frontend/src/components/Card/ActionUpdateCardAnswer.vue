<template>
    <div class="flex" @keyup.enter="editMode = true">
        <input
            v-show="editMode"
            class="w-full p-0 m-0 text-sm font-medium border-0 focus:ring-0"
            type="text"
            v-model="editableCard.answer"
            v-todo-focus="true"
            @blur="finishEditing()"
            @keydown.enter="finishEditing()"
        />
        <span
            class="flex items-center group focus:outline-none"
            tabindex="0"
            @click="editMode = true"
        >
            <div v-show="!editMode">
                {{ card.answer }}
            </div>
            <hero-icons-outline
                v-show="!editMode"
                class="w-3 h-3 ml-1 text-gray-500 duration-300 cursor-pointer group-focus:w-4 group-hover:w-4 group-focus:h-4 group-hover:h-4 group-focus:text-blue-600 group-hover:text-blue-600 group-focus:animate-bounce group-hover:animate-bounce"
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
        card: Object,
    },
    data() {
        return {
            editableCard: { ...this.card },
            editMode: false,
        };
    },
    methods: {
        ...mapActions("card", ["updateCardAnswer"]),
        finishEditing() {
            this.saveNewAnswer();
            this.editMode = false;
        },
        saveNewAnswer() {
            if (this.card.answer === this.editableCard.answer) return;
            if (!this.editableCard.answer) return;

            this.updateCardAnswer({
                id: this.card.id,
                answer: this.editableCard.answer,
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