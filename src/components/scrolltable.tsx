import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Rx from 'rx';

function getColumnWidths(rowWidth, columnWidths) {
    var computation = columnWidths.reduce(function (agg, width) {
        if (typeof width === 'number') {
            agg.remainingWidth -= width;
            agg.customWidthColumns -= 1;
        }
        return agg;
    }, {
            autoSizeColumns: columnWidths.length,
            remainingWidth: rowWidth
        });

    var standardWidth = computation.remainingWidth / computation.autoSizeColumns;

    return columnWidths.map(function (width) {
        if (width) {
            return width;
        } else {
            return standardWidth;
        }
    });
}
/*
containerHeight={500}
            rowHeight={50}
            rowCount={10000}
            rowGetter={this.getRow}
            headerGetter={this.getHeader}
            columnWidths={this.state.columnWidths}    
*/
export interface IFixedScrollTable {
    columns?: any;
    rowGetter?: Function;
    rowCount?: number;
    rowHeight: number;
    containerHeight?: number;
    headerGetter?: Function;
    columnWidths?: number;
}

export class FixedScrollTable extends React.Component<IFixedScrollTable, any> {
    visibleIndices = [];

    containerNode: Element;
    headerContainerNode: Element;

    windowResizeSubscription: Rx.Disposable;
    visibleIndicesSubscription: Rx.Disposable;

    render() {
        // render the container first,
        // then render into that later with knowledge of the container
        var containerStyle = {
            position: 'relative',
            height: this.props.containerHeight,
            overflowX: 'hidden'
        };

        return (
            <div className="fixed-scroll-element-container">
    <div
                ref="HeaderContainer"
                className="fixed-scroll-element-header">
        </div>
    <div
                ref="Container"
                className="fixed-scroll-element"
                style={containerStyle}/>
                </div>
        );
    }

    deferredRender(columnWidths, containerWidth) {
        // this is the render for when the container has been rendered
        // and we know explicitly the container width
        var rows = this.state.visibleIndices.map((itemIndex, keyIndex) => {
            var top = itemIndex * this.props.rowHeight;
            return this.props.rowGetter(itemIndex, keyIndex, top, columnWidths, containerWidth);
        });

        return (
            <table
                style={{ height: this.props.rowCount * this.props.rowHeight }}>
    <tbody>
        {rows}
        </tbody>
                </table>
        );
    }

    componentDidUpdate() {
        // do the actual render when the component updates itself
        var containerWidth = (this.containerNode as any).offsetWidth;
        var computedColumnWidths = getColumnWidths(containerWidth, this.props.columnWidths);
        var output = this.deferredRender(computedColumnWidths, containerWidth);
        ReactDOM.render(output, this.containerNode);

        // render the header with the same constraints as the rows
        ReactDOM.render((
            <table>
    <thead>
        {this.props.headerGetter(computedColumnWidths, containerWidth) }
        </thead>
                </table>
        ), this.headerContainerNode);
    }

    componentDidMount() {
        let refs: any = this.refs;
        // get the nodes and store them, don't want to look them up every time
        this.containerNode = ReactDOM.findDOMNode(refs.Container);
        this.headerContainerNode = ReactDOM.findDOMNode(refs.HeaderContainer);

        // set up the table and the scroll observer
        this.setUpTable();

        // have the component rerender when the window resizes,
        // as the container width might have changed
        var windowResizeStream = Rx.Observable.fromEvent(window as any, 'resize').debounce(50);
        this.windowResizeSubscription = windowResizeStream.subscribe(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        // cleaning up time...
        this.windowResizeSubscription.dispose();
        this.visibleIndicesSubscription.dispose();
        ReactDOM.unmountComponentAtNode(this.containerNode);
        ReactDOM.unmountComponentAtNode(this.headerContainerNode);
    }

    setUpTable() {
        var containerHeight = this.props.containerHeight;
        var rowHeight = this.props.rowHeight;
        var rowCount = this.props.rowCount;

        var visibleRows = Math.ceil(containerHeight / rowHeight);

        var getScrollTop = () => {
            return this.containerNode.scrollTop;
        };

        var initialScrollSubject = new Rx.ReplaySubject(1);
        initialScrollSubject.onNext(getScrollTop());

        var scrollTopStream = initialScrollSubject.merge(
            Rx.Observable.fromEvent(this.containerNode, 'scroll').map(getScrollTop)
        );

        var firstVisibleRowStream = scrollTopStream.map(function(scrollTop: number) {
            return Math.floor(scrollTop / rowHeight);
        }).distinctUntilChanged();

        var visibleIndicesStream = firstVisibleRowStream.map(function(firstRow) {
            var visibleIndices = [];
            var lastRow = firstRow + visibleRows + 1;

            if (lastRow > rowCount) {
                firstRow -= lastRow - rowCount;
            }

            for (var i = 0; i <= visibleRows; i++) {
                visibleIndices.push(i + firstRow);
            }
            return visibleIndices;
        });

        this.visibleIndicesSubscription = visibleIndicesStream.subscribe((indices) => {
            this.setState({
                visibleIndices: indices
            });
        });
    }
}