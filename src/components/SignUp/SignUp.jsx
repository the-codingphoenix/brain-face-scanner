/* eslint-disable react/prop-types */
import React from 'react';
import './SignUp.css';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitSignUp = (e) => {
        e.preventDefault(); 
        
        fetch('https://peaceful-reef-16481-bb62933f00ed.herokuapp.com/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home');
            }
        })
        .catch(error => console.log('Error during signup:', error));
    }
    render() {
        return (
            <article className="ba br2 mv4 w-90 w-50-m w-50-l mw6 card center">
                <main className="pa4">
                    <form className="measure" onSubmit={this.onSubmitSignUp}>
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0 h1">Sign Up</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                    className="ma2 pa2 input-reset w-100" 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    autoComplete="name"
                                    onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="ma2 pa2 input-reset w-100" 
                                    type="email" 
                                    name="email-address" 
                                    id="email-address" 
                                    autoComplete="email"
                                    onChange={this.onEmailChange}    
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="ma2 pa2 input-reset w-100" 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    autoComplete="new-password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                                className="b ph3 pv2 input-reset grow pointer f5 dib submit" type="submit" 
                                value="Sign Up"
                            />
                        </div>
                        <div className="lh-copy mt4">
                            <p 
                                onClick={() => this.props.onRouteChange('signin')} 
                                className="ma2 f6 link white db grow pointer signup"
                            >
                                Sign In
                            </p>
                        </div>
                        {this.state.error && <div className="error">{this.state.error}</div>}
                    </form>
                </main>
            </article>
        );
    }
}

export default SignUp;
