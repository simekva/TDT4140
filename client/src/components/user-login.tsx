import React from "react";
import { Card, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { createHashHistory } from "history";
import { Component } from "react-simplified";
import userService from "../user-service";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, lightTheme, darkTheme, toggleTheme } from "./theme";
import styled from "styled-components";
import { loggedIn, userSession } from "./user-register";

const history = createHashHistory();

export const StyledCard = styled(Card)`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#333" : "#fff"};
  color: ${(props) => (props.theme.mode === "dark" ? "#fff" : "#000")};
`;

export class UserLogIn extends Component {
  email: string = "";
  password: string = "";

  state = {
    theme: lightTheme,
  };

  handleToggleTheme = () => {
    this.setState({ theme: toggleTheme(this.state.theme) });
  };

  render() {
    if (!userSession.loggedIn) {
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
              {/*Card forms in for log in screen */}
              <Card.Title>Log in</Card.Title>
              <Container
                style={{
                  width: "20rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Row>
                  <Form.Control
                    value={this.email}
                    type="text"
                    placeholder="Email"
                    onChange={(event) =>
                      (this.email = event.currentTarget.value)
                    }
                    style={{
                      textAlign: "center",
                      marginBottom: "10px",
                    }}
                  ></Form.Control>
                </Row>
                <Row>
                  <Form.Control
                    value={this.password}
                    type="password"
                    placeholder="Password"
                    onChange={(event) =>
                      (this.password = event.currentTarget.value)
                    }
                    // Makes it possible to log in with enter as well as with button
                    onKeyUp={(event) => {
                      if (event.key == "Enter") {
                        this.logIn();
                      }
                    }}
                    style={{
                      textAlign: "center",
                      marginBottom: "10px",
                    }}
                  ></Form.Control>
                </Row>
              </Container>
              {/*Card for buttons in login screen before user is identified or registered */}
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
                    onClick={() => this.logIn()}
                    style={{
                      marginBottom: "10px",
                      backgroundColor: "#53aca8",
                    }}
                  >
                    Log in
                  </Button>
                </Row>
                <Row>
                  <Button
                    // variant="outline-success"
                    onClick={() => this.createUser()}
                    style={{
                      marginBottom: "10px",
                      backgroundColor: "#53aca8",
                    }}
                  >
                    No user? Create one here
                  </Button>
                </Row>
                <Row>
                  <Button
                    onClick={() => this.clearInput()}
                    style={{
                      marginBottom: "10px",
                      backgroundColor: "#53aca8",
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
    } else {
      userService
        .logIn(
          userSession.currentUser.email,
          userSession.currentUser.profile_password
        )
        .then(
          (user) => (
            (userSession.currentUser = user),
            history.push(
              "/profile/ " + userSession.currentUser.user_profile_id
            ),
            (userSession.loggedIn = true)
          )
        )
        .catch((error) => alert(error.message));
      return userSession.currentUser.user_profile_id;
    }
  }

  logIn() {
    if (this.email.length != 0 && this.password.length != 0) {
      userService
        .logIn(this.email, this.password)
        .then((user) => {
          userSession.currentUser = user;
          userSession.loggedIn = true;
          console.log(userSession.loggedIn);
          alert("Logged in as " + userSession.currentUser.email);
          history.push("/profile/" + userSession.currentUser.user_profile_id);
        })
        .catch((error) => alert(error.response.data));
    } else {
      alert("Please fill in all the fields");
    }
  }

  clearInput() {
    this.email = "";
    this.password = "";
  }

  createUser() {
    history.push("/register");
  }
}
