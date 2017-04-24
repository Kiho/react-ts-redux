import * as React from 'react';
import { EntityType } from '../../model';
import { connect } from 'react-redux';
import { Form } from 'react-redux-form';
import { Button, Textfield, Selectfield, Grid, Cell, Spinner } from '../../components';
import { BaseForm, mapDispatchToProps, mapFormStateToProps } from '../base/base-form';
import { RTextfield } from '../components';
import Error from '../app/error';
import Message from '../app/message';

const entityType: EntityType = 'employee';
const ETextfield = props => <RTextfield {...props} entityType={entityType} />;

class EmployeeForm extends BaseForm {
    constructor(props) {
        super(props, entityType);

        this.handleChangeDepartment = this.handleChangeDepartment.bind(this);
        this.props.getList('department');
    }

    handleChangeDepartment(e) {
        this.setFieldValue('departmentId', e.target.value);
    }

    componentDidUpdate(prevProps) {
        this.execIfIdChanged(prevProps, () => this.props.getList('department'));
        super.componentDidUpdate(prevProps);
    }

    render() {
        const { item, departments, message, error, loading } = (this.props as any)
        const departmentId = item ? item.departmentId : 0;
        const departmentList = this.getArrayData(departments);
             
        return (
            <div className="mdl-cell mdl-cell--9-col mdl-cell--12-col-tablet mdl-cell--12-col-phone no-p-l">
                <Form model={entityType} component="form" className="form">
                    <h3>Employee Info</h3>
                    <Grid>
                        <Cell col={4}>
                            <ETextfield
                                model="id"
                                readOnly={true}
                                label="Employee ID"
                                floatingLabel={true} />
                        </Cell>
                        <Cell col={4}>
                            <ETextfield
                                model="name"
                                required={true}
                                label="Employee Name"
                                floatingLabel={true} />
                        </Cell>
                        <Cell col={4}>
                            <ETextfield
                                model="rate"
                                label="Pay Rate"
                                pattern="-?[0-9]*(\.[0-9]+)?"
                                error="Input is not a number!"
                                floatingLabel={true} />
                        </Cell>
                    </Grid>
                    <Grid>
                        <Cell col={5}>
                            <ETextfield
                                model="title"
                                label="Title"
                                floatingLabel={true} />
                        </Cell>
                        <Cell col={2}>
                            <ETextfield
                                readOnly={true}
                                model="departmentId"
                                label="Department"
                                floatingLabel={true} />
                        </Cell>
                        <Cell col={5}>
                            <Selectfield label="Department"
                                floatingLabel={true}
                                value={departmentId}
                                onChange={this.handleChangeDepartment}>
                                <option value=""></option>
                                {
                                    departmentList.map(function (department) {
                                        return <option key={department.id}
                                            value={department.id}>{department.name}</option>;
                                    })
                                }
                            </Selectfield>
                        </Cell>
                    </Grid>
                    {error && <Error text={message} />} 
                    {!error && <Message text={message} />} 
                    <Grid className="formfoot">
                        <Cell col={9}>
                            <Button raised={true} colored={true} onClick={this.submitRequest}>Submit</Button>
                            <Button raised={true} colored={false} onClick={this.goBack}>Back</Button>
                            <Button raised={true} accent={true} onClick={this.deleteItem}
                                disabled={loading || item.id < 1}>Delete</Button>
                        </Cell>
                        <Cell col={3}>
                            <Spinner isActive={loading} />
                        </Cell>
                    </Grid>
                </Form>
            </div>
        );
    }
}

export default connect(
    (state) => mapFormStateToProps(state, entityType, (props) => {
        props.departments = state.departments;
    }),
    mapDispatchToProps
)(EmployeeForm as any);

