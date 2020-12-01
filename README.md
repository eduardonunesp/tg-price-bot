# TG-PRICE-BOT

## Install

```bash
npm install
# or
yarn install
```

## Create Database

```bash
# Create database
sqlite3 price_bot.sqlite
```

```sql
-- Create the session table
create table 'price_bot_session'
(
  id      varchar(255) primary key,
  session varchar(255)
);
```

## Set your TELEGRAM BOT_TOKEN

```bash
export BOT_TOKEN="<YOUR_BOT_TOKEN>"
```

## Running

```bash
yarn start
# or
npm start
```
