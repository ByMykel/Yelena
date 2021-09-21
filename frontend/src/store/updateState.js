import router from "../router";
import store from "../store";

export default function update() {
    if (router.currentRoute.name === "Decks") {
        store.dispatch("deck/fetchDecks", router.currentRoute.params.page || 1);
    }

    if (router.currentRoute.name === "DeckById") {
        store.dispatch("card/fetchCards", {
            id: router.currentRoute.params.id,
            page: router.currentRoute.params.page || 1,
        });
    }
}
