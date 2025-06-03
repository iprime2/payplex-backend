# Payplex Backend

This is the backend for the Payplex Admin/User system, built with TypeScript, Express.js, PostgreSQL, and Swagger for API documentation.

---

## 🌐 Production Deployment

The application is deployed at:
- Backend: https://payplex-backend.onrender.com/api
- Swagger: https://payplex-backend.onrender.com/api-docs/

---

## 🚀 Requirements

- Node.js v18+
- npm
- PostgreSQL (locally or via Docker)

---

## 🛠 Setup

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/payplex-backend.git
cd payplex-backend
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Update values like:

```
PORT=5000
DATABASE_URL=db_url
API_BASE_URL=backend_url
JWT_SECRET=your_jwt_secret
```

4. **Run migrations or seed data**

```bash
npm run migration:run
npm run seed
```

---

## 🧪 Run Locally

### Development Mode:

```bash
npm run dev
```

### Production Build:

```bash
npm run build
npm start
```

---

## 🐳 Run with Docker

Ensure Docker is installed.

```bash
docker build -t payplex-backend .
docker run -p 5000:5000 --env-file .env payplex-backend
```

---

## 📚 API Docs

After running, visit:

```
http://localhost:5000/api-docs
```

---

## 📁 Uploads

Logos and banner images are stored in the `uploads/logos` directory.

Ensure this folder is created if not already:

```bash
mkdir -p uploads/logos
```

---

## ✅ Lint & Format

```bash
npm run lint
npm run format
```
