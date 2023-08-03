import React from "react";
import { Card, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { createHashHistory } from "history";
import { Component } from "react-simplified";
import userService, { User } from "../user-service";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, lightTheme, darkTheme, toggleTheme } from "./theme";
import styled from "styled-components";

const history = createHashHistory();

// user-register.js (or wherever loggedIn and currentUser are defined)

export class UserSession {
  loggedIn: boolean = false;
  currentUser: User = {
    user_profile_id: 0,
    email: "",
    first_name: "",
    last_name: "",
    profile_password: "",
    profile_name: "",
  };
  constructor() {
    this.currentUser = {
      user_profile_id: 0,
      email: "",
      first_name: "",
      last_name: "",
      profile_password: "",
      profile_name: "",
    };
    this.loggedIn = false;
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }
}

export const userSession = new UserSession();
export const loggedIn = userSession.loggedIn;
// export default userSession;

export const StyledCard = styled(Card)`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#333" : "#fff"};
  color: ${(props) => (props.theme.mode === "dark" ? "#fff" : "#000")};
`;

export class RegisterUser extends Component {
  user: User = {
    user_profile_id: 0,
    email: "",
    first_name: "",
    last_name: "",
    profile_password: "",
    profile_name: "",
  };
  confirm_password: string = "";

  state = {
    theme: lightTheme,
  };

  handleToggleTheme = () => {
    this.setState({ theme: toggleTheme(this.state.theme) });
  };

  render() {
    return (
      <>
        <ThemeProvider theme={this.state.theme}>
          <GlobalStyle />
          <Button
            style={{
              position: "fixed",
              bottom: "30px",
              right: "50px",
              zIndex: "999",
            }}
            onClick={this.handleToggleTheme}
          >
            {this.state.theme.mode === "light" ? "Dark Mode" : "Light Mode"}
          </Button>
          <StyledCard
            style={{
              border: "none",
              padding: "15px",
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {/* Card creating forms related to creating new user */}
            <Card.Title>Create user</Card.Title>
            <Container
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "20rem",
              }}
            >
              <Row>
                <Form.Control
                  value={this.user.profile_name}
                  type="text"
                  placeholder="Profile Name"
                  onChange={(event) =>
                    (this.user.profile_name = event.currentTarget.value)
                  }
                  style={{
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                ></Form.Control>
              </Row>

              <Row>
                <Form.Control
                  value={this.user.email}
                  type="text"
                  placeholder="Email"
                  onChange={(event) =>
                    (this.user.email = event.currentTarget.value)
                  }
                  style={{
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                ></Form.Control>
              </Row>
              <Row>
                <Form.Control
                  value={this.user.first_name}
                  type="text"
                  placeholder="First name"
                  onChange={(event) =>
                    (this.user.first_name = event.currentTarget.value)
                  }
                  style={{
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                ></Form.Control>
              </Row>
              <Row>
                <Form.Control
                  value={this.user.last_name}
                  type="text"
                  placeholder="Last name"
                  onChange={(event) =>
                    (this.user.last_name = event.currentTarget.value)
                  }
                  style={{
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                ></Form.Control>
              </Row>
              <Row>
                <Form.Control
                  value={this.user.profile_password}
                  type="password"
                  placeholder="Password"
                  onChange={(event) =>
                    (this.user.profile_password = event.currentTarget.value)
                  }
                  // Makes it possible to log in with enter as well as with button
                  onKeyUp={(event) => {
                    if (event.key == "Enter") {
                      this.createUser();
                    }
                  }}
                  style={{
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                ></Form.Control>
              </Row>
              <Row>
                <Form.Control
                  value={this.confirm_password}
                  type="password"
                  placeholder="Confirm password"
                  onChange={(event) =>
                    (this.confirm_password = event.currentTarget.value)
                  }
                  onKeyUp={(event) => {
                    if (event.key == "Enter") {
                      this.createUser();
                    }
                  }}
                  style={{
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                ></Form.Control>
              </Row>
            </Container>
            {/* Buttons for creating user and clearing input */}
            <Container
              style={{
                width: "15rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Row>
                <Button
                  // variant="success"
                  onClick={() => this.createUser()}
                  style={{
                    marginBottom: "10px",
                    backgroundColor: "#53aca8",
                  }}
                >
                  Create user
                </Button>
              </Row>
              <Row>
                <Button
                  variant="outline-secondary"
                  onClick={() => this.clearInput()}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  Clear input
                </Button>
              </Row>
            </Container>
          </StyledCard>
        </ThemeProvider>
      </>
    );
  }

  createUser() {
    userService
      .createUser(
        this.user.profile_name,
        this.user.profile_password,
        this.user.first_name,
        this.user.last_name,
        this.user.email
      )
      .then((response) => {
        if (
          response.length > 0 ||
          this.user.profile_password !== this.confirm_password
        ) {
          alert(response);
        } else {
          alert("User created, please log in");
          userSession.setLoggedIn(false);
          history.push("/log_in/");
        }
      })
      .catch((error) => alert(error.response.data));
  }

  clearInput() {
    this.user = {
      user_profile_id: 0,
      email: "",
      first_name: "",
      last_name: "",
      profile_password: "",
      profile_name: "",
    };
  }
}
