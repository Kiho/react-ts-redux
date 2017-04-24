import * as React from 'react';
import { EntityType } from '../../model';
import { hashHistory } from 'react-router';
import { Button, Textfield, Grid, Cell, Spinner, Card } from '../../components';
import EmployeeTable from './employee-table';
import { connect } from 'react-redux';
import { getList } from '../../actions/server';
import { getArrayData } from '../../utils/utils';

const entityType: EntityType = 'employee';

function mapStateToProps(state) {
    return {
        employees: state.employees,
        departments: state.departments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getList: (path) => dispatch(getList(path))
    };
}

class EmployeeList extends React.Component<any, any>{
    constructor(props, context) {
        super(props, context);

        this.props.getList('department'); 
    }

    componentDidMount() {
        this.props.getList(entityType);
    }

    render() {
        const { employees, departments } = this.props;
        const rows = getArrayData(employees);
        const isLoading = employees && employees.isLoading;
        const departmentList = getArrayData(departments);

        return (
            <div>
                <Card shadow={1} title="Employee Info">
                    <Grid>
                        <Cell col={12}>
                            <EmployeeTable
                                rows={rows}
                                entityType={entityType}
                                departmentList={departmentList}/>
                        </Cell>
                    </Grid>
                </Card>
                <Grid>
                    <Cell col={4}>
                        <Button raised={true} colored={true} href="#/employee/0">New Employee</Button>
                    </Cell>
                    <Cell col={8}>
                        <Spinner isActive={isLoading} />
                    </Cell>
                </Grid> 
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeList);