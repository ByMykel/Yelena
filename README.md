### About Yelena

Yelena is a self-hosted flashcard program using spaced repetition, a technique for fast and long-lasting memorization.

https://user-images.githubusercontent.com/38622893/142684147-633b7a64-2c22-4b2e-9a3d-04d794135dbb.mp4

### Images

![Decks page](https://i.imgur.com/lFIurpF.jpg)
![Individual deck](https://i.imgur.com/dDkUBqd.jpg)
![Studying a deck - Question](https://i.imgur.com/LZcwNmE.jpg)
![Studying a deck - Answer](https://i.imgur.com/bPngsvS.jpg)
![Create new a deck](https://i.imgur.com/J0BhPsA.jpg)
![Create new a card](https://i.imgur.com/Xp4Hj2V.jpg)
![Import cards from a file](https://i.imgur.com/IWif3sQ.jpg)

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

App running at

```
http://localhost:8080/
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
