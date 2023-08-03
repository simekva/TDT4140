import React from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { Component } from "react-simplified";
import { createHashHistory } from "history";
import routeService from "../route-service";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, lightTheme, darkTheme, toggleTheme } from "./theme";
import styled from "styled-components";
import { userSession } from "./user-register";
import { loggedIn } from "./user-register";

const history = createHashHistory();

export const StyledCard = styled(Card)`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#333" : "#fff"};
  color: ${(props) => (props.theme.mode === "dark" ? "#fff" : "#000")};
`;

export type addDestination = {
  name: string;
  orderNumber: number;
  continent: string;
};
/**
 * Renders route list.
 */

/**
 * Renders a create new route form list.
 */
export class NewRoute extends Component {
  newDestinations: addDestination[] = []; // Temp value
  destinationNumber: number = 1;
  newDestination: addDestination = {
    name: "",
    orderNumber: this.destinationNumber,
    continent: "",
  };

  route_name: string = "";

  duration: string = "";
  estimatedPrice: string = "";
  description: string = "";
  timepublished: Date = new Date();

  state = {
    theme: lightTheme,
  };

  handleToggleTheme = () => {
    this.setState({ theme: toggleTheme(this.state.theme) });
  };

  render() {
    return (
      <>
        {userSession.loggedIn ? (
          <>
            {" "}
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
              <StyledCard>
                <Row>
                  <Col style={{ marginLeft: "auto", marginRight: "auto" }}>
                    {/* <Card */}
                    {/* style=
            {{
              display: "flex",
              width: "40%",
              float: "left",
              marginLeft: "7%",
              marginTop: "30px",
            }} */}
                    {/* > */}
                    <Card.Title
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        textAlign: "center",
                      }}
                    >
                      Add steps
                    </Card.Title>
                    <Row>
                      <p
                        style={{
                          marginLeft: "auto",
                          marginRight: "auto",
                          textAlign: "center",
                        }}
                      >
                        Input ONE destination and continent chronologically
                      </p>
                    </Row>
                    <Row
                      style={{
                        margin: "5%",
                        marginTop: "3%",
                        marginBottom: "0%",
                      }}
                    >
                      <Form.Control
                        value={this.newDestination.name}
                        type="text"
                        placeholder="Destination"
                        onChange={(event) =>
                          (this.newDestination.name = event.currentTarget.value)
                        }
                        style={{
                          textAlign: "center",
                          width: "60%",
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginBottom: "10px",
                        }}
                      ></Form.Control>
                      <Form.Select
                        style={{ width: "30%", height: "47px" }}
                        value={this.newDestination.continent}
                        onChange={(event) =>
                          (this.newDestination.continent =
                            event.currentTarget.value)
                        }
                      >
                        <option>Continent:</option>
                        <option value="Africa">Africa</option>
                        <option value="Antarctica">Antarctica</option>
                        <option value="Asia">Asia</option>
                        <option value="Australia">Australia</option>
                        <option value="Europe">Europe</option>
                        <option value="North America">North America</option>
                        <option value="South America">South America</option>
                      </Form.Select>
                    </Row>
                    <Row>
                      <Button
                        style={{
                          width: "30%",
                          marginLeft: "20%",
                          marginBottom: "10px",
                        }}
                        variant="light"
                        onClick={() => this.addDestination()}
                      >
                        +
                      </Button>
                      <Button
                        style={{ width: "30%", marginBottom: "10px" }}
                        variant="light"
                        onClick={() => this.undoDestination()}
                      >
                        &#x1F519;
                      </Button>
                    </Row>
                    <Row style={{ margin: "5%" }}>
                      {this.newDestinations.map((newDestination) => (
                        <Row key={newDestination.orderNumber}>
                          <Col>
                            {newDestination.orderNumber +
                              ": " +
                              newDestination.name +
                              " - " +
                              newDestination.continent}
                          </Col>
                        </Row>
                      ))}
                    </Row>
                  </Col>
                  {/* </Card> */}
                  {/* <Card */}
                  {/* style=
              {{
                width: "40%",
                display: "flex",
                float: "right",
                marginRight: "7%",
                marginTop: "30px",
              }} */}
                  {/* > */}
                  <Col>
                    <Card.Title
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        textAlign: "center",
                      }}
                    >
                      Add info about route
                    </Card.Title>

