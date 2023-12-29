FROM ubuntu:22.04
ARG USER_ID
ARG NODE_VERSION=18
ARG POSTGRES_VERSION=14
ENV DEBIAN_FRONTEND noninteractive
ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update && \
    apt-get install -y gnupg gosu curl ca-certificates zip unzip git supervisor sqlite3 libcap2-bin libpng-dev python2 dnsutils yarn mysql-client

RUN curl -sS 'https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x14aa40ec0831756756d7f66c4f4ea0aae5267a6c' | gpg --dearmor | tee /etc/apt/keyrings/ppa_ondrej_php.gpg > /dev/null && \
    echo "deb [signed-by=/etc/apt/keyrings/ppa_ondrej_php.gpg] https://ppa.launchpadcontent.net/ondrej/php/ubuntu jammy main" > /etc/apt/sources.list.d/ppa_ondrej_php.list && \
    apt-get update && apt-get install -y php8.2-cli php8.2-dev \
       php8.2-pgsql php8.2-sqlite3 php8.2-gd php8.2-imagick \
       php8.2-curl \
       php8.2-imap php8.2-mbstring \
       php8.2-xml php8.2-zip php8.2-bcmath php8.2-soap \
       php8.2-intl php8.2-readline \
       php8.2-ldap \
       php8.2-msgpack php8.2-igbinary php8.2-redis php8.2-swoole \
       php8.2-memcached php8.2-pcov php8.2-xdebug \
       php8.2-fpm \
       postgresql-client-$POSTGRES_VERSION

RUN curl -sLS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
RUN curl -sLS https://deb.nodesource.com/setup_$NODE_VERSION.x | bash - && \
    apt-get install -y nodejs
RUN npm install -g npm
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /etc/apt/keyrings/yarn.gpg >/dev/null && \
    echo "deb [signed-by=/etc/apt/keyrings/yarn.gpg] https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list
RUN curl -sS https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | tee /etc/apt/keyrings/pgdg.gpg >/dev/null && \
    echo "deb [signed-by=/etc/apt/keyrings/pgdg.gpg] http://apt.postgresql.org/pub/repos/apt jammy-pgdg main" > /etc/apt/sources.list.d/pgdg.list
RUN apt-get install -y gosu
RUN apt-get -y autoremove && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN setcap "cap_net_bind_service=+ep" /usr/bin/php8.2

# Fix the listening port
RUN sed -i 's|listen = /run/php/php8.2-fpm.sock|listen = 9000|' /etc/php/8.2/fpm/pool.d/www.conf

COPY ./docker/php/start-container.sh /usr/local/bin/start-container.sh
COPY ./docker/php/initial-setup.sh /usr/local/bin/initial-setup.sh
COPY ./docker/php/php.ini /etc/php/8.2/cli/conf.d/99-devuser.ini
# Copy Laravel application
COPY ./laravel-api /var/www/html/

WORKDIR /var/www/html/
ENTRYPOINT ["start-container.sh"]
