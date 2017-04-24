// declare function Router(routes: any): { init: Function };

declare module "director" {
    function Router(routes: any): IRouter; //{ init: Function }
    interface IRouter {
        init: (redirect?: string) => void;
        getRoute: () => string[];
        setRoute: Function;
        dispatch: (method, path, callback?) => void;
        on: (method, path, route?) => void;
    }
}