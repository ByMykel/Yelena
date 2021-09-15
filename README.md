### About Yelena

Yelena is a self-hosted flashcard program using spaced repetition, a technique for fast and long-lasting memorization.

### Images

![Decks](https://i.imgur.com/1bcMami.jpg)
![Individual Deck](https://i.imgur.com/ZUvcIqg.jpg)
![Studying a Deck](https://i.imgur.com/BbK14HL.jpg)

### Docker

Clone the git repository on your computer

```
git clone https://github.com/ByMykel/Yelena.git
cd Yelena
```

Spin up the containers for the web server

```
docker-compose up -d --build
```

Install composer

```
docker-compose exec php composer install
```

Copy the `.env.example` file to `.env`

```
docker-compose exec php cp .env.example .env
```

Generate the application key

```
docker-compose exec php php artisan key:generate
```

Migrate the application

```
docker-compose exec php php artisan migrate
```

Seed Database

```
docker-compose exec php php artisan db:seed
```

If you are going to use docker to setup this project you can skip the last points of this README.

### Install

Clone the git repository on your computer and install it's dependencies

```
git clone https://github.com/ByMykel/Yelena.git
cd Yelena
```

```
cd backend
composer install
```

```
cd frontend
npm install
```

### Setup

When you are done with installation, copy the `.env.example` file to `.env` in the backend folder

```
cp .env.example .env
```

Generate the application key

```
php artisan key:generate
```

Add your database credentials to the necessary `env` fields

Migrate the application

```
php artisan migrate
```

Seed Database

```
php artisan db:seed
```

### Run the application

```
cd backend
php artisan serve
```

```
cd frontend
npm run serve
```