                    <Row
                      style={{
                        margin: "5%",
                        marginTop: "3%",
                        marginBottom: "0%",
                      }}
                    >
                      <Form.Control
                        value={this.route_name}
                        type="text"
                        onChange={(event) =>
                          (this.route_name = event.currentTarget.value)
                        }
                        style={{
                          marginLeft: "auto",
                          width: "60%",
                          marginRight: "auto",
                          marginBottom: "10px",
                        }}
                        placeholder="Route name"
                      ></Form.Control>
                    </Row>
                    <Row
                      style={{
                        margin: "5%",
                        marginTop: "3%",
                        marginBottom: "0%",
                      }}
                    >
                      <Form.Control
                        value={this.duration}
                        type="text"
                        onChange={(event) =>
                          (this.duration = event.currentTarget.value)
                        }
                        style={{
                          marginLeft: "auto",
                          width: "60%",
                          marginRight: "auto",
                          marginBottom: "10px",
                        }}
                        placeholder="Duration (in hours?)"
                      ></Form.Control>
                    </Row>
                    <Row
                      style={{
                        margin: "5%",
                        marginTop: "3%",
                        marginBottom: "0%",
                      }}
                    >
                      <Form.Control
                        value={this.estimatedPrice}
                        onChange={(event) =>
                          (this.estimatedPrice = event.currentTarget.value)
                        }
                        type="text"
                        style={{
                          marginLeft: "auto",
                          width: "60%",
                          marginRight: "auto",
                          marginBottom: "10px",
                        }}
                        placeholder="Estimated cost"
                      ></Form.Control>
                    </Row>
                    <Row
                      style={{
                        margin: "5%",
                        marginTop: "3%",
                        marginBottom: "0%",
                      }}
                    >
                      <Form.Control
                        value={this.description}
                        as="textarea" // Change this line to "textarea"
                        onChange={(event) =>
                          (this.description = event.currentTarget.value)
                        }
                        style={{
                          marginLeft: "auto",
                          width: "60%",
                          marginRight: "auto",
                          marginBottom: "10px",
                        }}
                        placeholder="Description"
                      ></Form.Control>
                    </Row>
                    <Row
                      style={{
                        margin: "5%",
                        marginTop: "3%",
                        marginBottom: "0%",
                      }}
                    ></Row>
                    {/* </Card> */}
                  </Col>
                </Row>
              </StyledCard>
              <Row>
                <Button
                  onClick={() => this.createRoute()}
                  style={{
                    width: "30%",
                    marginBottom: "10px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "30px",
                    backgroundColor: "#53aca8",
                  }}
                  variant="light"
                >
                  Create Route
                </Button>
              </Row>
            </ThemeProvider>
          </>
        ) : (
          (alert("You need to log in first!"), history.push("/log_in"))
        )}
      </>
    );
  }

  //   mounted() {
  //     routeService
  //       .getAll()
  //       //@ts-ignore
  //       .then((routes) => (this.routes = routes))
  //       .catch((error: { message: string }) =>
  //         alert("Error getting tasks: " + error.message)
  //       );
  //   }

  addDestination() {
    if (this.newDestination.name == "" || this.newDestination.continent == "") {
      alert("All fields must be filled");
    } else {
      this.newDestinations.push(this.newDestination);
      this.destinationNumber += 1;
      this.newDestination = {
        name: "",
        orderNumber: this.destinationNumber,
        continent: "",
      };
    }
  }

  undoDestination() {
    this.newDestinations.pop();
    this.destinationNumber -= 1;
    this.newDestination.orderNumber = this.destinationNumber;
  }

  // createRoute() {
  //   if (
  //     this.duration == "" ||
  //     this.estimatedCost == "" ||
  //     this.newDestinations.length == 0
  //   ) {
  //     alert("All fields must be filled");
  //   } else {
  //     routeService
  //       .createRoute(
  //         this.duration,
  //         this.estimatedCost
  //         // (this.timepublished.getFullYear,
  //         // this.timepublished.getMonth(),
  //         // this.timepublished.getDay())
  //         // this.newDestination.orderNumber
  //       )
  //       .then((route_id) => {
  //         this.newDestination.map((order_number: number) => {
  //           routeService.createRouteTravelPoint(route_id, order_number);
  //         });
  //       });

  //     this.newDestinations
  //       .map((newDestination) => {
  //         routeService.createTravelPoint(
  //           newDestination.name,
  //           newDestination.continent
  //         );
  //       })
  //       .then((results) => {});
  //   }
  // }

  createRoute() {
    if (
      this.route_name == " " ||
      this.duration == "" ||
      this.estimatedPrice == "" ||
      this.description == "" ||
      this.newDestinations.length == 0
    ) {
      alert("All fields must be filled");
    } else {
      const createRoutePromise = routeService.createRoute(
        this.route_name,
        this.duration,
        this.estimatedPrice,
        this.description
      );

      const createTravelPointsPromises = this.newDestinations.map(
        (newDestination) => {
          return routeService.createTravelPoint(
            newDestination.name,
            newDestination.continent
          );
        }
      );

      let returnedRouteId: number = 0;
      Promise.all([createRoutePromise, ...createTravelPointsPromises])
        .then(([route_id, ...travelPointIds]) => {
          console.log(route_id["route_id"]);
          console.log(route_id.value);
          returnedRouteId = route_id["route_id"];
          const createRouteTravelPointPromises = this.newDestinations.map(
            (newDestination, index) => {
              const order_number = newDestination.orderNumber;
              const travel_point_id = travelPointIds[index]["travel_point_id"];
              return routeService.createRouteTravelPoint(
                route_id["route_id"],
                travel_point_id,
                order_number
              );
            }
          );
          return Promise.all(createRouteTravelPointPromises);
        })
        .then(() => {
          history.push("/routes/" + returnedRouteId);
          alert("The route was created");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
}
