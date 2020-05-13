# Node ecommerce-api
A NodeJS REST API for an e-commerce store.

## Project goal

- Building a RESTful API.
- Performing CRUD operations.
- Writing API endpoints.

## Clone & Build on local

Clone the repository, install node packages and verify routes locally

```
//on local
git clone URL
cd myproject
npm install
nodemon app.js

```

```
On your local browser or POSTMAN 
localhost:3000/api/v1/department
```



## Endpoints
**deparment[s]** : Grocery, Electronics

| Method | URL            | Description                                                                                            |
| ------ | -------------- | ------------------------------------------------------------------------------------------------------ |
| POST   | /api/v1/department/add     | Creates item in specific department using the information sent inside the `request body`.                                   |
| GET    | /api/v1/department     | Returns an array items in the department.                                                                                |
| GET    | /api/v1/department/:id | Returns the grocery with the specified `name` & electronic with specified `sku`.                                                       |
| DELETE | /api/v1/department/:id | Removes the grocery with the specified `name` & electronic with specified `sku`. Returns the deleted item                               |
| PUT/PATCH  | /api/v1/department/:id| Updates the grocery with the specified `name` & electronic with specified `sku`. Returns the modified item |

### Schema

```js
Grocery

{
productName: String, required
store: String,
quantity: Number,
price: Number,
//vendor: Object.id
}


Electronics

{
brand: String, required
desc: String,
store: String,
quantity: Number,
price: Number,
sku: Number, required
//vendor: Object.id
}


```

## Project  structure
```sh
.
├── app.js
├── package.json
├── models
│   ├── electronics.model.js
│   ├── grocery.model.js
│   └── vendor.model.js
├── routes
    ├── electronics.js
    ├── grocery.js
    └── vendor.js

```



## Contributing
Suggestions are welcomed. Please create an issue and share.


## License
[MIT](https://choosealicense.com/licenses/mit/)
