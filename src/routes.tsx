import * as React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from "./containers/app";
import DemoText from "./containers/text";

import Department from "./containers/department/department";
import DepartmentForm from "./containers/department/department-form";

import Employee from "./containers/employee/employee";
import EmployeeForm from "./containers/employee/employee-form";

import NotFound from "./containers/not-found";
import About from "./containers/about";

function requireAsync(main) {    
    return function (location, next) {
        next(null, require('./components/' + main));
    }
}

function createRoutes() {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={DemoText} />
            <Route path="/home" component={DemoText} />
            <Route path="/department" component={Department} />
            <Route path="/department/:id" component={DepartmentForm} />
            <Route path="/employee" component={Employee} />
            <Route path="/employee/:id" component={EmployeeForm} />
            <Route path="/about" component={About} />
            <Route path="*" component={NotFound} />
        </Route>);
}

export default createRoutes
