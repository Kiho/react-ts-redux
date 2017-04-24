import * as React from 'react';
import * as accounting from 'accounting';
import { BaseTable, cellIdLink, cellMoneyFormat } from '../base/base-table';
import { FlexTable, FlexColumn, SortIndicator, SortDirection } from 'react-virtualized';
import { EntityType } from '../../model';

const entityType: EntityType = 'employee';
const styles = require('../base/flex-table.css');

function cellDepartment(id, list) {
    const department = list.find(x => x.id == id);
    return (<div>{ department ? department.name : '' }</div>);
}

class EmployeeTable extends BaseTable{
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

        let { rows, departmentList } = this.props;
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
                    label='Employee#'
                    dataKey='id'
                    cellRenderer={(data) => cellIdLink(data, entityType)}
                    />
                <FlexColumn
                    dataKey='name'
                    label='Employee Name'
                    width={150}
                    />
                <FlexColumn
                    dataKey='title'
                    label='Title'
                    width={180}
                    />
                <FlexColumn
                    width={100}
                    label='Department'
                    dataKey='departmentId'    
                    cellRenderer={({rowData}) => cellDepartment(rowData.departmentId, departmentList)}                
                    />
                <FlexColumn
                    width={100}
                    label='Pay Rate'
                    dataKey='rate'
                    cellRenderer={({rowData}) => cellMoneyFormat(rowData.rate)}
                    />
            </FlexTable>)
    }
};

export default EmployeeTable;