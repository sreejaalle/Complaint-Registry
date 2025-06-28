# **ComplaintCare - Smart Complaint Management System**

**ComplaintCare** is a **full-stack web application** designed to streamline the process of lodging, assigning, and resolving complaints in an **efficient, user-friendly** manner. It features **role-based access** for **Ordinary Users**, **Agents**, and **Admins**, with **real-time updates** and a built-in **chat system**.

---

## ** Features**

### **User Roles**
- **Ordinary Users** can **register complaints** and **track their status**.
- **Agents** are **assigned complaints** and can **update resolution statuses**.
- **Admins** manage all users and **assign complaints to agents**.

### **Complaint Management**
- **Submit**, **track**, and **manage complaints** by **category**, **location**, and **status**.
- **Admins** can **view all complaints** and **assign them to agents**.

### **Live Chat System**
- Integrated **chat** between **agents** and **users** for each complaint (via **ChatWindow** component).

### **Authentication & Authorization**
- **Secure login system** with **role-based redirects**.
- **Data protection** using **local storage** for session handling.

### **Phone Input & Form Validation**
- **Responsive** signup/login forms with **phone number input** and **validations**.

### **Clean UI with Bootstrap**
- **Fully responsive design** using **React-Bootstrap** for a **professional user experience**.

---

##  Tech Stack**

- **Frontend**: React.js, React-Bootstrap, React-Router  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose ODM)  
- **Real-time Chat**: Custom messaging model (**MongoDB-based**)  
- **Styling**: CSS + Bootstrap  
- **Phone Input UI**: react-phone-input-2  

---

##  How to Run Locally**

### **Clone the repository**
```bash
git clone https://https://github.com/sreejaalle/complaint-repository.git
cd ComplaintCare
```

### **Setup backend**
```bash
cd backend
npm install
npm start
```

### **Setup frontend**
```bash
cd frontend
npm install
npm start
```

>  Make sure **MongoDB is running locally** or connect to your **MongoDB Atlas cluster**.

---

##  Folder Structure**

```
/backend
├── models/
├── routes/
└── server.js

/frontend
├── pages/
├── components/
└── App.js
```

---

## Future Improvements**

- **Add file uploads** for complaint proof  
- **Role-based dashboard analytics**  
- **Notification system** (email/SMS)



