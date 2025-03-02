FROM ubuntu:latest
LABEL authors="slow-groovin"
LABEL org.opencontainers.image.description="api2o.com blog"

FROM node:20.16.0-alpine3.20 AS final

WORKDIR /app
COPY entrypoint.sh ./
# 暴露应用运行的端口
EXPOSE 3000
# 启动应用
ENTRYPOINT ["sh","entrypoint.sh"]



# 构建过程
FROM node:20.16.0-alpine3.20 AS build

# 设置工作目录
WORKDIR /usr/build/

# 复制项目文件
COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm add -g node-gyp &&  \
    pnpm install &&  \
    pnpm run build
    

# 继续final镜像
FROM final
ENV NODE_ENV=production
COPY --from=build /usr/build/.output ./.output





