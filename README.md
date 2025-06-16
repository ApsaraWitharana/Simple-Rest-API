# 🚀 Simple REST API – Backend Developer Assignment

Welcome! This is a simple yet robust REST API built with **Node.js** and **Express**, developed as part of the **Backend Developer (Node.js) Internship Assignment** for **Future Code Technology**.

Whether you're a reviewer or just exploring the project, you’ll find everything you need to test and understand this backend system below.

---

## 📦 Features

🔐 **User Functionality**  
- User Registration  
- User Login  
*(Note: Authentication is not required for this task — open endpoints.)*

📦 **Product Management (CRUD)**  
Each product has the following attributes:  
- `name` (String)  
- `price` (Number)  
- `quantity` (Number, optional)  
- `description` (String, optional)  

🗄️ **Database**:  
- Connected to **MySQL** using the `mysql2` driver.

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MySQL**
- **dotenv** (for environment configs)
- **helmet**, **cors**, **rate-limit** (for security & performance)
- **Postman** – for API testing and documentation

---

## 📫 API Testing

All API endpoints can be tested using Postman via the link below:

🔗 **[Postman API Collection – View Online](https://documenter.getpostman.com/view/35385905/2sB2x8EBSE)**

You can test endpoints such as:

### 🧪 Product Endpoints:
- `GET /api/products` – List products (with pagination and search)
- `POST /api/products` – Create a product
- `GET /api/products/:id` – View a product by ID
- `PUT /api/products/:id` – Update a product
- `DELETE /api/products/:id` – Delete a product

### 👤 User Endpoints:
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login user *(no JWT or session – just simulated logic)*

### 🩺 Health Check:
- `GET /api/health` – Verify the API is up and running
---

## ⚙️ Getting Started Locally

To run the project on your machine:

### 1. Clone the Repository
```bash
https://github.com/ApsaraWitharana/Simple-Rest-API.git
```

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

<div align="center">

#### This project is licensed under the [MIT License](LICENSE)

#### © 2025 All Right Reserved, Designed By [Sachini Apsara](https://github.com/ApsaraWitharana)

</div>
