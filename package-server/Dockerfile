FROM ubuntu:latest
LABEL authors="slow-groovin"
LABEL org.opencontainers.image.description="api2o-server  application"


# 构建过程
FROM node:20.16.0-alpine3.20 AS build

# 设置工作目录
WORKDIR /usr/build/

# 复制项目文件
COPY . .

RUN npm i -g pnpm\
    && pnpm install  \   
    # && pnpx prisma generate \
    && pnpm run build \
    && pnpm prune --prod
#在 pnpm 中，和 npm ci 相对应的命令是 pnpm install --frozen-lockfile。 


######### Second Stage #############
FROM node:20.16.0-alpine3.20 AS final

WORKDIR /app



# 继续final镜像
FROM final
ENV NODE_ENV=production
COPY --from=build /usr/build/dist ./dist
COPY --from=build /usr/build/package*.json  ./
COPY --from=build /usr/build/node_modules ./node_modules

COPY entrypoint.sh ./
# 暴露应用运行的端口
EXPOSE 3000
# 启动应用
ENTRYPOINT ["sh","entrypoint.sh"]