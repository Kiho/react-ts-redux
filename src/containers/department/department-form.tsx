import * as React from 'react';
import { EntityType } from '../../model';
import { connect } from 'react-redux';
import { Form, actions } from 'react-redux-form';
import { Button, Textfield, Grid, Cell, Spinner } from '../../components';
import { BaseForm, mapDispatchToProps, mapFormStateToProps } from '../base/base-form';
import { RTextfield } from '../components';
import EmployeeTable from '../employee/employee-table';
import Error from '../app/error';
import Message from '../app/message';

const entityType: EntityType = 'department';
const ETextfield = props => <RTextfield {...props} entityType={entityType} />;

class DepartmentForm extends BaseForm {
    constructor(props) {
        super(props, entityType);

        this.props.getList('employee');
    }

    getEmployees(props) {
        const { item, employees } = props;
        const list = this.getArrayData(employees);
        return list.filter(x => x.departmentId == item.id);
    }

    componentDidUpdate(prevProps) {
        this.execIfIdChanged(prevProps, () => this.props.getList('employee'));
        super.componentDidUpdate(prevProps);
    }

    render() {
        const { item } = this.props;
        const employeeList = this.getEmployees(this.props);
        const employeeCount = employeeList.length;

        return (
            <div className="mdl-cell mdl-cell--9-col mdl-cell--12-col-tablet mdl-cell--12-col-phone no-p-l">
                <Form model={entityType} component="form" className="form">
                    <h3>Department Info</h3>
                    <Grid>
                        <Cell col={4}>
                            <ETextfield
                                model="id"
                                label="Department#"
                                readOnly={true}
                                floatingLabel={true} />
                        </Cell>
                        <Cell col={8}>
                            <ETextfield
                                model="name"
                                label="Department Name"
                                required={true}
                                floatingLabel={true} />
                        </Cell>
                    </Grid>
                    <Grid>
                        <Cell col={6}>
                            <ETextfield
                                model="groupName"
                                label="Group Name"
                                floatingLabel={true} />
                        </Cell>
                        <Cell col={6}>
                            <Textfield
                                readOnly={true}
                                label="Employee Count"
                                value={employeeCount}
                                floatingLabel={true} />
                        </Cell>
                    </Grid> 
                    <Grid>
                        <Cell col={12}>
                            <Textfield
                                label="Search1"
                                expandable={true}
                                expandableIcon="search" />
                        </Cell>
                    </Grid>
                    {this.props.error && <Error text={this.props.message} />}
                    {!this.props.error && <Message text={this.props.message} />} 
                    <Grid className="formfoot">
                        <Cell col={9}>
                            <Button raised={true} colored={true} onClick={this.submitRequest}>Submit</Button>
                            <Button raised={true} colored={false} onClick={this.goBack}>Back</Button>
                            <Button raised={true} accent={true} onClick={this.deleteItem}
                                disabled={employeeCount > 0 || this.props.loading || item.id < 1}>Delete</Button>
                        </Cell>
                        <Cell col={3}>
                            <Spinner isActive={this.props.loading}/>
                        </Cell>
                    </Grid>
                </Form>

                <Grid>
                    <Cell col={12}>
                        <EmployeeTable
                            rows={employeeList}
                            entityType={entityType}
                            departmentList={[item]} />
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default connect(
    (state) => mapFormStateToProps(state, entityType, (props) => {
        props.employees = state.employees;
    }),
    mapDispatchToProps
)(DepartmentForm as any);

