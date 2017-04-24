interface IToolbar {
    onAddRow?: Function,
    onToggleFilter?: Function,
    enableFilter?: boolean,
    numberOfRows?: number
}

interface IReactDataGrid {
    columns: any;
    rowKey?: string;
    rowGetter: Function;
    rowsCount: number;
    minHeight: number;
    toolbar?: JSX.Element;
    onGridSort?: Function;
    onRowUpdated?: Function;
    enableRowSelect?: boolean;
    enableCellSelect?: boolean;
    onCellsDragged?: Function;
    onCellCopyPaste?: Function;
    onAddFilter?: Function;
}

declare class ReactDataGrid extends __React.Component<IReactDataGrid, any>{
}

declare namespace ReactDataGrid{
    import React = __React;

    class Toolbar extends React.Component<IToolbar, any>{
    }
    namespace Editors {
        class AutoComplete extends React.Component<any, any>{
        }
        class DropDownEditor extends React.Component<any, any>{
        }
        class SimpleTextEditor extends React.Component<any, any>{
        }
        class CheckboxEditor extends React.Component<any, any>{
        }        
    }
    namespace Formatters  {
        class ImageFormatter extends React.Component<any, any>{
            protected _load(x): (x: string) => void;
        }        
    }
}

declare module "react-data-grid/addons" {
    export = ReactDataGrid;
}