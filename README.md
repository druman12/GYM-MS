# 🏋️‍♂️ Gym Management System

## 📌 Overview
The Gym Management System is a web-based application that helps gym administrators, trainers, and members manage gym-related activities efficiently. It provides three user roles: Member, Trainer, and Admin, each with distinct functionalities.

## 🛠 Technologies Used
- **🖥 Backend**: Django (Python)
- **🎨 Frontend**: React.js with standard CSS
- **🗄 Database**: MySQL

## 🔥 Features

### 👤 Member
- 🔑 Login and access personal details.
- 📊 View attendance records.
- 🏋️ Check assigned batches and personal training sessions.

### 🏅 Trainer
- 👀 View details of members.
- 📝 Mark attendance for members.
- 📆 Manage batches and personal training sessions.

### 🛠 Admin
- ➕ Add, update, and delete members and trainers.
- 🔧 Manage all aspects of the gym system, including attendance and training sessions.

## ⚙️ Installation & Setup

### ✅ Prerequisites
Ensure you have the following installed:
- 🐍 Python (3.x)
- 🌐 Node.js & npm
- 🏦 MySQL

### 🔧 Backend Setup
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd gym_MS
   ```
2. Create a virtual environment and activate it:
   ```sh
   python -m venv venv
   source venv/bin/activate   # For macOS/Linux
   venv\Scripts\activate      # For Windows
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Apply database migrations:
   ```sh
   python manage.py migrate
   ```
5. Create a superuser (for admin access):
   ```sh
   python manage.py createsuperuser
   ```
6. Start the Django server:
   ```sh
   python manage.py runserver
   ```

### 🎨 Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm start
   ```

## 🚀 Usage
- Open `http://localhost:8000` for the backend API.
- Open `http://localhost:3000` for the frontend interface.
- 🔑 Login with your credentials (Admin, Trainer, or Member) to access respective dashboards.

## 🤝 Contributing
Feel free to contribute to this project by submitting issues or pull requests.

## 📜 License
This project is licensed under the MIT License.
