import * as React from 'react';
import { hashHistory } from 'react-router';
import { Button } from '../components';

class NotFound extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <main className="">
                <h3>Page not found. Are you lost?</h3>

                <Button raised={true} colored={false} onClick={hashHistory.goBack}>Go back</Button>
            </main>);
    }
}

export default NotFound;
