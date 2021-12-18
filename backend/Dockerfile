FROM php:8.0-apache

RUN docker-php-ext-install pdo pdo_mysql
RUN a2enmod rewrite
RUN if command -v a2enmod >/dev/null 2>&1; then \
        a2enmod rewrite headers \
    ;fi
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN apt update && apt install -y git

WORKDIR /var/www/html

COPY ./app .

RUN composer update