/* eslint-disable react/prop-types */
import React from 'react';
import './SignIn.css';


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }
    

    onSubmitSignIn = (e) => {
        e.preventDefault(); 
        
        fetch('https://peaceful-reef-16481-bb62933f00ed.herokuapp.com/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            } else {
                this.setState({ error: 'Invalid credentials. Please try again.' });
            }
        })
        .catch(error => console.log('Error during signup:', error));
    }
    
    render() {
        return (
            <article className="ba br2 mv4 w-90 w-50-m w-50-l mw6 card center">
                 <main className="pa4">
                    <form className="measure" onSubmit={this.onSubmitSignIn}> 
                        <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0 h1">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="ma2 pa2 input-reset w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" 
                                    autoComplete="email-address"
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
                                    autoComplete="current-password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                            className="b ph3 pv2 input-reset grow pointer f5 dib submit" type="submit" value="Sign in"/>
                        </div>
                        <div className="lh-copy mt4">
                            <p 
                            onClick={() => this.props.onRouteChange('signup')}
                            className="f6 link white db grow pointer signup">Sign Up</p>
                        </div>
                        {this.state.error && <div className="error">{this.state.error}</div>}
                    </form>
                </main>
            </article>
        );
    }
}

export default SignIn;