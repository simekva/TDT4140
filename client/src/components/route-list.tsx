import React, { useState } from "react";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Component } from "react-simplified";
import { createHashHistory } from "history";
import { BsArrowRight } from "react-icons/bs";
import routeService, { Route, Route_travel_point } from "../route-service";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, lightTheme, darkTheme, toggleTheme } from "./theme";
import styled from "styled-components";
import { userSession } from "./user-register";

const history = createHashHistory();

export const StyledCard = styled(Card)`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#333" : "#fff"};
  color: ${(props) => (props.theme.mode === "dark" ? "#fff" : "#000")};
`;

export class RouteList extends Component {
  routes: Route[] = [];
  route_travel_points: Route_travel_point[] = [];

  filtered_routes: Route[] = [];
  filtered_travel_points: Route_travel_point[] = [];

  search_input: string = "";

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
          <Container>
            {/* Search bar for easy access to gicen recipe */}
            <StyledCard style={{ border: "none", padding: "15px" }}>
              <Card.Title style={{ marginLeft: "auto", marginRight: "auto" }}>
                Search for a route or destination
              </Card.Title>

              <Row
                style={{
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Col>
                  <Form.Control
                    onChange={(event) => this.search(event.currentTarget.value)}
                    value={this.search_input}
                    type="Search"
                    placeholder="Search"
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      textAlign: "center",
                      width: "24rem",
                    }}
                  ></Form.Control>
                </Col>
              </Row>
            </StyledCard>

            <Col lg>
              <Row xs={1} md={2} className="g-2">
                {this.filtered_routes.map((route) => (
                  <NavLink to={"/routes/" + route.route_id}>
                    <Col>
                      <StyledCard
                        style={{
                          width: "100%",
                          margin: "1%",
                          textAlign: "center",
                          borderRadius: "10px", // Rounded corners for the border
                          height: "100%",
                        }}
                      >
                        <Card.Body>
                          <Card.Img
                            variant="top"
                            src="https://freepngimg.com/save/168111-travel-icon-free-png-hq/3206x3494"
                            style={{ width: "40%" }}
                          />
                          <Card.Title style={{ color: "rgb(82, 130, 101)" }}>
                            {route.route_name}
                          </Card.Title>
                          <Row>
                            {this.route_travel_points
                              .filter((rtp) => rtp.route_id === route.route_id)
                              .map((rtp) => (
                                <Col key={rtp.travel_point_id}>
                                  {rtp.order_number}. {rtp.destination}
                                </Col>
                              ))}
                          </Row>
                        </Card.Body>
                      </StyledCard>
                    </Col>
                  </NavLink>
                ))}
              </Row>
            </Col>
          </Container>
        </ThemeProvider>
      </>
    );
  }

  mounted() {
    routeService
      .getAllRoutes()
      .then((routes) => {
        (this.routes = routes) && (this.filtered_routes = routes);
        const routeTravelPointsPromise = routes.map((route) =>
          routeService.getRouteTravelPoints(route.route_id)
        );
        return Promise.all(routeTravelPointsPromise);
      })

      .then((routeTravelPoints) => {
        //Denne slår sammen alle individuelle arrayer av routeTravelPoints inn til én
        //stor, sammenslått array over alle travelpoints som vi etterfølgende er i stand til å filtere basert på
        //route_id og deretter mappe
        console.log(routeTravelPoints); //Basert på at vi har x antall ruter liggende i databasen, vil de som logges her være x-antall arrays med travel_pointsene til hver rute
        this.route_travel_points = routeTravelPoints.flat();
      })
      .catch((error: { message: string }) =>
        alert("Error getting route: " + error.message)
      );
  }

  search(input: string) {
    this.search_input = input;

    this.filterRoutes();
  }

  filterRoutes() {
    if (this.search_input === "") {
      this.filtered_routes = this.routes;
    } else {
      const matching_routes = this.routes.filter((route) =>
        route.route_name.toLowerCase().includes(this.search_input.toLowerCase())
      );

      const matching_travel_points = this.route_travel_points.filter((rtp) =>
        rtp.destination.toLowerCase().includes(this.search_input.toLowerCase())
      );
      const matching_route_ids = [
        ...new Set([
          ...matching_travel_points.map((rtp) => rtp.route_id),
          ...matching_routes.map((route) => route.route_id),
        ]),
      ];
      this.filtered_routes = this.routes.filter((route) =>
        matching_route_ids.includes(route.route_id)
      );
    }
  }
}
