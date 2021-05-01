import React from 'react';
import firebase from '../../firebase';
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
        passwordConf: '',
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    //Input validation
    isFormValid = () => {
        if (this.isFormEmpty(this.state)) {
            //throw error
        } else if (this.isPasswordValid()) {
            //throw error
        } else {
            return true;
        }
    };
    isFormEmpty = () => {};
    isPasswordValid = () => {};

    handleSubmit = (event) => {
        if (this.isFormValid()) {
            event.preventDefault();
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    this.state.email,
                    this.state.password
                )
                .then((createUser) => {
                    console.log(createUser);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    render() {
        var colors = {
            BurntSienna: '#cc4c1c',
            HarvestGold: '#fcac3c',
            Avocado: '#748c34',
            BlueMustang: '#2c748c',
            Teak: '#9c5c14',
            Natural: '#d4b484',
            Default: '#ffc400',
        };
        const { username, email, password, passwordConf } = this.state;
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
                        style={{ color: '#ffc400' }}
                        icon
                    >
                        <Icon
                            name="leaf"
                            style={{
                                color: '#ffc400',
                            }}
                        />
                        Register for LeafChat
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
                                type="password"
                            />

                            <Form.Input
                                fluid
                                name="passwordConf"
                                icon="repeat"
                                iconPosition="left"
                                placeholder="Password Confirmation"
                                onChange={this.handleChange}
                                value={passwordConf}
                                type="password"
                            />
                            <Button
                                style={{
                                    backgroundColor: '#ffc400',
                                }}
                                fluid
                                size="large"
                            >
                                Submit
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already a user? <Link to="login">Login</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Register;
