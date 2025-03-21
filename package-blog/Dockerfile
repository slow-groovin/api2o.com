FROM node:20-slim AS base




ARG CONTENT_SOURCE
ARG REMOTE_CONTENT_REPO

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack@latest  

RUN corepack enable
RUN pnpm add -g node-gyp 

FROM base AS build
COPY . /usr/build
WORKDIR /usr/build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --filter api2o.com-blog
RUN --mount=type=secret,id=SOURCE_AUTH_TOKEN,env=SOURCE_AUTH_TOKEN \
    --mount=type=secret,id=GTAG_ID,env=GTAG_ID \
    --mount=type=secret,id=INDEX_NOW_KEY,env=INDEX_NOW_KEY \
    pnpm run build --filter api2o.com-blog

FROM base AS app-blog
LABEL authors="slow-groovin"
LABEL org.opencontainers.image.description="api2o.com blog"
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /usr/build/package-blog/.output ./.output
COPY ./package-blog/entrypoint.sh ./
# 暴露应用运行的端口
EXPOSE 3000
# 启动应用
ENTRYPOINT ["sh","entrypoint.sh"]
