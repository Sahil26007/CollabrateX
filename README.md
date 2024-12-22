# CollabrateX

CollabrateX is a collaborative workspace platform designed to empower teams by enabling seamless project creation, sharing, and collaboration. Built with Next.js, React, and TailwindCSS, it incorporates real-time features and robust authentication mechanisms to ensure secure and efficient teamwork.

## Features

### 🛠 Collaborative Workspace
- **Real-Time Collaboration**: Enable multiple users to collaborate on projects simultaneously using Liveblocks.
- **Seamless Sharing**: Easily share projects and updates with team members.

### 🔑 Secure Authentication & Authorization
- **Clerk Integration**: Provides user authentication for secure access and management of accounts.

### ⚡ Optimized User Experience
- **Modern UI**: Developed with TailwindCSS for a sleek and responsive interface.
- **Next.js**: Ensures fast server-side rendering (SSR) for enhanced performance and SEO.

### 📡 API Integrations
- **Gemini API**: Enhances data connectivity and enables advanced functionalities.

### 📊 Admin Dashboard
- **Activity Monitoring**: Track team activities and manage workspace settings efficiently.

## Tech Stack

| Technology      | Description                                  |
|-----------------|----------------------------------------------|
| **Next.js**     | Framework for React, enabling SSR and routing |
| **React**       | Frontend library for building user interfaces |
| **TailwindCSS** | Utility-first CSS framework for rapid UI styling |
| **Clerk**       | Authentication and user management service  |
| **Liveblocks**  | Real-time collaboration tools               |
| **Gemini API**  | Data integration and advanced connectivity   |

## Installation & Setup

Follow these steps to clone and run the project locally.

### Prerequisites

- Node.js installed (version >= 14.x)
- 
- Clerk account for authentication
- Liveblocks API keys

### Clone the Repository

```bash
git clone https://github.com/Sahil26007/CollabrateX.git
cd CollabrateX
```

### Configure Environment Variables

Create a `.env` file in the root directory and populate it with the following keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=  Your_clerk_public_key
CLERK_SECRET_KEY= Your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_FIREBASE_API_KEY= your_key
LIVEBLOCK_SK=
NEXT_PUBLIC_LIVEBLOCK_PK= 
```

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Navigate to `http://localhost:3000` in your browser to access the application.



Home Page
![Screenshot 2024-12-23 001445](https://github.com/user-attachments/assets/f19eda71-2f54-4bfa-a822-8fb23630c05f)

Sign-In page using Clerk Authentication 
![Screenshot 2024-12-23 001500](https://github.com/user-attachments/assets/cfe26938-b39a-4bef-891b-2201befd82f6)

Manage and Add Workspace Page 
![Screenshot 2024-12-23 001614](https://github.com/user-attachments/assets/338d377b-4a86-4b9b-90d5-4bdd96eea0ee)

Workspace of the User which they can work it with their team and alone also
![Screenshot 2024-12-23 001647](https://github.com/user-attachments/assets/2079de1c-55e1-4a81-9848-6212675c7e61)

