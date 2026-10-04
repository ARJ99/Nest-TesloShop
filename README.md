<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Nest-TesloShop 🚀

This project is a RESTful API for an e-commerce platform called TesloShop, built with NestJS and TypeScript. It provides functionalities for user authentication, product management, and seeding the database with initial data.

## ✨ Features

- **User Authentication:** Secure registration, login, and protected routes using JWT.
- **Product Management:** CRUD operations for products, including image uploads.
- **Role-Based Access Control:** Different user roles (e.g., user, admin) with restricted access to certain endpoints.
- **Database Integration:** Uses PostgreSQL with TypeORM for data persistence.
- **Data Seeding:** A mechanism to populate the database with initial users and products.
- **API Documentation:** Swagger UI integrated for easy API exploration.
- **Input Validation:** Utilizes class-validator for robust data validation.

## 🛠️ Tech Stack

- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** Passport.js, JWT
- **Validation:** class-validator, class-transformer
- **Utilities:** bcrypt, uuid
- **Development Tools:** Docker (for database), ESLint, Prettier

## 🚀 Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/ARJ99/Nest-TesloShop.git
    cd Nest-TesloShop
    ```

2.  **Install dependencies:**

    ```bash
    yarn install
    # or
    npm install
    ```

3.  **Set up environment variables:**
    - Create a `.env` file by copying the `.env.template`:
      ```bash
      cp .env.template .env
      ```
    - Configure your PostgreSQL database connection details in the `.env` file (e.g., `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`).

4.  **Start the PostgreSQL database:**
    - If you have Docker installed, you can use the provided `docker-compose.yaml` file:
      ```bash
      docker-compose up -d
      ```
    - Alternatively, ensure your PostgreSQL server is running and accessible with the credentials provided in your `.env` file.

5.  **Run the database seed (optional but recommended):**
    This will populate your database with initial users and products.

    ```bash
    yarn start:dev
    # Then, access the seed endpoint in your browser or with a tool like Postman:
    # http://localhost:3000/api/seed
    ```

6.  **Start the development server:**
    ```bash
    yarn start:dev
    # or
    npm run start:dev
    ```

## 📚 Usage

This API exposes several endpoints for managing users and products. The base URL for the API is `http://localhost:3000/api`.

### Authentication Endpoints 🔐

- **Register a new user:**

  ```http
  POST /auth/register
  ```

  **Body:** `CreateUserDto` (email, password, fullName)

- **Login a user:**

  ```http
  POST /auth/login
  ```

  **Body:** `LoginUserDto` (email, password)
  **Response:** Returns user information and a JWT token.

- **Access private routes (requires JWT):**
  Include the JWT token in the `Authorization` header as a Bearer token.
  ```http
  GET /auth/private
  GET /auth/private2 (requires admin role)
  GET /auth/private3 (requires admin role)
  ```

### Product Endpoints 📦

- **Create a new product (requires 'user' role):**

  ```http
  POST /products
  ```

  **Body:** `CreateProductDto`

- **Get all products (paginated):**

  ```http
  GET /products?limit=10&offset=0
  ```

- **Get a product by ID or slug:**

  ```http
  GET /products/:term
  ```

- **Update a product (requires 'admin' role):**

  ```http
  PATCH /products/:id
  ```

  **Body:** `UpdateProductDto`

- **Delete a product (requires 'admin' role):**
  ```http
  DELETE /products/:id
  ```

### File Uploads 🖼️

- **Upload a product image:**

  ```http
  POST /files/product
  ```

  **Form-data:** `file` (image file)
  **Response:** Returns the secure URL of the uploaded image.

- **Get a static product image:**
  ```http
  GET /files/product/:imageName
  ```

### Seed Endpoint 🌿

- **Run the database seed:**
  ```http
  GET /seed
  ```
  _Note: This endpoint might require admin privileges depending on the implementation details not fully visible in the analysis._

## 📂 Project Structure

```
Nest-TesloShop/
├── public/
│   └── index.html
├── src/
│   ├── auth/
│   │   ├── decorators/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── guards/
│   │   ├── interfaces/
│   │   ├── strategies/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   ├── common/
│   │   ├── dtos/
│   │   └── common.module.ts
│   ├── files/
│   │   ├── helpers/
│   │   ├── files.controller.ts
│   │   ├── files.module.ts
│   │   └── files.service.ts
│   ├── products/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── products.controller.ts
│   │   ├── products.module.ts
│   │   └── products.service.ts
│   ├── seed/
│   │   ├── data/
│   │   ├── seed.controller.ts
│   │   ├── seed.module.ts
│   │   └── seed.service.ts
│   ├── app.controller.ts (Not explicitly analyzed, but implied)
│   ├── app.module.ts
│   └── main.ts
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .dockerignore (Not analyzed, but likely exists)
├── .eslintrc.js
├── .env.template
├── .gitignore (Not analyzed, but likely exists)
├── .prettierrc
├── docker-compose.yaml
├── nest-cli.json
├── package.json
└── tsconfig.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Submit a pull request.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## 📄 License

This project is not explicitly licensed. Please refer to the repository for any specific licensing information.

## 🔗 Important Links

- **Repository:** [Nest-TesloShop](https://github.com/ARJ99/Nest-TesloShop)

## 📝 Footer

© 2026 [ARJ99](https://github.com/ARJ99). All rights reserved.

Built with ❤️ using NestJS.

[Back to Top](#readme-top)

---




