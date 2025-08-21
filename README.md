
# PennyWise – Personal Finance Tracker

PennyWise is a **MERN stack web application** that helps users manage their personal finances by tracking **expenses, incomes, transactions, and budgets**. The system also provides **smart budgeting recommendations** using a Flask-based Python API, integrates **OCR for receipt detection**, and ensures **secure authentication with two-factor verification (2FA)**.

---

## 🚀 Features

* **Expense & Income Tracking** – log daily transactions and view summaries.
* **Budget Management** – set budgets and monitor spending progress.
* **Smart Budget Recommendations** – Flask API generates personalized suggestions.
* **OCR Integration** – scan and process receipts to automatically capture transactions.
* **Secure Authentication** – user login with **JWT** and **two-factor authentication**.
* **API Testing with Jest** – 4 core endpoints tested for stability and reliability.
* **Agile Development** – built following sprints, daily standups, and iterative improvements.

---

## 🛠️ Tech Stack

* **Frontend**: React.js
* **Backend**: Node.js + Express.js
* **Database**: MongoDB
* **API**: Flask (Python) for recommendations
* **Authentication**: JWT + 2FA
* **Testing**: Jest (API tests)

---

## 📦 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/pennywise.git
   cd pennywise
   ```

2. **Install dependencies**

   * Backend

     ```bash
     cd server
     npm install
     ```
   * Frontend

     ```bash
     cd client
     npm install
     ```

3. **Run the application**

   * Start backend:

     ```bash
     npm run dev
     ```
   * Start frontend:

     ```bash
     npm start
     ```

4. **Flask API**

   * Navigate to the Flask folder:

     ```bash
     cd flask-api
     pip install -r requirements.txt
     python app.py
     ```

---

## 🧪 Testing

Run Jest tests for backend APIs:

```bash
npm test
```

---

## 📊 Project Management

* Developed following **Agile methodology**.
* Managed sprints, user stories, and daily stand-ups to ensure timely delivery.

---
