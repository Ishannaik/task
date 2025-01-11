# 🌟 Task Management App

Welcome to the **Task Management App**, a modern and intuitive application designed to help you manage your tasks efficiently. With features like focus mode, task prioritization, and user authentication, this app ensures you stay productive and organized.

<p align="center">
  <img src="public/globe.svg" alt="App Logo" width="150" />
</p>

---

## 📚 Table of Contents
- [🚀 Features](#-features)
- [🛠️ Setup Instructions](#️-setup-instructions)
- [📖 Usage](#-usage)
- [🧰 Technologies Used](#-technologies-used)
- [📷 Screenshots](#-screenshots)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🚀 Features

✨ **User Authentication**: Secure login and registration using NextAuth.  
📝 **Task Management**: Create, update, and delete tasks with ease.  
⏱️ **Focus Mode**: Set a timer to focus on tasks and track your progress.  
📊 **Task Prioritization**: Assign priorities (Low, Medium, High) to your tasks.  
📱 **Responsive Design**: Fully responsive UI for seamless use on any device.

---

## 🛠️ Setup Instructions

Follow these steps to set up the project locally:

1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/your-repo/task-management-app.git
   cd task-management-app
   ```

2. **Install Dependencies**:  
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:  
   Create a `.env` file in the root directory and add the following:  
   ```
   DATABASE_URL=your-database-url
   NEXTAUTH_SECRET=your-nextauth-secret
   ```

4. **Run Prisma Migrations**:  
   ```bash
   npx prisma migrate dev --name initial_migration
   ```

5. **Start the Development Server**:  
   ```bash
   npm run dev
   ```

---

## 📖 Usage

1. **Login/Register**: Start by logging in or registering a new account.  
2. **Create Tasks**: Add tasks with a title, description, due date, and priority.  
3. **Focus Mode**: Use the focus mode to work on tasks with a timer.  
4. **Manage Tasks**: Update or delete tasks as needed.

---

## 🧰 Technologies Used

- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)  
- ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)  
- ![NextAuth](https://img.shields.io/badge/NextAuth-000000?style=for-the-badge&logo=auth0&logoColor=white)  
- ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

---

## 📷 Screenshots

<p align="center">
  <img src="public/next.svg" alt="Screenshot 1" width="300" />
  <img src="public/vercel.svg" alt="Screenshot 2" width="300" />
</p>

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📄 License

This project is licensed under the MIT License.

---

Start managing your tasks like a pro with the **Task Management App**! 🎉
