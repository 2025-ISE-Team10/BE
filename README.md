# BE

Backend of ISE Final Project - Team 10

# API들을 웹사이트에서 보는 방법

Run 후 localhost:9999/reference

# 실행 절차

Create `.env` file

```sh
cp .env.test .env
```

Install dependencies

```sh
pnpm install
```

Create sqlite db / push schema

```sh
pnpm drizzle-kit push
```

Run

```sh
pnpm dev
```

# 프로그램 test

Lint

```sh
pnpm lint
```

Lint fix

```sh
pnpm lint --fix
```

Test

```sh
pnpm test
```

🛠️ Tech Stack
Framework: Hono
ORM: Drizzle
Database: SQLite
Testing: Vitest
API Spec: OpenAPI (via zod-openapi + Scalar)
