# Future Blink Shopify App Task

Hey there! This is my submission for the Shopify App Developer task. I built this app using the MERN stack integrated into Shopify's modern Remix framework.

The app allows merchants to type an announcement in their Shopify Admin dashboard, which is then saved to a MongoDB database for auditing and synced to the storefront using Shopify Metafields and a Theme App Extension.

## 🔗 Live Demo
- **Deployed URL:** `https://your-vercel-app-url.vercel.app` *(Note: Update this link once deployed)*
- **Loom Video Demo:** [Link to your video here]

## 🛠 What I Used
- **Frontend:** React, Shopify Polaris components
- **Backend:** Node.js, Express (via Remix Actions), Shopify GraphQL Admin API
- **Database:** MongoDB
- **Storefront:** Liquid, Theme App Extension (App Embed Block)

## 💻 How to Run Locally

If you want to run this code on your own machine:

1. Clone this repository and open it in your terminal.
2. Run `npm install` to get all the packages.
3. Create a `.env` file in the root folder and add a MongoDB connection string:
   ```env
   MONGODB_URI=your_mongodb_connection_string_here
   ```
4. Run `npm run dev`.
5. Follow the CLI prompt to install the app on your Shopify Development store.
6. Once inside the app, type a message and click Save. 
7. To see it on the storefront, go to your Theme Editor, click the "App embeds" icon on the left, and turn on the "Announcement Banner".

## 📦 Deployment on Vercel

The backend and frontend are hosted on Vercel. 

In a local environment, Shopify's CLI automatically manages the environment variables (like API keys) for us. However, in production on Vercel, I had to manually set the following variables in the Vercel dashboard so the app can talk to Shopify:
- `SHOPIFY_API_KEY`
- `SHOPIFY_API_SECRET`
- `SHOPIFY_APP_URL`
- `SCOPES`
- `MONGODB_URI`

The MongoDB IP access is also set to `0.0.0.0/0` so Vercel's dynamic IPs can connect to it.
