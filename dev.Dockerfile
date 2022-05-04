FROM ruby:3.1.2-alpine3.15
RUN apk update \
  && apk add \
    libxml2 \
    openssl \
    tar \
    build-base \
    tzdata \
    postgresql-dev \
    postgresql-client \
    yarn \
    bash 
WORKDIR /ccpj
COPY . /ccpj
RUN bundle install
RUN yarn install
EXPOSE 3000 
