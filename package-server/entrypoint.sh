#!/bin/sh
# 配合docker compose secrets 功能使用,把/run/secrets/*下的文件设置为环境变量
# 遍历 /run/secrets 目录中的所有文件
for secret in /run/secrets/*; do
    # 只处理文件
    if [ -f "$secret" ]; then
        # 获取文件名
        secret_name=$(basename "$secret")
        # 读取文件内容
        secret_value=$(cat "$secret")
        # 将文件名和内容设置为环境变量
        export "$secret_name"="$secret_value"
    fi
done

# 输出环境变量以进行调试（可选）
echo "Secrets have been set as environment variables."

# 执行你的程序，确保程序执行成功后才会执行下一条命令
# 例如，如果你的程序是 /server
exec node dist/src/index.js
