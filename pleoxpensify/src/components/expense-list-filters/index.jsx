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

class ExpenseListFilters extends Component {
  static propTypes = {
    filters: PropTypes.shape({
      filterText: PropTypes.string,
      filterCurrency: PropTypes.string,
      filterStartDate: PropTypes.instanceOf(moment),
      filterEndDate: PropTypes.instanceOf(moment)
    }).isRequired,
    dispatch: PropTypes.func.isRequired
  };

  state = {
    calenderFocusedInput: null
  };

  onDatesChange = ({ startDate, endDate }) => {
    const { dispatch } = this.props;

    dispatch(setFilterStartDate(startDate));
    dispatch(setFilterEndDate(endDate));
  };

  render() {
    const { filters } = this.props;
    const {
      filterText,
      filterCurrency,
      filterStartDate,
      filterEndDate
    } = filters;
    const { dispatch } = this.props;
    const { calenderFocusedInput } = this.state;

    return (
      <div className="expense-list-filters">
        <input
          type="text"
          value={filterText}
          onChange={e => {
            dispatch(setFilterText(e.target.value));
          }}
          className="expense-list-filters__search-text"
          placeholder="Search Expenses"
        />
        <select
          value={filterCurrency}
          onChange={e => {
            dispatch(setFilterCurrency(e.target.value));
          }}
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
          onFocusChange={focusedInput =>
            this.setState({ calenderFocusedInput: focusedInput })
          }
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
export default connect(mapStateToProps)(ExpenseListFilters);
