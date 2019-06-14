/** @format */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import uuid from 'uuid';
import moment from 'moment';

/**
 * Internal dependencies
 */
import {
  setFilterText,
  setFilterCurrency,
  setFilterEndDate,
  setFilterStartDate
} from '../../state/filters/actions';

/**
 * Style dependencies
 */
import './style.scss';

export class ExpenseListFilters extends Component {
  static propTypes = {
    filters: PropTypes.shape({
      filterText: PropTypes.string,
      filterCurrency: PropTypes.string,
      filterStartDate: PropTypes.instanceOf(moment),
      filterEndDate: PropTypes.instanceOf(moment)
    }).isRequired,
    setText: PropTypes.func.isRequired,
    setEndDate: PropTypes.func.isRequired,
    setStartDate: PropTypes.func.isRequired,
    setCurrency: PropTypes.func.isRequired
  };

  state = {
    calenderFocusedInput: null
  };

  onDatesChange = ({ startDate, endDate }) => {
    const { setStartDate, setEndDate } = this.props;

    setStartDate(startDate);
    setEndDate(endDate);
  };

  onFilterTextChange = e => {
    const { setText } = this.props;
    setText(e.target.value);
  };

  onFilterCurrencyChange = e => {
    const { setCurrency } = this.props;
    setCurrency(e.target.value);
  };

  onFocusChange = focusedInput => {
    this.setState({ calenderFocusedInput: focusedInput });
  };

  render() {
    const { filters } = this.props;
    const {
      filterText,
      filterCurrency,
      filterStartDate,
      filterEndDate
    } = filters;

    const { calenderFocusedInput } = this.state;

    return (
      <div className="expense-list-filters">
        <input
          type="text"
          value={filterText}
          onChange={this.onFilterTextChange}
          className="expense-list-filters__search-text"
          placeholder="Search Expenses"
        />
        <select
          value={filterCurrency}
          onChange={this.onFilterCurrencyChange}
          className="expense-list-filters__select-currency"
        >
          <option value="">Currencies</option>
          <option value="DKK">DKK</option>
          <option value="EUR">€</option>
          <option value="GBP">£</option>
        </select>
        <DateRangePicker
          startDate={filterStartDate}
          startDateId={uuid()}
          endDate={filterEndDate}
          endDateId={uuid()}
          onDatesChange={this.onDatesChange}
          focusedInput={calenderFocusedInput}
          onFocusChange={this.onFocusChange}
          showClearDates
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    filters: state.filters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setText: text => dispatch(setFilterText(text)),
    setCurrency: currency => dispatch(setFilterCurrency(currency)),
    setStartDate: startDate => dispatch(setFilterStartDate(startDate)),
    setEndDate: endDate => dispatch(setFilterEndDate(endDate))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseListFilters);
