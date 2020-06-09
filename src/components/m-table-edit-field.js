import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker, DateTimePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import rxMtUpdateField from "../utils/database/rxMtUpdateField"

class MTableEditField extends React.Component {
  getProps() {
    const { columnDef, rowData, onRowDataChange, ...props } = this.props;
    return props;
  }

  renderLookupField() {
    return (
        <Select
          {...this.getProps()}
          value={this.props.value === undefined ? '' : this.props.value}
          onChange={event => {
              this.props.onChange(event.target.value)
              rxMtUpdateField({
                  name: this.props.columnDef.field,
                  value: event.target.value
              }).then()
          }}
          style={{
            fontSize: 13,
          }}
          SelectDisplayProps={{ 'aria-label': this.props.columnDef.title }}
        >
          {Object.keys(this.props.columnDef.lookup).map(key => (
            <MenuItem key={key} value={key}>{this.props.columnDef.lookup[key]}</MenuItem>)
          )}
        </Select>
    );
  }

  renderBooleanField() {
    return (
      <Checkbox
        {...this.getProps()}
        value={String(this.props.value)}
        checked={Boolean(this.props.value)}
        onChange={event => {
            this.props.onChange(event.target.checked)
            rxMtUpdateField({
                name: this.props.columnDef.field,
                value: event.target.checked
            }).then()
        }}
        style={{
          paddingLeft: 0,
          paddingTop: 0,
          paddingBottom: 0
        }}
        inputProps={{
          'aria-label': this.props.columnDef.title
        }}
      />
    );
  }

  renderDateField() {
    return (
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        locale={this.props.dateTimePickerLocalization}
      >
        <DatePicker
          {...this.getProps()}
          format="dd.MM.yyyy"
          value={this.props.value || null}
          onChange={value => {
              this.props.onChange(value)
              rxMtUpdateField({
                  name: this.props.columnDef.field,
                  value
              }).then()
          }}
          clearable
          InputProps={{
            style: {
              fontSize: 13
            }
          }}
          inputProps={{
            'aria-label': `${this.props.columnDef.title}: press space to edit`
          }}
        />
      </MuiPickersUtilsProvider>
    );
  }
  renderTimeField() {
    return (
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        locale={this.props.dateTimePickerLocalization}
      >
        <TimePicker
          {...this.getProps()}
          format="HH:mm:ss"
          value={this.props.value || null}
          onChange={value => {
              this.props.onChange(value)
              rxMtUpdateField({
                  name: this.props.columnDef.field,
                  value
              }).then()
          }}
          clearable
          InputProps={{
            style: {
              fontSize: 13
            },
            inputProps: {
              'aria-label': `${this.props.columnDef.title}: press space to edit`
            }
          }}
        />
      </MuiPickersUtilsProvider>
    );
  }

  renderDateTimeField() {
    return (
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        locale={this.props.dateTimePickerLocalization}
      >
        <DateTimePicker
          {...this.getProps()}
          format="dd.MM.yyyy HH:mm:ss"
          value={this.props.value || null}
          onChange={value => {
              this.props.onChange(value)
              rxMtUpdateField({
                  name: this.props.columnDef.field,
                  value
              }).then()
          }}
          clearable
          InputProps={{
            style: {
              fontSize: 13
            },
            inputProps:{
            'aria-label': `${this.props.columnDef.title}: press space to edit`
          }
          }}

        />
      </MuiPickersUtilsProvider>
    );
  }

  renderTextField() {
    return (
      <TextField
        {...this.getProps()}
        style={this.props.columnDef.type === 'numeric' ? { float: 'right' } : {}}
        type={this.props.columnDef.type === 'numeric' ? 'number' : 'text'}
        placeholder={this.props.columnDef.title}
        value={this.props.value === undefined ? '' : this.props.value}
        onChange={event => {
            this.props.onChange(event.target.value)
            rxMtUpdateField({
                name: this.props.columnDef.field,
                value: event.target.value
            }).then()
        }}
        InputProps={{
          style: {
            fontSize: 13,
          },
          inputProps: {
            'aria-label': this.props.columnDef.title
          }
        }}
      />
    );
  }

  renderCurrencyField() {
    return (
      <TextField
        {...this.getProps()}
        placeholder={this.props.columnDef.title}
        value={this.props.value === undefined ? '' : this.props.value}
        onChange={event => {
            this.props.onChange(event.target.value)
            rxMtUpdateField({
                name: this.props.columnDef.field,
                value: event.target.value
            }).then()
        }}
        inputProps={{
          style: {
            fontSize: 13,
            textAlign: 'right',
            'aria-label': this.props.columnDef.title
          }
        }}
      />
    );
  }

  render() {
    let component;

    if (this.props.columnDef.lookup) {
      component = this.renderLookupField();
    }
    else if (this.props.columnDef.type === "boolean") {
      component = this.renderBooleanField();
    }
    else if (this.props.columnDef.type === "date") {
      component = this.renderDateField();
    }
    else if (this.props.columnDef.type === "time") {
      component = this.renderTimeField();
    }
    else if (this.props.columnDef.type === "datetime") {
      component = this.renderDateTimeField();
    }
    else if (this.props.columnDef.type === "currency") {
      component = this.renderCurrencyField();
    }
    else {
      component = this.renderTextField();
    }

    return component;

  }
}

MTableEditField.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  columnDef: PropTypes.object.isRequired,
  dateTimePickerLocalization: PropTypes.object
};

export default MTableEditField;
