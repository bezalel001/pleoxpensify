/** @format */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

/**
 * Internal dependencies
 */
import ExpenseListFilters from '../expense-list-filters';
import ExpenseList from '../expense-list';
import getVisibleExpenses from '../../selectors';
import {
  fetchExpenses,
  setTotalNumberOfPages,
  setCurrrentPage
} from '../../state/expenses/actions';
import { LIMIT } from '../../utils/constants';
import Pagination from '../pagination';
import ExpenseDetail from '../expense-detail';

class ExpensesHome extends Component {
  componentDidUpdate(preveProps) {
    const { expenses, dispatch } = this.props;
    const { totalExpenses } = expenses;

    if (totalExpenses !== preveProps.expenses.totalExpenses) {
      dispatch(setTotalNumberOfPages(Math.ceil(totalExpenses / LIMIT)));
    }
  }

  fetchExpenses = () => {
    const { expenses, dispatch } = this.props;
    const { page } = expenses;
    dispatch(fetchExpenses({ limit: LIMIT, page: page || 1 }));
  };

  onPaginationClick = async direction => {
    const { expenses, dispatch, history } = this.props;
    const { page } = expenses;
    const nextPage = direction === 'next' ? page + 1 : page - 1;
    await dispatch(setCurrrentPage(nextPage));
    history.push('/');
    this.fetchExpenses();
  };

  render() {
    const { expenses } = this.props;
    const { page, totalPages } = expenses;
    const data = expenses.expenses;

    return (
      <Container className="expenses-home">
        <Row>
          <Col className="expenses-home__expenses">
            <div className="expenses-home__expense-list-filters">
              <ExpenseListFilters />
            </div>
            <div className="expenses-home__expense-list">
              <ExpenseList expenses={data} />
            </div>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPaginationClick={this.onPaginationClick}
            />
          </Col>
          <Col className="expenses-home__expense-details">
            <h2>Details</h2>
            {<Route path="/expenses/:id" component={ExpenseDetail} />}
          </Col>
        </Row>
      </Container>
    );
  }
}

ExpensesHome.propTypes = {
  expenses: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool,
    page: PropTypes.number,
    refresh: PropTypes.bool,
    totalExpenses: PropTypes.number,
    totalPages: PropTypes.number,
    didInvalidate: PropTypes.bool,
    error: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => {
  const expenses = getVisibleExpenses(state.expenses, state.filters);
  return {
    expenses: { ...state.expenses, expenses }
  };
};

export default connect(mapStateToProps)(ExpensesHome);
