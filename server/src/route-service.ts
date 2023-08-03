import pool from "./mysql-pool";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

// export type RouteWithAllInformation = {
//   route_id: number;
//   duration: string;
//   destination: string;
//   time_published: Date;
//   continent: string;
//   order_number: number;
//   estimated_price: number;
//   user_profile_id: number;
//   travel_point_id: number;
// };

export type Route = {
  route_id: number;
  route_name: string;
  duration: string;
  estimated_price: string;
  description: string;
};

export type RouteTravelPoint = {
  route_id: number;
  travel_point_id: number;
  order_number: number;
  destination: string;
  continent: string;
  // duration: number;
  // estimated_price: number;
  // user_profile_id: number;
};

class RouteService {
  /**
   * Get task with given id.
   */
  // get(id: number) {
  //   return new Promise<Route | undefined>((resolve, reject) => {
  //     pool.query(
  //       "SELECT * FROM route_travel_point, route, travel WHERE route_id = ?",
  //       [id],
  //       (error, results: RowDataPacket[]) => {
  //         if (error) return reject(error);

  //         resolve(results[0] as Route);
  //       }
  //     );
  //   });
  // }

  getRoute(route_id: number) {
    return new Promise<Route>((resolve, reject) => {
      pool.query(
        "SELECT * FROM route WHERE route_id=?",
        [route_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as Route);
        }
      );
    });
  }

  /**
   * Get all Routes.
   */
  getAllRoutes() {
    return new Promise<Route[]>((resolve, reject) => {
      pool.query(
        // "SELECT * FROM route",
        "SELECT * FROM route",
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Route[]);
        }
      );
    });
  }

  getRouteTravelPoints(route_id: number) {
    return new Promise<RouteTravelPoint[]>((resolve, reject) => {
      pool.query(
        // "SELECT * FROM route",
        "SELECT * FROM route_travel_point, travel_point WHERE travel_point.travel_point_id = route_travel_point.travel_point_id AND route_id=?",
        [route_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as RouteTravelPoint[]);
        }
      );
    });
  }

  // add(duration: string, estimated_price: string, time_published: Date) {
  //   return new Promise<Number>((resolve, reject) => {
  //     pool.query(
  //       "INSERT INTO route SET duration=?, estimated_price=?, time_published=?",
  //       [duration, estimated_price, time_published],
  //       (error, results: ResultSetHeader) => {
  //         if (error) return reject(error);

  //         resolve(results.insertId);
  //       }
  //     );
  //   });
  // }

  deleteRoute(route_id: Number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        "DELETE FROM route WHERE route_id = ?",
        [route_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);
          if (results.affectedRows == 0) reject(new Error("No row deleted"));

          resolve();
        }
      );
    });
  }

  deleteTravelPoint(travel_point_id: Number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        "DELETE FROM travel_point WHERE travel_point_id = ?",
        [travel_point_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);
          if (results.affectedRows == 0) reject(new Error("No row deleted"));

          resolve();
        }
      );
    });
  }

  deleteRouteTravelPoint(route_id: Number, travel_point_id: Number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        "DELETE FROM route_travel_point WHERE route_id=? AND travel_point_id=?",
        [route_id, travel_point_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);
          if (results.affectedRows == 0) reject(new Error("No row deleted"));

          resolve();
        }
      );
    });
  }

  deleteRouteRating(route_id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        "SELECT EXISTS(SELECT 1 FROM rating WHERE route_id = ?) AS route_exists;",
        [route_id],
        (error, results: any) => {
          if (error) return reject(error);
          if (results[0].route_exists === 0) {
            // No row exists with the given route_id, resolve the promise without doing anything
            resolve();
          } else {
            // A row exists with the given route_id, delete it using a separate query
            pool.query(
              "DELETE FROM rating WHERE route_id = ?;",
              [route_id],
              (error, results: ResultSetHeader) => {
                if (error) return reject(error);
                if (results.affectedRows === 0)
                  reject(new Error("No row deleted"));
                resolve();
              }
            );
          }
        }
      );
    });
  }

  deleteRouteFavourite(route_id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        "SELECT EXISTS(SELECT 1 FROM favourite WHERE route_id = ?) AS route_exists;",
        [route_id],
        (error, results: any) => {
          if (error) return reject(error);
          if (results[0].route_exists === 0) {
            // No row exists with the given route_id, resolve the promise without doing anything
            resolve();
          } else {
            // A row exists with the given route_id, delete it using a separate query
            pool.query(
              "DELETE FROM favourite WHERE route_id = ?;",
              [route_id],
              (error, results: ResultSetHeader) => {
                if (error) return reject(error);
                if (results.affectedRows === 0)
                  reject(new Error("No row deleted"));
                resolve();
              }
            );
          }
        }
      );
    });
  }

  updateRoute(
    route_name: string,
    duration: string,
    estimated_price: number,
    description: string,
    route_id: number
  ) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        "UPDATE route SET route_name = ?, duration = ?, estimated_price = ?, description = ? WHERE route_id = ? ",
        [route_name, duration, estimated_price, description, route_id],
        (error, _results) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  updateTravelPoint(
    destination: string,
    continent: string,
    travel_point_id: number
  ) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        "UPDATE travel_point SET destination = ?, continent = ? WHERE travel_point_id = ? ",
        [destination, continent, travel_point_id],
        (error, _results) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  createRoute(
    route_name: string,
    duration: string,
    estimated_price: string,
    description: string
  ) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        "INSERT INTO route SET route_name=?, duration=?, estimated_price=?, description=? ",
        [route_name, duration, estimated_price, description],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          //@ts-ignore
          resolve(results.insertId);
        }
      );
    });
  }

  //ResultsSetHeader skal brukes et eller annet sted i stedet for RowDataPacket for å linke itl den ny opprettede

  createTravelPoint(
    travel_point_id: number,
    destination: string,
    continent: string
  ) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        "INSERT INTO travel_point SET travel_point_id=?, destination=?, continent=?",
        [travel_point_id, destination, continent],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          //@ts-ignore
          resolve(results.insertId);
        }
      );
    });
  }

  createRouteTravelPoint(
    route_id: number,
    travel_point_id: number,
    order_number: number
  ) {
    return new Promise<RouteTravelPoint>((resolve, reject) => {
      pool.query(
        "INSERT INTO route_travel_point SET route_id=?, travel_point_id=?, order_number=?",
        [route_id, travel_point_id, order_number],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as RouteTravelPoint);
        }
      );
    });
  }
}
const routeService = new RouteService();
export default routeService;
