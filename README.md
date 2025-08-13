# Health Meet

Health Meet is a MERN-based doctor appointment platform that lets patients find doctors, book/cancel/complete appointments, and handle payments. Admins manage doctors, users, and platform data.
Link 🔗: https://healthmeet-1.onrender.com
---

## Features
- JWT auth with role-based access (user/admin)
- Doctor profiles & admin approval
- Appointment booking, listing, cancel/complete
- File uploads (Multer → Cloudinary)
- Separate **Frontend** (patient) and **Admin** dashboards

---

## Tech Stack
**Frontend/Admin:** React, React Router, Tailwind  
**Backend:** Node.js, Express.js, Mongoose  
**DB:** MongoDB Atlas  
**Uploads:** Multer, Cloudinary

---

## Project Structure
> ![Project stru Screenshot]("./proj structure.png")


---

## Quick Start

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas project
- (Optional) Cloudinary, Stripe, Razorpay keys

### Setup
```bash
# clone your repo
git clone https://github.com/<your-username>/<your-repo>.git health-meet
cd health-meet

# install
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install




Author: Ananya


