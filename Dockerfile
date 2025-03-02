FROM node:20-slim AS base
LABEL authors="slow-groovin"
LABEL org.opencontainers.image.description="api2o.com blog"





ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack@latest
RUN corepack --version
RUN corepack enable
RUN pnpm --version
RUN pnpm add -g node-gyp 

FROM base AS build
COPY . /usr/build
WORKDIR /usr/build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build

FROM base AS app-blog
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /usr/build/package-blog/.output ./.output
COPY ./package-blog/entrypoint.sh ./
# 暴露应用运行的端口
EXPOSE 3000
# 启动应用
ENTRYPOINT ["sh","entrypoint.sh"]

#test another app
FROM base AS app-2
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /usr/build/package-blog/.output ./.output
COPY ./package-blog/entrypoint.sh ./
# 暴露应用运行的端口
EXPOSE 3000
# 启动应用
ENTRYPOINT ["sh","entrypoint.sh"]