# small web

A small web of one-page sites, and the browser you read them in.

## Run

```sh
docker compose up -d          # MongoDB on localhost:27017

cd api
npm install
npm run seed                  # 5 people, 11 sites, an hour of history; safe to rerun
npm run start:dev             # API on http://localhost:4000
```

## Seed

```sh
npm run seed                  # (in api/) upsert the web, replace the seeded history, keep everything else
npm run seed -- --reset       # drop the database first: back to exactly the seeded state
```

## Test

```sh
npm test                      # (in api/) address rules, sanitizer, search snippets
```

`MONGO_URL` (default `mongodb://localhost:27017/smallweb`) and `PORT` (default `4000`) override the defaults.
