import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../hoc/AxiosOrders';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Your ZipCode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4
                    
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest', displayValue: 'Fastest'
                        },
                        {
                            value: 'default', displayValue: 'Default'
                        },
                    ]
                },
                value: 'default',
                validation: {},
                valid: true,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};

        for (let inputIdentifier in this.state.orderForm) {
            formData[inputIdentifier] = this.state.orderForm[inputIdentifier].value;
        }
        const order = {
            ingredients: this.props.ing,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedOrderEl = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedOrderEl.value = event.target.value;
        updatedOrderEl.valid = this.checkValidity(updatedOrderEl.value, updatedOrderEl.validation);
        updatedOrderEl.touched = true;
        updatedOrderForm[inputIdentifier] = updatedOrderEl;

        let formIsValid = true;

        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }



        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
    }

    checkValidity = (value, rules) => { 
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }

    render() {

        const formElementsAray = [];
        for (let key in this.state.orderForm) {
            formElementsAray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsAray.map(el => (
                    <Input
                        key={el.id}
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        invalid={!el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}
                        onChange={(event) => this.inputChangedHandler(event, el.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing: state.ingredients,
        price: state.totalPrice
    };
}

export default connect(mapStateToProps)(ContactData);