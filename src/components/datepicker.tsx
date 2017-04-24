import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import Pikaday = require("pikaday");
import * as moment from 'moment';

import { Textfield } from './textfield';
import { FieldProps } from 'mdl-react';

export interface PikadayProps extends FieldProps {
    isActive?: boolean;
    value?: Date;
    valueLink?: any;
    onChange?: Function;
}

export interface PikadayState extends PikadayProps {
    pikaday?: Pikaday;
}

function copyTo(source, target, excludes) {
    for (var attrname in source) {
        if (!excludes.hasOwnProperty(attrname)) {
            target[attrname] = source[attrname];
        }
    }
    return target;
}

export class DatePicker extends React.Component<PikadayProps, PikadayState> {
    static propTypes = {
        value: React.PropTypes.instanceOf(Date),
        onChange: React.PropTypes.func,
        valueLink: React.PropTypes.shape({
            value: React.PropTypes.instanceOf(Date),
            requestChange: React.PropTypes.func.isRequired
        })
        //    // see Pikaday options at https://github.com/dbushell/Pikaday#configuration
        //    // except `onSelect` and `field`
    }

    constructor(props) {
        super(props);
    }

    _picker: Pikaday;

    _getValueLink(props) {
        return props.valueLink || {
            value: props.value,
            requestChange: props.onChange
        };
    }

    _setDateIfChanged(newDate, prevDate?) {
        var newTime = newDate ? newDate.getTime() : null;
        var prevTime = prevDate ? prevDate.getTime() : null;

        if (newTime !== prevTime) {
            if (isNaN(newTime)) {
                // workaround for pikaday not clearing value when date set to false
                let el: any = ReactDOM.findDOMNode(this);
                el.value = '';
            }
            this._picker.setDate(newDate, true); // not trigger onSelect
        }
    }

    _setupPikaday() {
        let el = ReactDOM.findDOMNode(this) as HTMLElement;
        let { requestChange } = this._getValueLink(this.props);
        el = el.querySelector('input') as HTMLElement;
        let options: PikadayOptions = {
            theme: 'material-lite',
            field: el,
            onSelect: requestChange
        };
        copyTo(this.props, options, DatePicker.propTypes);
        this._picker = new Pikaday(options);
    }

    componentDidMount() {
        let { value } = this._getValueLink(this.props);
        this._setupPikaday();
        this._setDateIfChanged(value);
    }

    componentWillReceiveProps(nextProps) {
        let newDate = this._getValueLink(nextProps).value;
        let lastDate = this._getValueLink(this.props).value;

        this._setDateIfChanged(newDate, lastDate);
    }

    render() {
        const {format, value } = this.props;
        let formatted = moment(value).format(format);
        return (
            <Textfield
                {...this.props}
                value={formatted}
                />
        );
    }
}