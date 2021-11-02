ARG NODE_VERSION=17.0.1
ARG PNPM_VERSION=6.19.0
ARG NGINX_VERSION=1.21.3-alpine

FROM node:$NODE_VERSION AS build
ARG PNPM_VERSION
WORKDIR /src
RUN npm i -g pnpm@$PNPM_VERSION
COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml
RUN pnpm i
COPY .env .env
COPY .env.production .env.production
COPY index.html index.html
COPY tsconfig.json tsconfig.json
COPY vite.config.ts vite.config.ts
COPY src src
RUN pnpm build

FROM nginx:$NGINX_VERSION
COPY --from=build /src/dist /usr/share/nginx/html
COPY env.sh /env.sh
RUN sed -i '5ish /env.sh' docker-entrypoint.sh
