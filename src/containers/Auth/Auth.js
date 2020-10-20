import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignedup: true
    };

    componentDidMount() {
        // Need to check if we are trying to redirect to a checkout event though we are 
        // no building a burguer.
        if (!this.props.buildingBurguer && this.props.authRedirectPath !== "/") {
            this.props.onSetRedirectPath();
        }
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignedup: !prevState.isSignedup
            };
        });
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });

        this.setState({ controls: updatedControls });

    };

    isFormValid = () => {
        const valid =  Object.values(this.state.controls).reduce((a,e) => {
           return  a = a && e.valid
        }, true);

        return valid;
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignedup);
    };

    render() {
        const formElementsAray = [];
        for (let key in this.state.controls) {
            formElementsAray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsAray.map(el => (
            <Input
                key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                onChange={(event) => this.inputChangedHandler(event, el.id)}
            />
        ));

        if (this.props.loading) {
            form = <Spinner></Spinner>
        }

        let errorMsg = null;

        if (this.props.error){
            errorMsg = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;

        if (this.props.isAuthenticate) {
            authRedirect = <Redirect to={this.props.authRedirectPath}></Redirect>
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMsg}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" disabled={!this.isFormValid()}>Submit</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignedup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticate: state.auth.token !== null,
        buildingBurguer: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispach => {
    return {
        onAuth: (email, password, isSignUp) => dispach(actions.auth(email, password, isSignUp)),
        onSetRedirectPath: () => dispatchEvent(actions.setAuthRedirectPath("/"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);