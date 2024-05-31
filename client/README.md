# CARSPHERE

Works with Carsphare backend API to provide a user interface for users to search for cars and view details about them.
Uses GraphQL to query the Carsphere API for extreme efficiency cutting down on the number of requests made to the server.

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

#####

Clone first : github:halitderya/carsphere-backend.git
Edit the .env file to point to the correct mongodb database and the correct port for the server.

## Installation
