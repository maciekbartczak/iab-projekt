FROM php:8.0-apache

RUN docker-php-ext-install pdo pdo_mysql
RUN a2enmod rewrite
RUN if command -v a2enmod >/dev/null 2>&1; then \
        a2enmod rewrite headers \
    ;fi