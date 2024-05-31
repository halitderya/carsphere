Carsphere is a full-stack monorepo open source car dealership app created with;

Backend: NodeJS, ExpressJS, MongoDB and Apollo4 Server (GraphQL)

Frontend: NextJS, Apollo4 Client (GraphQL), Sass

Aim of this project is to create a car dealership app that can be used by car dealers to manage their inventory and customers. The app will have the following features;

GraphQL is used to query and mutate data from the server. The app is built with NextJS and Apollo4 Client. The app is styled with Sass. GraphQL enables the client to query only the data it needs. This makes the app faster and more efficient. With NextJS it's not only fast, but also SEO friendly. The app is responsive and works on all devices.

Car data fields include:

| Field Name         | Data Type        |
| ------------------ | ---------------- |
| id                 | String           |
| reg_number         | String           |
| make               | String           |
| model              | String           |
| year               | Integer          |
| color              | String           |
| mileage            | Integer          |
| price              | Integer          |
| fueltype           | String           |
| transmission       | String           |
| engine_capacity    | String           |
| engine_type        | String           |
| horsepower         | Integer          |
| torque             | String           |
| insurance_group    | String           |
| previous_owner     | Integer          |
| features           | Array of Strings |
| pictures           | Array of Strings |
| thumbnail_picture  | String           |
| ulez_compatibility | String           |
| 0-62mph            | String           |
| doors              | Integer          |
| euro_emission      | String           |
| mpg_combined       | Integer          |
| maximum_speed      | Integer          |
| seats              | Integer          |
| weight             | String           |

## Installation

1. Clone the repo
   ```sh
   git clone
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a .env file in the root directory and add the following environment variables
   ```sh
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
   ```
4. Run the app
   ```sh
   npm start
   ```
5. Open your browser and go to http://localhost:3000
