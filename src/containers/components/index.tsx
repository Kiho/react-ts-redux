import * as React from 'react';
import { createFieldClass, controls } from 'react-redux-form';
import { Textfield, TextfieldProps } from '../../components';
import { EntityType } from '../../model';

interface IRTextfield extends TextfieldProps {
    entityType?: EntityType;
    model: string;
}

const WTextfield = createFieldClass({
    'Textfield': controls.text
});

export function RTextfield(props: IRTextfield) {
    const fieldProps = Object.assign({}, props);
    let {model, name} = props;
    if (fieldProps.entityType != undefined) {
        model = fieldProps.entityType + '.item.' + model;
        if (!name) {
            name = model;
        }
    }
    delete fieldProps.model;
    delete fieldProps.entityType;
    return (
        <WTextfield model={model}>
            <Textfield {...fieldProps} name={name} />
        </WTextfield>
    );
}