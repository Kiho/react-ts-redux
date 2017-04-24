import * as React from 'react';
import * as accounting from 'accounting';
import { FlexTable, FlexColumn, SortIndicator, SortDirection } from 'react-virtualized';
import { EntityType } from '../../model';
import * as shallowCompare from "react-addons-shallow-compare";
import { Link, hashHistory } from 'react-router';

const styles = require('./flex-table.css');

export function headerRow(data, text: string) {
    const { dataKey, sortBy, sortDirection } = data;
    return (
        <div>
            <div>{text}{sortBy === dataKey &&
                <SortIndicator sortDirection={sortDirection} />
            }</div>
        </div>);
}

export function cellMoneyFormat(val) {
    return (<div style={{ textAlign: 'right' }}>{accounting.formatMoney(val)}</div>);
}

export const cellIdLink = ({rowData}, entityType) => <Link to={'/' + entityType + '/' + rowData.id} style={{ fontSize: 20 }} >{rowData.id}</Link>;

export abstract class BaseTable extends React.Component<any, any>{
    constructor(props, context, public entityType: EntityType) {
        super(props, context)

        this._getRowHeight = this._getRowHeight.bind(this)
        this._headerRenderer = this._headerRenderer.bind(this)
        this._noRowsRenderer = this._noRowsRenderer.bind(this)
        this._onRowCountChange = this._onRowCountChange.bind(this)
        this._onScrollToRowChange = this._onScrollToRowChange.bind(this)
        this._sort = this._sort.bind(this)
    }

    _sortData(rows, colName, direction) {
        let compare = (a, b) => {
            if (a != null && b == null) return 1;
            if (a == null && b != null) return -1;
            if (a == null && b == null) return 0;
            return a > b ? 1 : -1;
        }
        let comparer = (a, b) => {
            if (direction === SortDirection.ASC) {
                return compare(a[colName], b[colName]);
            } else if (direction === SortDirection.DESC) {
                return compare(a[colName], b[colName]) * -1;
            }
        }
        return rows.sort(comparer);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState)
    }

    _getDatum(rows, index) {
        return rows.get(index % rows.size)
    }

    _getRowHeight({ index }) {
        const { rows } = this.props
        return this._getDatum(rows, index).size
    }

    _headerRenderer({
        columnData,
        dataKey,
        disableSort,
        label,
        sortBy,
        sortDirection
    }) {
        return (
            <div>
                Full Name
                {sortBy === dataKey &&
                    <SortIndicator sortDirection={sortDirection} />
                }
            </div>
        )
    }

    _isSortEnabled() {
        const { rows } = this.props
        const { rowCount } = this.state

        return rowCount <= rows.size
    }

    _noRowsRenderer() {
        return (
            <div className={styles.noRows}>
                No rows
            </div>
        )
    }

    _onRowCountChange(event) {
        const rowCount = parseInt(event.target.value, 10) || 0

        this.setState({ rowCount })
    }

    _onScrollToRowChange(event) {
        const { rowCount } = this.state
        let scrollToIndex = Math.min(rowCount - 1, parseInt(event.target.value, 10))

        if (isNaN(scrollToIndex)) {
            scrollToIndex = undefined
        }

        this.setState({ scrollToIndex })
    }

    _rowClassName({ index }) {
        if (index < 0) {
            return styles.headerRow
        } else {
            return index % 2 === 0 ? styles.evenRow : styles.oddRow
        }
    }

    _sort({ sortBy, sortDirection }) {
        this.setState({ sortBy, sortDirection })
    }

    _updateUseDynamicRowHeight(value) {
        this.setState({
            useDynamicRowHeight: value
        })
    }
};
