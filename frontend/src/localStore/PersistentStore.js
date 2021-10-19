import axios from "axios";

export default function createLocalStoragePlugin({
    moduleName,
    localStorageName,
    dispatch,
}) {
    return (store) => {
        const loader = localStorage.getItem(localStorageName);

        if (loader !== null) {
            const parsed = JSON.parse(loader);
            store.dispatch(dispatch, parsed);
        }

        if (loader === null) {
            axios
                .get(`/Yelena/data/${localStorageName}.json`)
                .then((data) => store.dispatch(dispatch, data.data));
        }

        store.subscribe((mutation) => {
            if (!mutation.type.startsWith(moduleName)) return;

            localStorage.setItem(
                localStorageName,
                JSON.stringify(store.state[moduleName])
            );
        });
    };
}
