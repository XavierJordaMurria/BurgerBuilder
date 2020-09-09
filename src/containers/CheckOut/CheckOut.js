import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

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
        let summary = <Redirect to="/"/>

        if (this.props.ing) {
            const purchaseRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckOutSummary
                        ingredients={this.props.ing}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
}

export default connect(mapStateToProps)(CheckOut);