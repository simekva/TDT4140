import React from "react";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import { Component } from "react-simplified";
import { createHashHistory } from "history";
import routeService, { Route_travel_point, Route } from "../route-service";
import { userSession } from "./user-register";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, lightTheme, darkTheme, toggleTheme } from "./theme";
import styled from "styled-components";

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

export class EditRoute extends Component<{
  match: { params: { route_id: number } };
}> {
  state = {
    theme: lightTheme,
  };

  handleToggleTheme = () => {
    this.setState({ theme: toggleTheme(this.state.theme) });
  };
  route: Route = {
    route_id: 0,
    route_name: "",
    duration: "",
    estimated_price: "",
    description: "",
  };
  route_travel_points: Route_travel_point[] = [];

  newDestinations: addDestination[] = []; // Temp value
  destinationNumber: number = 1;
  newDestination: addDestination = {
    name: "",
    orderNumber: this.destinationNumber,
    continent: "",
  };
  //route_travel_point: any;

  render() {
    return (
      <>
        {userSession.loggedIn ? (
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
              <StyledCard style={{ width: "80%", marginLeft: "10%" }}>
                <Row>
                  <Col style={{ marginLeft: "2%" }}>
                    <h2 style={{ marginLeft: "-2%" }}>Destinations</h2>

                    {this.route_travel_points.map((route_travel_point) => (
                      <Row key={route_travel_point.route_id}>
                        <Col
                          style={{
                            marginTop: "1%",
                          }}
                          xs
                          lg="1"
                        >
                          <h6>{route_travel_point.order_number}. </h6>
                        </Col>
                        <Col>
                          <Form>
                            <Form.Group
                              className="destination"
                              controlId="destination"
                            >
                              <Form.Control
                                type=""
                                placeholder={route_travel_point.destination}
                                onChange={(event) =>
                                  (route_travel_point.destination =
                                    event.currentTarget.value)
                                }
                              />
                            </Form.Group>
                            {console.log(route_travel_point.destination)}
                          </Form>
                        </Col>
                        <Col>
                          <Form.Select
                            style={{
                              width: "70%",
                              marginBottom: "2.5%",
                            }}
                            value={route_travel_point.continent}
                            onChange={(event) =>
                              (route_travel_point.continent =
                                event.currentTarget.value)
                            }
                          >
                            <option value="Africa">Africa</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Asia">Asia</option>
                            <option value="Australia">Australia</option>
                            <option value="Europe">Europe</option>
                            <option value="North America">North America</option>
                            <option value="South America">South America</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    ))}

                    {console.log(this.route_travel_points)}
                  </Col>
                  <Col>
                    <h2>Route Information</h2>

                    <Row>
                      <Col xs lg="3">
                        <h6>Name:</h6>{" "}
                      </Col>
                      <Col>
                        <Form
                          style={{
                            marginTop: "5%",
                            marginBottom: "5%",
                          }}
                        >
                          <Form.Group
                            className="name"
                            controlId="route name"
                            style={{ marginTop: "-5%" }}
                          >
                            <Form.Control
                              type=""
                              placeholder={this.route.route_name}
                              onChange={(event) =>
                                (this.route.route_name =
                                  event.currentTarget.value)
                              }
                            />
                          </Form.Group>
                        </Form>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs lg="3">
                        <h6>Description:</h6>{" "}
                      </Col>
                      <Col>
                        <Form
                          style={{
                            marginTop: "5%",
                            marginBottom: "5%",
                          }}
                        >
                          <Form.Group
                            className="description"
                            controlId="description"
                            style={{ marginTop: "-5%" }}
                          >
                            <Form.Control
                              type=""
                              placeholder={this.route.description}
                              onChange={(event) =>
                                (this.route.description =
                                  event.currentTarget.value)
                              }
                            />
                          </Form.Group>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs lg="3">
                        <h6>Price:</h6>
                      </Col>
                      <Col>
                        <Form
                          style={{
                            marginTop: "5%",
                            marginBottom: "5%",
                          }}
                        >
                          <Form.Group
                            className="name"
                            controlId="route name"
                            style={{ marginTop: "-5%" }}
                          >
                            <Form.Control
                              type=""
                              placeholder={this.route.estimated_price}
                              onChange={(event) =>
                                (this.route.estimated_price =
                                  event.currentTarget.value)
                              }
                            />
                          </Form.Group>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs lg="3">
                        <h6>Duration:</h6>
                      </Col>
                      <Col>
                        <Form
                          style={{
                            marginTop: "5%",
                            marginBottom: "5%",
                          }}
                        >
                          <Form.Group
                            className="name"
                            controlId="route name"
                            style={{ marginTop: "-5%" }}
                          >
                            <Form.Control
                              type=""
                              placeholder={this.route.duration}
                              onChange={(event) =>
                                (this.route.duration =
                                  event.currentTarget.value)
                              }
                            />
                          </Form.Group>
                        </Form>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </StyledCard>
              <Row>
                <Col>
                  <Button
                    variant="danger"
                    onClick={() => this.deleteRoute()}
                    style={{
                      marginTop: "1%",
                      marginLeft: "20%",
                      width: "20%",
                      //backgroundColor: "#53aca8",
                    }}
                  >
                    Delete
                  </Button>
                </Col>

                <Col>
                  <Button
                    onClick={() => this.goBack()}
                    style={{
                      marginTop: "1%",
                      marginLeft: "38%",
                      width: "20%",
                      backgroundColor: "#53aca8",
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    onClick={() => this.save()}
                    style={{
                      marginTop: "1%",
                      marginLeft: "2%",
                      width: "20%",
                      backgroundColor: "#53aca8",
                    }}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            </ThemeProvider>
          </>
        ) : (
          (alert("You need to log in first!"), history.push("/log_in"))
        )}
      </>
    );
  }

  mounted() {
    routeService
      .getRoute(this.props.match.params.route_id)
      //@ts-ignore
      .then((route) => (this.route = route))
      .catch((error) => alert(error.response.data));

    routeService
      .getRouteTravelPoints(this.props.match.params.route_id)
      .then((route_travel_points) => {
        (this.route_travel_points = route_travel_points),
          console.log(route_travel_points);
        //Her sorteres travelpointsene i kronologisk rekkefølge basert på
        //order_number slik at dette printes riktig når disse mappes
        this.route_travel_points.sort(
          (a, b) => a.order_number - b.order_number
        );
      })
      .catch((error) => alert(error.response.data));
  }
  save() {
    this.route_travel_points.map((route_travel_point) =>
      routeService.updateTravelPoint(
        route_travel_point.destination,
        route_travel_point.continent,
        route_travel_point.travel_point_id
      )
    );

    routeService.updateRoute(
      this.route.route_name,
      this.route.duration,
      this.route.estimated_price,
      this.route.description,
      this.route.route_id
    );

    alert("Route was updated");

    history.push("/routes/" + this.route.route_id);

    // window.location.reload();

    //window.location.reload(); // May log out user...
  }

  // delete() {
  //   this.deleteRoute();
  //   alert('Successfully deleted "' + this.route.route_name + '"');
  //   history.push("/home/");
  //   window.location.reload();
  // }
  // deleteRoute() {
  //   throw new Error("Method not implemented.");
  // }

  goBack() {
    history.push("/routes/" + this.route.route_id);
  }

  deleteRoute() {
    const deleteRouteRatingPromise = routeService.deleteRouteRating(
      this.route.route_id
    );

    const deleteRouteFavouritePromise = routeService.deleteRouteFavourite(
      this.route.route_id
    );

    Promise.all([deleteRouteRatingPromise, deleteRouteFavouritePromise])
      .then(() =>
        this.route_travel_points.map((route_travel_point) =>
          routeService.deleteRouteTravelPoint(
            route_travel_point.route_id,
            route_travel_point.travel_point_id
          )
        )
      )
      .then(() =>
        this.route_travel_points.map((route_travel_point) => {
          routeService.deleteTravelPoint(route_travel_point.travel_point_id);
        })
      )

      .then(() => routeService.deleteRoute(this.route.route_id))
      .then(() => history.push("/home"));
  }
}
