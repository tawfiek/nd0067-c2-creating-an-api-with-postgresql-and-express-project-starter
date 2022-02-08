# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: GET `/products`
- Show: GET   `/products/:id`
- Create [token required]: POST `/products/`
- [OPTIONAL] Top 5 most popular products GET `/products?popular=true&limit=5`
- [OPTIONAL] Products by category (args: product category) GET `/products?popular=true&limit=5`

#### Users
- Index `ex [token required] GE/users/`
- Show [token required] GET `/users/:id`
- Create N[token required] POST `/users/`

#### Orders
- Current Order by user (args: user id)[token required] `GET /orders?userID`
- [OPTIONAL] Completed Orders by user (args: user id in body and order id in path)[token required] `PUT /orders/:id`
## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

``` sql
CREATE TABLE product (
        id INT PRIMARY KEY,
        name VARCHAR(255),
        price FLOAT
    )
```

#### User
- id
- firstName
- lastName
- password

``` sql
CREATE TABLE users (
        id INT PRIMARY KEY,
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        password VARCHAR(255)
    )
```
#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)


``` sql
CREATE TYPE order_status AS ENUM ('active', 'complete');

CREATE TABLE orders (
        id INT PRIMARY KEY,
        user_id INT,
        status order_status
    )

CREATE TABLE order_product (
    id BIGINT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    CONSTRAINT fk_order_id
      FOREIGN KEY(order_id)
	  REFERENCES order(id)
    CONSTRAINT fk_order_id
      FOREIGN KEY(order_id)
	  REFERENCES order(id)  
)

```

## End Points documentations

