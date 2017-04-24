import * as React from 'react';
import { BaseTable, cellIdLink, headerRow } from '../base/base-table';
import { FlexTable, FlexColumn, SortIndicator, SortDirection } from 'react-virtualized';
import { EntityType } from '../../model';

const entityType: EntityType = 'department';
const styles = require('../base/flex-table.css');

class DepartmentTable extends BaseTable {
    constructor(props, context) {
        super(props, context, entityType)

        this.state = {
            disableHeader: false,
            headerHeight: 30,
            height: 270,
            hideIndexRow: false,
            overscanRowCount: 10,
            rowHeight: 40,
            rowCount: 1000,
            scrollToIndex: undefined,
            sortBy: 'index',
            sortDirection: SortDirection.ASC,
            useDynamicRowHeight: false
        }
    }

    render() {
        const {
            disableHeader,
            headerHeight,
            height,
            hideIndexRow,
            overscanRowCount,
            rowHeight,
            rowCount,
            scrollToIndex,
            sortBy,
            sortDirection,
            useDynamicRowHeight
        } = this.state;

        let { rows } = this.props;
        let sortedList = this._sortData(rows, sortBy, sortDirection);

        return (
            <FlexTable
                width={800}
                height={500}
                headerHeight={45}
                rowHeight={45}
                headerClassName={styles.headerColumn}
                noRowsRenderer={this._noRowsRenderer}
                rowClassName={this._rowClassName}
                rowCount={sortedList ? sortedList.length : 0}
                rowGetter={({index}) => sortedList[index]}
                sort={this._sort}
                sortBy={sortBy}
                sortDirection={sortDirection}
                >
                <FlexColumn
                    width={100}
                    label='Department#'
                    dataKey='id'
                    cellRenderer={(data) => cellIdLink(data, entityType)}
                    />
                <FlexColumn
                    dataKey='name'
                    headerRenderer={(data) => headerRow(data, "Department Name")}
                    width={250}
                    />
                <FlexColumn
                    width={250}
                    headerRenderer={(data) => headerRow(data, "Group Name")}
                    dataKey='groupName'
                    />
            </FlexTable>);
    }
};

export default DepartmentTable;