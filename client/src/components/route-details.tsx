import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Component } from "react-simplified";
import { createHashHistory } from "history";
import routeService, { Route_travel_point, Route } from "../route-service";
import { GlobalStyle, lightTheme, darkTheme, toggleTheme } from "./theme";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";

const history = createHashHistory();

export const StyledCard = styled(Card)`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#333" : "#fff"};
  color: ${(props) => (props.theme.mode === "dark" ? "#fff" : "#000")};
`;

export class RouteDetails extends Component<{
  match: { params: { route_id: number } };
}> {
  route: Route = {
    route_id: 0,
    route_name: "",
    duration: "",
    estimated_price: "",
    description: "",
  };
  route_travel_points: Route_travel_point[] = [];

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
          <StyledCard style={{ width: "80%", marginLeft: "10%" }}>
            <Row>
              <Col style={{ marginLeft: "20px" }}>
                <h2>Destinations</h2>

                {this.route_travel_points.map((route_travel_point) => (
                  <Row
                    style={{
                      marginLeft: "-2%",
                    }}
                    key={route_travel_point.route_id}
                  >
                    <Col xs lg="1">
                      <h6>
                        {route_travel_point.order_number}
                        {". "}
                      </h6>
                    </Col>
                    <Col>{route_travel_point.destination}</Col>
                    <Col xs lg="2">
                      <h6>Continent:</h6>
                    </Col>
                    <Col>{route_travel_point.continent}</Col>
                  </Row>
                ))}
              </Col>
              <Col>
                <h2>Route Information</h2>
                <Row>
                  <Col xs lg="3">
                    <h6>Name:</h6>{" "}
                  </Col>
                  <Col>{this.route.route_name}</Col>
                </Row>

                <Row>
                  <Col xs lg="3">
                    <h6>Description:</h6>{" "}
                  </Col>
                  <Col>{this.route.description}</Col>
                </Row>
                <Row>
                  <Col xs lg="3">
                    <h6>Estimated price:</h6>{" "}
                  </Col>
                  <Col>{this.route.estimated_price}</Col>
                </Row>
                <Row>
                  <Col xs lg="3">
                    <h6>Duration:</h6>{" "}
                  </Col>
                  <Col>{this.route.duration}</Col>
                </Row>
              </Col>
            </Row>
          </StyledCard>
        </ThemeProvider>
        <Button
          onClick={() => this.editRoute()}
          style={{
            marginTop: "1%",
            marginLeft: "10%",
            width: "10%",
            backgroundColor: "#53aca8",
          }}
        >
          Edit Route
        </Button>
      </>
    );
  }

  mounted() {
    routeService
      .getRoute(this.props.match.params.route_id)
      //@ts-ignore
      .then((route) => ((this.route = route), console.log(route)))
      .catch((error) => alert(error.response.data));

    routeService
      .getRouteTravelPoints(this.props.match.params.route_id)
      .then((route_travel_points) => {
        this.route_travel_points = route_travel_points;
        //Her sorteres travelpointsene i kronologisk rekkefølge basert på
        //order_number slik at dette printes riktig når disse mappes
        this.route_travel_points.sort(
          (a, b) => a.order_number - b.order_number
        );
      })
      .catch((error) => alert(error.response.data));
  }
  editRoute() {
    history.push("/editRoute/" + this.route.route_id);
  }
}
