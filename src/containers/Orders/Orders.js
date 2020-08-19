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
                console.log(res.data);
                const fetchedOrder = [];

                for (let key in res.data) {
                    fetchedOrder.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchedOrder });
            })
            .catch((error) => {
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(o => (
                    <Order 
                        key={o.id}
                        ingredients={o.ingredients}
                        price={o.price} />
                ))}
            </div>
        );
    }
}

export default WithErrorHandler(Orders, axios);