import router from "../router";
import store from "../store";

export default function update(currentCardIdRoute = null) {
    let page = router.currentRoute.params.page || 1;

    if (router.currentRoute.name === "Stats") {
        store.dispatch("stats/fetchCardStats");

        return;
    }

    if (router.currentRoute.name === "DeckById") {
        if (
            currentCardIdRoute !== null &&
            currentCardIdRoute !== router.currentRoute.params.id
        ) {
            return;
        }

        store.dispatch("card/fetchCards", {
            id: router.currentRoute.params.id,
            page: page,
        });

        return;
    }

    if (router.currentRoute.name === "Decks") {
        store.dispatch("deck/fetchDecks", { page });
    }
}
