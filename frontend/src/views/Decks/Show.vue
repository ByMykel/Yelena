<template>
    <div>
        <div class="py-2 text-xl font-semibold">{{ getCards.name }}</div>
        <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div
                    class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
                >
                    <div
                        class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
                    >
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                                    >
                                        Question
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                                    >
                                        Answer
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                                    >
                                        Next review
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr
                                    v-for="card in getCards.cards"
                                    :key="card.id"
                                >
                                    <td
                                        class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        {{ card.question }}
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        {{ card.answer }}
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                    >
                                        {{ card.review_date_human }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../../store";

export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters("card", ["getCards"]),
    },
    beforeRouteEnter(to, from, next) {
        const id = parseInt(to.params.id);
        const page = parseInt(to.query.page) || 1;

        store.dispatch("card/fetchCards", { id, page }).then(() => {
            to.params.id = id;
            to.params.page = page;
            next();
        });
    },
    beforeRouteUpdate(to, from, next) {
        const id = parseInt(to.params.id);
        const page = parseInt(to.query.page) || 1;

        store.dispatch("card/fetchCards", { id, page }).then(() => {
            to.params.id = id;
            to.params.page = page;
            next();
        });
    },
    methods: {},
};
</script>
