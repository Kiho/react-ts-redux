import * as React from 'react';
import { EntityType } from '../../model';
import { hashHistory } from 'react-router';
import { Button, Textfield, Grid, Cell, Spinner, Card } from '../../components';
import DepartmentTable from './department-table';
import { connect } from 'react-redux';
import { getList} from '../../actions/server';
import { getArrayData } from '../../utils/utils';

const entityType: EntityType = 'department';

function mapStateToProps(state) {
    return {
        departments: state.departments
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getList: () => dispatch(getList(entityType))
    };
}

class DepartmentList extends React.Component<any, any>{
    componentDidMount() {
        this.props.getList();
    }

    render() {
        const { departments } = this.props;
        const rows = getArrayData(departments);
        const isLoading = departments && departments.isLoading;
        return (
            <div>
                <Card shadow={1} title="Department Info">
                    <Grid>
                        <Cell col={12}>
                            <DepartmentTable
                                rows={rows}
                                entityType={entityType} />
                        </Cell>
                    </Grid>
                </Card>
                <Grid>
                    <Cell col={4}>
                        <Button raised={true} colored={true} href="#/department/0">New Department</Button>
                    </Cell>
                    <Cell col={8}>
                        <Spinner isActive={isLoading} />
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DepartmentList);
