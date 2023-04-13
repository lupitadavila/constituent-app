This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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
prisma migrate dev
```
View db locally
```bash
prisma studio
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


