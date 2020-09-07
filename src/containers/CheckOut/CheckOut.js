import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';

class CheckOut extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckOutSummary
                    ingredients={this.props.ing}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing: state.ingredients
    };
}

export default connect(mapStateToProps)(CheckOut);