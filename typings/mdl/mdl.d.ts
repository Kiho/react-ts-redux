//interface IColumn {
//    name: string;
//    label: string;
//    numeric?: boolean;
//}

//interface IDataTable {
//    columns: IColumn[];
//    data: any[];  
//    selectable?: boolean; 
//    onChange?: any;
//    onInput?: any; 
//}

//declare class MaterialDataTable extends React.Component<IDataTable, {}>{

//}

declare module componentHandler {
    function upgradeElement(elem: Element): void;
    function downgradeElements(elem: Element): void;
}