``` json
{
	"info": {
		"_postman_id": "d26da441-3d9a-45a7-97d9-f23f2c2f5073",
		"name": "Market Application",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "Users",
			"item": [
				{
					"name": "signup",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"firstName\": \"Tawfiek\",\n    \"lastName\": \"Khalaf\",\n    \"password\": \"tawfiek\",\n    \"username\": \"tawfiek1\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{BASE_URL}}/users/signup",
							"host": [
								"{{BASE_URL}}"
							],
							"path": [
								"users",
								"signup"
							]
						}
					},
					"response": [
						{
							"name": "signup",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"firstName\": \"Tawfiek\",\n    \"lastName\": \"Khalaf\",\n    \"password\": \"tawfiek\",\n    \"username\": \"tawfiek3\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{BASE_URL}}/users/signup",
									"host": [
										"{{BASE_URL}}"
									],
									"path": [
										"users",
										"signup"
									]
								}
							},
							"status": "Created",
							"code": 201,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "X-Powered-By",
									"value": "Express"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=utf-8"
								},
								{
									"key": "Content-Length",
									"value": "16"
								},
								{
									"key": "ETag",
									"value": "W/\"10-oV4hJxRVSENxc/wX8+mA4/Pe4tA\""
								},
								{
									"key": "Date",
									"value": "Tue, 08 Feb 2022 09:14:23 GMT"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=5"
								}
							],
							"cookie": [],
							"body": "{\n    \"success\": true\n}"
						}
					]
				},
				{
					"name": "Login",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"username\": \"tawfiek\",\n    \"password\": \"tawfiek\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{BASE_URL}}/users/login",
							"host": [
								"{{BASE_URL}}"
							],
							"path": [
								"users",
								"login"
							]
						}
					},
					"response": [
						{
							"name": "Login",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"username\": \"tawfiek\",\n    \"password\": \"tawfiek\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{BASE_URL}}/users/login",
									"host": [
										"{{BASE_URL}}"
									],
									"path": [
										"users",
										"login"
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "X-Powered-By",
									"value": "Express"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=utf-8"
								},
								{
									"key": "Content-Length",
									"value": "309"
								},
								{
									"key": "ETag",
									"value": "W/\"135-ld85ftk2gN+MCbU3SRQpp/zgmzw\""
								},
								{
									"key": "Date",
									"value": "Tue, 08 Feb 2022 09:14:33 GMT"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=5"
								}
							],
							"cookie": [],
							"body": "{\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJUYXdmaWVrIiwiaWQiOjIsImxhc3ROYW1lIjoiS2hhbGFmIiwicGFzc3dvcmQiOiIkMmIkMTAkNm4uaVg3MUNMQklsRm9WcW1waTc3T1NreEh4UVVmcWFoTXJDUnJ6Vk55dWR4aWppbjlsbkciLCJ1c2VybmFtZSI6InRhd2ZpZWsiLCJpYXQiOjE2NDQzMTE2NzN9.c2mZgzZF6yt98q1rnLtAO5v4L9aAXvfV7GqrcjFdyLs\"\n}"
						}
					]
				},
				{
					"name": "Get user Information",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "x-access-token",
								"value": "{{TOKEN}}",
								"type": "text"
							}
						],
						"url": {
							"raw": "{{BASE_URL}}/users/:id",
							"host": [
								"{{BASE_URL}}"
							],
							"path": [
								"users",
								":id"
							],
							"variable": [
								{
									"key": "id",
									"value": "1"
								}
							]
						}
					},
					"response": [
						{
							"name": "Get user Information",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "x-access-token",
										"value": "{{TOKEN}}",
										"type": "text"
									}
								],
								"url": {
									"raw": "{{BASE_URL}}/users/:id",
									"host": [
										"{{BASE_URL}}"
									],
									"path": [
										"users",
										":id"
									],
									"variable": [
										{
											"key": "id",
											"value": "1"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "X-Powered-By",
									"value": "Express"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=utf-8"
								},
								{
									"key": "Content-Length",
									"value": "65"
								},
								{
									"key": "ETag",
									"value": "W/\"41-klOKFjY2w/iJ/G3kCoJ5W1eyrP0\""
								},
								{
									"key": "Date",
									"value": "Tue, 08 Feb 2022 09:14:41 GMT"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=5"
								}
							],
							"cookie": [],
							"body": "{\n    \"firstName\": \"Tawfiek\",\n    \"lastName\": \"Khalaf\",\n    \"username\": \"tawfiek1\"\n}"
						}
					]
				}
			]
		},
		{
			"name": "porducts",
			"item": [
				{
					"name": "Get all products",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "x-access-token",
								"value": "{{TOKEN}}",
								"type": "text"
							}
						],
						"url": {
							"raw": "{{BASE_URL}}/products/",
							"host": [
								"{{BASE_URL}}"
							],
							"path": [
								"products",
								""
							]
						}
					},
					"response": [
						{
							"name": "Get all products",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "x-access-token",
										"value": "{{TOKEN}}",
										"type": "text"
									}
								],
								"url": {
									"raw": "{{BASE_URL}}/products/",
									"host": [
										"{{BASE_URL}}"
									],
									"path": [
										"products",
										""
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "X-Powered-By",
									"value": "Express"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=utf-8"
								},
								{
									"key": "Content-Length",
									"value": "589"
								},
								{
									"key": "ETag",
									"value": "W/\"24d-s2Ue+vw+RzA3Ym7S1Cs+g6bHN8o\""
								},
								{
									"key": "Date",
									"value": "Tue, 08 Feb 2022 09:14:48 GMT"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=5"
								}
							],
							"cookie": [],
							"body": "{\n    \"products\": [\n        {\n            \"id\": 1,\n            \"name\": \"laptop\",\n            \"price\": 12000\n        },\n        {\n            \"id\": 2,\n            \"name\": \"mouse\",\n            \"price\": 200\n        },\n        {\n            \"id\": 3,\n            \"name\": \"Product 1\",\n            \"price\": 100\n        },\n        {\n            \"id\": 4,\n            \"name\": \"Product 1\",\n            \"price\": 100\n        },\n        {\n            \"id\": 5,\n            \"name\": \"Product 1\",\n            \"price\": 100\n        },\n        {\n            \"id\": 6,\n            \"name\": \"Product 1\",\n            \"price\": 100\n        },\n        {\n            \"id\": 7,\n            \"name\": \"Product 1\",\n            \"price\": 100\n        },\n        {\n            \"id\": 8,\n            \"name\": \"Product 1\",\n            \"price\": 100\n        },\n        {\n            \"id\": 9,\n            \"name\": \"Product 1\",\n            \"price\": 100\n        },\n        {\n            \"id\": 10,\n            \"name\": \"Product 1\",\n            \"price\": 100\n        },\n        {\n            \"id\": 11,\n            \"name\": \"Product 1\",\n            \"price\": 100\n        },\n        {\n            \"id\": 12,\n            \"name\": \"Product 1\",\n            \"price\": 100\n        },\n        {\n            \"id\": 13,\n            \"name\": \"Product 1\",\n            \"price\": 100\n        },\n        {\n            \"id\": 14,\n            \"name\": \"Product 1\",\n            \"price\": 100\n        }\n    ],\n    \"success\": true\n}"
						}
					]
				},
				{
					"name": "Get product by id",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "x-access-token",
								"value": "{{TOKEN}}",
								"type": "text"
							}
						],
						"url": {
							"raw": "{{BASE_URL}}/products/",
							"host": [
								"{{BASE_URL}}"
							],
							"path": [
								"products",
								""
							]
						}
					},
					"response": [
						{
							"name": "Get product by id",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "x-access-token",
										"value": "{{TOKEN}}",
										"type": "text"
									}
								],
								"url": {
									"raw": "{{BASE_URL}}/products/:id",
									"host": [
										"{{BASE_URL}}"
									],
									"path": [
										"products",
										":id"
									],
									"variable": [
										{
											"key": "id",
											"value": "1"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "X-Powered-By",
									"value": "Express"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=utf-8"
								},
								{
									"key": "Content-Length",
									"value": "65"
								},
								{
									"key": "ETag",
									"value": "W/\"41-Z6999Nrdg0G5TgqVvvv/FbAmTlc\""
								},
								{
									"key": "Date",
									"value": "Tue, 08 Feb 2022 09:15:08 GMT"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=5"
								}
							],
							"cookie": [],
							"body": "{\n    \"product\": {\n        \"id\": 1,\n        \"name\": \"laptop\",\n        \"price\": 12000\n    },\n    \"success\": true\n}"
						}
					]
				}
			]
		},
		{
			"name": "Orders",
			"item": [
				{
					"name": "Add new order",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "x-access-token",
								"value": "{{TOKEN}}",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "[\n    {\n        \"productID\": 1,\n        \"quantity\": 2\n\n    }\n]",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{BASE_URL}}/orders/",
							"host": [
								"{{BASE_URL}}"
							],
							"path": [
								"orders",
								""
							]
						}
					},
					"response": [
						{
							"name": "Add new order",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "x-access-token",
										"value": "{{TOKEN}}",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "[\n    {\n        \"productID\": 1,\n        \"quantity\": 2\n\n    }\n]",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{BASE_URL}}/orders/",
									"host": [
										"{{BASE_URL}}"
									],
									"path": [
										"orders",
										""
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "X-Powered-By",
									"value": "Express"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=utf-8"
								},
								{
									"key": "Content-Length",
									"value": "16"
								},
								{
									"key": "ETag",
									"value": "W/\"10-oV4hJxRVSENxc/wX8+mA4/Pe4tA\""
								},
								{
									"key": "Date",
									"value": "Tue, 08 Feb 2022 10:53:18 GMT"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=5"
								}
							],
							"cookie": [],
							"body": "{\n    \"success\": true\n}"
						}
					]
				},
				{
					"name": "Get all orders for user",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "x-access-token",
								"value": "{{TOKEN}}",
								"type": "text"
							}
						],
						"url": {
							"raw": "{{BASE_URL}}/orders/",
							"host": [
								"{{BASE_URL}}"
							],
							"path": [
								"orders",
								""
							]
						}
					},
					"response": [
						{
							"name": "Get all orders for user",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "x-access-token",
										"value": "{{TOKEN}}",
										"type": "text"
									}
								],
								"url": {
									"raw": "{{BASE_URL}}/orders/",
									"host": [
										"{{BASE_URL}}"
									],
									"path": [
										"orders",
										""
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "X-Powered-By",
									"value": "Express"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=utf-8"
								},
								{
									"key": "Content-Length",
									"value": "2600"
								},
								{
									"key": "ETag",
									"value": "W/\"a28-jG6zRbaGicti4rDIe+7/L21TpPs\""
								},
								{
									"key": "Date",
									"value": "Tue, 08 Feb 2022 10:53:27 GMT"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=5"
								}
							],
							"cookie": [],
							"body": "{\n    \"orders\": [\n        {\n            \"orderid\": 2,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 3,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 4,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 5,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 6,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 7,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 8,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 9,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 10,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 11,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 12,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 13,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 14,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 15,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 16,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 17,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 18,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 19,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 20,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 21,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 22,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 23,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 24,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 25,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 26,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 27,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 28,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 29,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        },\n        {\n            \"orderid\": 30,\n            \"userfirstname\": \"Tawfiek\",\n            \"userlastname\": \"Khalaf\",\n            \"orderstatus\": \"pending\"\n        }\n    ],\n    \"success\": true\n}"
						}
					]
				}
			]
		}
	]
}
```

