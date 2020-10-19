import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from './../../hoc/AxiosOrders';
import Order from '../../components/Order/Order';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner></Spinner>;

        if (!this.props.loading && this.props.orders.length > 0) {
            orders = this.props.orders.map(o => (
                <Order
                    key={o.id}
                    ingredients={o.ingredients}
                    price={o.price} />
            ));
        }
        else {
            orders = (<p>No orders received!!</p>)
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapToDispatch = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};
export default connect(mapStateToProps, mapToDispatch)(WithErrorHandler(Orders, axios));