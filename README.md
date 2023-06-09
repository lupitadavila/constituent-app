## Constituent App

Having fun with Next.js

## Project Details
- [Notes](https://docs.google.com/document/d/1eezHGG-Sf3d1bdJkT4-P-4tgo1XEsHTkYdsD4YRConw/edit?usp=sharing)
- See the [deployed](https://clinquant-duckanoo-476a03.netlify.app/) app


## Betterments
- use [SWR](https://swr.vercel.app/) — a custom hook library that handles caching, revalidation, focus tracking, re-fetching on the interval, and more
- improve state management
- handle cleaning/merging
- incorporate CSV file import
- add tests

## Getting Started

Create an `.env` file with database url

Set up database 
```bash
npx prisma init
# then
npx prisma generate
```


### npm commands
run development server
```bash
npm run dev
```

build
```bash
npm run build
```
lint
```bash
npm run lint
```


### DB commands

Apply db migrations
```bash
npx prisma migrate dev
```
View db locally
```bash
npx prisma studio
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


* This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


