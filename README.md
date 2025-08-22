<h3 align="center">A University Library Management System with Admin Panel</h3>
<!-- talk about how workflow, qstash and emailjs work together -->
## ⚠️ Note

This project was implemented based on a tutorial video on YouTube from JS Mastery [Build and Deploy a Fullstack App with Admin Dashboard | Next.js, PostgreSQL, Redis, Auth.js](https://www.youtube.com/watch?v=EZajJGOMWas).

Since the whole project is split into 2-part videos ( Part 2 on **JS Mastery Pro** ). So I implemented only Part 1

## Table of Contents

1. [Introduction](#introduction)
2. [Demo](#demo)
3. [Tech Stack](#tech-stack)
4. [Features](#features)
5. [Quick Start](#quick-start) /
6. [What I learned](#learn)
7. [Implementation Notes](#note)
8. [Missing Features](#miss)

## <a name="introduction">Introduction</a>

## <a name="demo">Demo</a>

### Authentication

#### Sign Up +

<a href="">
  <img src="public/readme/signup.gif" alt="Sign Up" />
</a>

#### Sign In

<a href="">
  <img src="public/readme/signin.gif" alt="Sign In" />
</a>

### Onboarding email

#### Welcome email

<a href="">
  <img src="public/readme/welcome.gif" alt="Welcome" />
</a>

#### Approved account email

<a href="">
  <img src="public/readme/approved.gif" alt="Approved" />
</a>

#### Inactive reminder email

<a href="">
  <img src="public/readme/inactive.gif" alt="Inactive" />
</a>

#### Congratulations email after becoming active again

<a href="">
  <img src="public/readme/active.gif" alt="Active" />
</a>

#### Borrowed book reminder email

<a href="">
  <img src="public/readme/borrowed.gif" alt="Borrowed" />
</a>

#### Borrowed book due date reminder email

<a href="">
  <img src="public/readme/due.gif" alt="Due" />
</a>

#### Borrowed book overdue reminder email (Penalty)

<a href="">
  <img src="public/readme/penalty.gif" alt="Penalty" />
</a>

### User Role

#### Home Page (Latest books)

<a href="">
  <img src="public/readme/home.gif" alt="Home" />
</a>

#### Library Page (All books + search + pagination + filters)

<a href="">
  <img src="public/readme/library.gif" alt="Library" />
</a>

#### Book Detail Page + Similar books + Borrow button( For approved users)

<a href="">
  <img src="public/readme/book.gif" alt="Book" />
</a>

#### Profile Page (Borrowed books + book receipt)

<a href="">
  <img src="public/readme/profile.gif" alt="Profile" />
</a>

### Admin Role (Web portal)

#### Dashboard (Statistics + New users + Books + Borrow requests + More)

<a href="">
  <img src="public/readme/admin-dashboard.gif" alt="Admin Dashboard" />
</a>

#### Users Management

<a href="">
  <img src="public/readme/admin-users.png" alt="Users" />
</a>

#### Books Management

<a href="">
  <img src="public/readme/admin-books.png" alt="Books" />
</a>

#### Account Requests

<a href="">
  <img src="public/readme/admin-account-requests.png" alt="Account Requests" />
</a>

## <a name="tech-stack">Tech Stack</a>

- React v19 - as a JS library
- Next.js v15 - as a React framework
- TypeScript - as a type-checking tool
- Auth.js v5 (known as NextAuth.js) - as an authentication tool
- Neon - cloud `PostgreSQL` database
- drizzle - as an ORM for the SQL database which include `PostgreSQL` and provide driver/adapters to connect to cloud databases like `Neon`. It also provide schema generation and migration tools.
- Upstash Redis - for
  `Upstash Rate Limit` feature, `rate limiting` which use `Redis` to track IP address and number of requests per minute(calculate using Fixed Window algorithm)
- Upstash Workflow - for scheduled automated tasks with multiple steps
- ImageKit - for image and video storage and optimization, and transformations when displaying
- Tailwind CSS v4 - as a CSS framework
- ShadCN - as a UI component library

- mailjs - as an email sender instead of Resend that recommended by tutorial video since Resend requires a real domain to send email from.
- vercel - as a deployment tool

- react-hook-form - as a form handling tool
- zod - as a schema validation tool

## <a name="features">Features</a>

Features of the University Library Management System Project

- Open-source Authentication: Personalized onboarding flow with email notifications.
- Home Page: Highlighted books and newly added books with 3D effects.
- Library Page: Advanced filtering, search, and pagination for book discovery.
- Book Detail Pages: Availability tracking, book summaries, videos, and suggestions for similar books.
- Profile Page: Manage accounts, track borrowed books, and download receipts.
- Onboarding Workflows: Automated welcome emails when users sign up, with follow-ups based on inactivity or activity dates.
- Borrow Book Reminder: Customized email notifications sent before, on, and after the due date, reminding users to return books or avoid charges.
- Borrow Book Receipt: Automatically generates a customized PDF receipt when a book is successfully borrowed.
- Analytics Dashboard: Statistics, new users, books, borrow requests, and more.
- All Users Page: View and manage users, including approving or revoking access.
- Account Requests Page: Admin approval for account requests, with email notifications for user verification.
- All Books Page: List and manage all library books with advanced search, pagination, and filters.
- Book Management Forms: Add new books and edit existing entries.
- Book Details Page: Detailed book information for administrators.
- Borrow Records Page: Complete borrow history with pagination and search.
- Role Management: Change user roles to invite more admins, with email notifications sent upon role updates.
- Advanced Functionalities: Caching, rate-limiting, DDoS protection, and custom notifications.
- Database Management: Postgres with Neon for scalable and collaborative database handling.
- Real-time Media Processing: ImageKit for image and video optimization and transformations.
- Efficient Caching: Upstash Redis for caching, workflows, and triggers.
- Database ORM: Drizzle ORM for simplified and efficient database interactions.
- Modern UI/UX: Built with TailwindCSS, ShadCN, and other cutting-edge tools.
- Technology Stack: Next.js with TypeScript for scalable development, and NextAuth for robust authentication.
- Seamless Email Handling: MailJS for automated email communications, including notifications and updates.

## <a name="quick-start">Quick Start</a>

Follow these steps to set up the project locally on your machine.

### Prerequisites

- Git
- Node.js
- npm

### Cloning the Repository

```bash
git clone https://github.com/bank8426/try-next-nextauth-tailwindcss-shadcn-postgresql-neon-drizzle-redis-resend-vercel.git
cd try-next-nextauth-tailwindcss-shadcn-postgresql-neon-drizzle-redis-resend-vercel
```

### Installation

Install the project dependencies using npm:

```bash
npm install
```

### Set Up Environment Variables

1. Create a new file named `.env.development.local` and copy the content inside `.env.example`
2. Replace the placeholder values with your actual credentials

```env
# imagekit.io
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=

NEXT_PUBLIC_API_ENDPOINT=http://localhost:3000

# neon.tech
DATABASE_URL=

# Added by `npx auth secret`. Read more: https://cli.authjs.dev
AUTH_SECRET=

# upstash redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# upstash qstash
QSTASH_URL=
QSTASH_TOKEN=

# vercel deployed app endpoint
NEXT_PUBLIC_PROD_API_ENDPOINT=

# emailjs
EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
EMAILJS_PUBLIC_KEY=
EMAILJS_PRIVATE_KEY=
```

**Running the Project**

```bash
npm run dev
```

Your server will run on [http://localhost:3000](http://localhost:3000/)

## <a name="learn">What I learned</a>

- Auth.js

  - Initialize Auth.js - By default they provide authentication process include built-in sign in and sign up pages for all providers they support. So no need to build it from scratch by yourself. But you can also do it. Like in this project, it has custom sign in page and custom logic for to handle email and password authentication process.

    - To create custom sign in and make Auth.js know about it, you need to define the path to `signIn` in `pages` option.
    - To customize the authentication process that work with email/username and password, you need to use `CredentialsProvider` in `providers` option and then add `authorize` function to then handle the authentication process as you like. You can see more details in https://authjs.dev/getting-started/authentication/credentials

- zod

## <a name="note">Implementation Notes</a>

- Tailwind CSS

  - Same issue as the previous [project](https://github.com/bank8426/try-next-nextauth-tailwind-sanity-sentry). Since the tutorial video was published when `v3` was still in use, but `v4` is out when I try to implement this project. So I need to update the code to match `v4`, and this change affects the structure of the project. Since many files are not needed anymore, like `tailwind.config` and `postcss.config`, some tailwind property names have changed, use `@utility` instead of `@layer utilities` classes, and more. You can see more details in https://tailwindcss.com/docs/upgrade-guide. But for this project, you can see below what I did to make it work. (But honestly, just install TailwindCSS v3 and it will work without a headache)

    - Migration `Tailwind CSS v3` to `Tailwind CSS v4`

      - In `app/globals.css`
        1. Remove old import
        ```
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        ```
        2. In case of still using `tailwind.config.ts` in `v4`, add the following import instead
        ```
        @import "tailwindcss"
        @config "./../tailwind.config.ts"
        ```
      - `!important` not working anymore, you need to add `!` in front of every property name you want to override.

- shadcn

  - `Toast` component is `deprecated`. But they have a `sonner` package that provides functionality similar to the `Toast` component.

- Next.js

  - When using images from external sources, you always need to update the configuration in `next.config.js` by adding the `remotePatterns` with the domain of the external source to the `images` property.
    - Example in `next.config.ts`
      ```ts
      const nextConfig: NextConfig = {
        images: {
          remotePatterns: [
            {
              protocol: "https",
              hostname: "placehold.co",
            },
            {
              protocol: "https",
              hostname: "ik.imagekit.io",
            },
            ... // in case you have other external sources
          ],
        },
        ... //other config options
      }
      ```

- workflow

  - this time we follow official example from upstash workflow https://upstash.com/docs/workflow/examples/customerOnboarding which follow their recommended best practices, not like in another tutorial video that i did in https://github.com/bank8426/try-express-mongodb

- Qstash with EmailJS API
  - Qstash publishJSON
    EmailJS API accessToken field
    there are two ways to send email
  1. using SDK (there split into 2 main types of SDK, one is for server side(Node.js or Next.js but on API route or server components) and one is for browser side like React or Next.js on client side pages or components)
  2. using REST API
     Since we design to use Qstash as middleman to handle the email sending process, we will use REST API and supplie all required fields for EmailJS into the body of publishJSON.
     <!-- https://www.emailjs.com/docs/sdk/send/ -->
     <!-- https://www.emailjs.com/docs/rest-api/send/ -->
     `accessToken` in `camelCase`(other parameters are in `snake_case`) is required for EmailJS API but in document said it not required which confuses me.

## <a name="miss">Missing Features</a>
