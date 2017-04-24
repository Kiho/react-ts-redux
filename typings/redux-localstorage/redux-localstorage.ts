declare function persistState(paths, config);

declare module "redux-localstorage" {
    export = persistState;
}