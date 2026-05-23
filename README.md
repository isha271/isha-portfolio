# Isha Shrivastava — Portfolio

Personal portfolio of **Isha Shrivastava**, AI/ML Engineer at VIT Chennai. Built with Next.js 14, TypeScript, and Tailwind CSS. Features an animated hero, in-depth project case studies, research section, experience timeline, and an AI-powered chatbot.

🔗 **Live:** [isha-portfolio.vercel.app](https://isha-portfolio-jet.vercel.app/) 

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Database | MongoDB + Mongoose (contact form) |
| AI Chatbot | Anthropic Claude API |
| Deployment | Vercel |

---

## Features

- **Animated hero** with particle canvas and profile picture
- **Project case studies** — SugarSync, MoE-RAG FinIntel, CipherMsg, NeuralCrypt — with full methodology, metrics, and code snippets
- **Research section** with paper details
- **Experience timeline**
- **Skills section**
- **Contact form** (MongoDB-backed)
- **AI chatbot** (Claude-powered, answers questions about the portfolio)

---

## Project Structure

```
portfolio3/
├── app/
│   ├── page.tsx              # Root page
│   ├── layout.tsx            # App layout + fonts
│   ├── globals.css           # Global styles + reveal animations
│   └── api/
│       ├── chat/route.ts     # AI chatbot endpoint
│       └── contact/route.ts  # Contact form endpoint
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ChatBot.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── Projects.tsx
│       ├── Research.tsx
│       ├── Experience.tsx
│       ├── Skills.tsx
│       ├── About.tsx
│       └── Contact.tsx
├── lib/
│   ├── mongodb.ts
│   └── models/Contact.ts
└── public/
    └── profile.jpg
```

---

## Contact

**Isha Shrivastava**
VIT Chennai · AI & ML Engineering · 2026

[GitHub](https://github.com/isha271) · [LinkedIn](www.linkedin.com/in/isha-shrivastava-0628b1355) 
