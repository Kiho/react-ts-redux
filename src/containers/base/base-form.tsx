import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Error from '../app/error'
import { hashHistory } from 'react-router';
import { EntityType } from '../../model';
import { showDialog } from '../../components';
import { getById, post, put, remove, getList, addNew, setFieldValue } from '../../actions/server';
import { getArrayData } from '../../utils/utils';

interface IFormProps {
    entityType: EntityType;
    item: any;
    loading: boolean;
    error: boolean;
    message: string;
    getList: (entity: EntityType) => void;
    getById: (entity: EntityType, id: string) => void;
    remove: (entity: EntityType, id: string, callback: (path?) => void) => void;
    post: (entity: EntityType, data, callback: (path?) => void) => void;
    put: (entity: EntityType, data, callback: (path?) => void) => void;
    addNew: (entity: EntityType) => void;
    setFieldValue: (entity: EntityType, modified) => void;
    params: { id: string };
    dispatch: any;
}

export function mapFormStateToProps(state, entityType, moreProps: (props) => void) {
    const props: any = {
        item: state[entityType].item,
        loading: state[entityType].isLoading,
        error: state[entityType].hasError,
        message: state[entityType].message,        
    };
    moreProps(props);
    return props;
}

export function mapDispatchToProps(dispatch) {
    return {
        getById: (path, id) => dispatch(getById(path, id)),
        post: (path, data, callback) => dispatch(post(path, data, callback)),
        put: (path, data, callback) => dispatch(put(path, data, callback)),
        remove: (path, id, callback) => dispatch(remove(path, id, callback)),
        getList: (path) => dispatch(getList(path)),
        addNew: (path) => dispatch(addNew(path)),
        setFieldValue: (path, modified) => dispatch(setFieldValue(path, modified)),
        dispatch
    };
}

export abstract class BaseForm extends React.Component<IFormProps, any> {

    // object reference to hold form object
    _form: HTMLFormElement;

    constructor(props: IFormProps, public entityType: EntityType) {
        super(props);

        this.submitRequest = this.submitRequest.bind(this);
        this.goBack = this.goBack.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.execIfIdChanged = this.execIfIdChanged.bind(this);
        this.setFieldValue = this.setFieldValue.bind(this);
    }

    getById(id) {
        if (id < 1) {
            this.props.addNew(this.entityType);
        }
        else {
            this.props.getById(this.entityType, id);
        }
    }

    setFieldValue(key, value) {
        const item = {};
        item[key] = value;
        this.props.setFieldValue(this.entityType, item);
    }

    componentDidMount() {
        this._form = ReactDOM.findDOMNode(this).querySelector('form') as HTMLFormElement;
        this.getById(this.props.params.id);        
    }

    componentDidUpdate(prevProps) {
        this.execIfIdChanged(prevProps, this.getById);
    }

    execIfIdChanged(prevProps, func: (id) => void) {
        const id = this.props.params.id;
        if (prevProps.params.id != id) {
            func(id);
        }
    }

    getArrayData(list) {
        return getArrayData(list);
    }

    validateForm(form) {
        // check validity of all inputs
        const isValid = form.checkValidity();
        if (!isValid) {
            for (let i = 0; i < form.length; i++) {
                if (form[i].field) {
                    // need to call checkValidity method of all MDL input fields to refresh visual input state
                    form[i].field.checkValidity();
                }
            }
        }
        return isValid;
    }

    // push object changes to server
    submitRequest(e) {
        e.preventDefault();
        const {item} = this.props;
        if (!this.validateForm(this._form)) {
            console.log("Form is not valid", item);
            return;
        }
        console.log("Here's the stuff you put in", item);
        // set callback to perform action after success of posting
        const callback = this.afterSubmit;
        if (item.id > 0) {
            this.props.put(this.entityType, item, callback);
        }
        else {
            this.props.post(this.entityType, item, callback);
        }
    }

    afterSubmit(path) {
        // in this case we show dialog.
        showDialog('Saved Successfully!', () => hashHistory.push('/' + path));        
    }

    // go back to previous page with recact router call
    goBack(e) {
        e.preventDefault();
        hashHistory.goBack();
    }

    deleteItem(e) {
        e.preventDefault();
        const {item} = this.props;
        this.props.remove(this.entityType, item.id, this.afterDelete);
    }

    afterDelete(path) {
        // in this case we go back to list page
        hashHistory.push('/' + path);
    }
}
