// import session from './session';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import crudFor from './crud';
import listFor from './get-list';

import * as rrf from 'react-redux-form';
// import { modelReducer, formReducer } from 'react-redux-form';

const rootReducer = combineReducers({
    // session,
    departments: listFor('department'),
    department: (rrf as any).modeled(crudFor('department'), 'department'),
    employees: listFor('employee'),
    employee: (rrf as any).modeled(crudFor('employee'), 'employee'),
    routing: routerReducer,
});

export default rootReducer;
