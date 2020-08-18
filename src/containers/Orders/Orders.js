import React, { Component } from 'react';
import axios from './../../hoc/AxiosOrders';
import Order from '../../components/Order/Order';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }

    componentDidMount() {
        axios.get("/orders.json")
            .then((res) => {
                const fetchedOrder = [];

                for (let key in res.data) {
                    fetchedOrder.push({
                            id: key, 
                            ...res.data[key]
                        });
                }
                this.setState({ loading: false, orders:fetchedOrder });
            })
            .catch((error) => {
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <div>
                <Order></Order>
                <Order></Order>
            </div>
        );
    }
}

export default WithErrorHandler(Orders, axios);