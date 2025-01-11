# Task Management App

Welcome to the **Task Management App**, a modern and intuitive application designed to help you manage your tasks efficiently. With features like focus mode, task prioritization, and user authentication, this app ensures you stay productive and organized.

---

## 🚀 Features

- **User Authentication**: Secure login and registration using NextAuth.
- **Task Management**: Create, update, and delete tasks with ease.
- **Focus Mode**: Set a timer to focus on tasks and track your progress.
- **Task Prioritization**: Assign priorities (Low, Medium, High) to your tasks.
- **Responsive Design**: Fully responsive UI for seamless use on any device.

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

- **Next.js**: Framework for building the app.
- **Prisma**: ORM for database management.
- **NextAuth**: Authentication library.
- **Tailwind CSS**: For styling the UI.
- **TypeScript**: For type safety and better developer experience.

---

## 📷 Screenshots

_Add screenshots of the app here to showcase its UI and features._

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📄 License

This project is licensed under the MIT License.

---

Start managing your tasks like a pro with the **Task Management App**! 🎉
