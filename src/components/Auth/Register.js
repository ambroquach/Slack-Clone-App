import React from 'react';
import firebase from '../../firebase';
// Use to hash messages
import md5 from 'md5';
import {
    Grid,
    Form,
    Segment,
    Button,
    Header,
    Message,
    Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// This is a stateful component
class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: [],
        loading: false,
        // Reference the db collection on Firebase - users array
        usersRef: firebase.database().ref('users'),
    };
    // This is for Form.Input(user, pass, email, passConfirm)
    // This arrow syntax and var assignment ensure `this` is bound within handleChange.
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // Handling submission once users key in info and hit submit button
    handleSubmit = (event) => {
        // Prevent [sending a form]'s default action that is reloading the page
        event.preventDefault();
        if (this.isFormValid()) {
            // Clear the errors array, only set loading to True to disable Button in registering process
            this.setState({ errors: [], loading: true });
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    this.state.email,
                    this.state.password
                )
                .then((createdUser) => {
                    console.log(createdUser);
                    // Firebase returned a createdUser obj with user prop then use updateProfile to change displayName and photoURL
                    createdUser.user
                        .updateProfile({
                            displayName: this.state.username,
                            photoURL: `https://gravatar.com/avatar/${createdUser.user.email}?d=identicon`,
                            // Use md5 to provide a unique value for avatar URL
                        })
                        .then(() => {
                            // Created avatar for each new user
                            this.saveUser(createdUser).then(() => {
                                console.log('user saved');
                            });
                            // this.setState({ loading: false });
                        })
                        .catch((err) => {
                            console.error(err);
                            // Put in a new error to errors array
                            this.setState({
                                errors: this.state.errors.concat(err),
                                loading: false,
                            });
                        });
                })
                .catch((err) => {
                    console.error(err);
                    // Put in a new error to errors array
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading: false,
                    });
                });
        }
    };

    saveUser = (createdUser) => {
        // What is child() in Firebase
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL,
        });
    };

    // Handling input errors by examining the errors array after Form is submitted, check to see if the messages include any input keyword. If yes, then set the className= React "error" to highlight the input field
    handleInputError = (errors, inputName) => {
        return errors.some((error) =>
            error.message.toLowerCase().includes(inputName)
        )
            ? 'error'
            : '';
    };

    // This display errors to users if there are any after Form is submitted
    displayErrors = (errors) =>
        errors.map((error, index) => <p key={index}> {error.message} </p>);

    //Input validationerror
    isFormValid = () => {
        let errors = [];
        let error;
        // All fields should be filled out, throw error
        if (this.isFormEmpty(this.state)) {
            error = { message: 'Please fill in all fields' };
            // Concatenate to scope errors array then populate to state errors array
            this.setState({ errors: errors.concat(error) });
            return false;
        }
        // Password is valid? if not, throw error
        else if (!this.isPasswordValid(this.state)) {
            error = { message: 'Password is invalid' };
            this.setState({ errors: errors.concat(error) });
            return false;
        }
        // Form is valid
        return true;
    };

    // Return true if one of the fields is empty
    isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
        return (
            !username.length ||
            !email.length ||
            !password.length ||
            !passwordConfirmation.length
        );
    };

    // Only destructure pass and passConfirm from state
    isPasswordValid = ({ password, passwordConfirmation }) => {
        // If either length is less than 6 or values are not equal, return False
        if (
            password.length < 6 ||
            passwordConfirmation.length < 6 ||
            password !== passwordConfirmation
        ) {
            return false;
        }
        return true;
    };

    render() {
        // An object for some pre-defined colors
        var colors = {
            BurntSienna: '#cc4c1c',
            HarvestGold: '#fcac3c',
            Avocado: '#748c34',
            BlueMustang: '#2c748c',
            Teak: '#9c5c14',
            Natural: '#d4b484',
            Default: '#ffc400',
        };

        // Then add i.e: value={username}, allows us to clear our forms
        // Destructure so don't have to include this.state.username, etc everywhere
        const {
            username,
            email,
            password,
            passwordConfirmation,
            errors,
            loading,
        } = this.state;

        return (
            <Grid
                textAlign="center"
                verticalAlign="middle"
                className="register-grid"
            >
                <Grid.Column style={{ maxwidth: 450 }}>
                    <Header
                        as="h2"
                        textAlign="center"
                        style={{ color: '#b48323' }}
                        icon
                    >
                        <Icon
                            name="bug"
                            style={{
                                color: '#b48323',
                            }}
                        />
                        Register for HelloBug Messenger
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
                            <Form.Input
                                fluid
                                name="username"
                                icon="user"
                                iconPosition="left"
                                placeholder="Username"
                                onChange={this.handleChange}
                                value={username}
                                type="text"
                            />

                            <Form.Input
                                fluid
                                name="email"
                                icon="mail"
                                iconPosition="left"
                                placeholder="Email Address"
                                onChange={this.handleChange}
                                value={email}
                                className={this.handleInputError(
                                    errors,
                                    'email'
                                )}
                                type="email"
                            />

                            <Form.Input
                                fluid
                                name="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                onChange={this.handleChange}
                                value={password}
                                className={this.handleInputError(
                                    errors,
                                    'password'
                                )}
                                type="password"
                            />

                            <Form.Input
                                fluid
                                name="passwordConfirmation"
                                icon="repeat"
                                iconPosition="left"
                                placeholder="Password Confirmation"
                                onChange={this.handleChange}
                                value={passwordConfirmation}
                                className={this.handleInputError(
                                    errors,
                                    'password'
                                )}
                                type="password"
                            />
                            {/* className will be set to 'loading', disabled prop to true if the var is true -- Button's disabled */}
                            <Button
                                style={{
                                    backgroundColor: '#b48323',
                                }}
                                fluid
                                size="large"
                                disabled={loading}
                                className={loading ? 'loading' : ''}
                            >
                                Submit
                            </Button>
                        </Segment>
                    </Form>

                    {/* Display errors if array is not empty with Message component, pass in errors array from state. Can use errors alone instead of this.state.errors as commented above */}
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>
                        Already a user? <Link to="login">Login</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Register;
