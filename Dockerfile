FROM node:20-slim AS base
LABEL authors="slow-groovin"
LABEL org.opencontainers.image.description="api2o.com blog"



ARG CONTENT_SOURCE
ARG REMOTE_CONTENT_REPO
RUN --mount=type=secret,id=SOURCE_AUTH_TOKEN,env=SOURCE_AUTH_TOKEN \
    --mount=type=secret,id=GTAG_ID,env=GTAG_ID \
    echo "$SOURCE_AUTH_TOKEN  $CONTENT_SOURCE $REMOTE_CONTENT_REPO $GTAG_ID"

RUN echo "[direct RUN]$SOURCE_AUTH_TOKEN  $CONTENT_SOURCE $REMOTE_CONTENT_REPO $GTAG_ID"

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack@latest  

RUN corepack enable
RUN pnpm add -g node-gyp 

FROM base AS build
COPY . /usr/build
WORKDIR /usr/build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN --mount=type=secret,id=SOURCE_AUTH_TOKEN,env=SOURCE_AUTH_TOKEN \
    --mount=type=secret,id=GTAG_ID,env=GTAG_ID \
    pnpm run -r build

FROM base AS app-blog
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /usr/build/package-blog/.output ./.output
COPY ./package-blog/entrypoint.sh ./
# 暴露应用运行的端口
EXPOSE 3000
# 启动应用
ENTRYPOINT ["sh","entrypoint.sh"]
