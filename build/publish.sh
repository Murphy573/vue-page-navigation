#!/usr/bin/env sh
# 发布到npm的脚本

# 当发生错误时中止脚本
set -e

# 设置 npm发布源
npm config set registry=http://registry.npmjs.org

# npm login 

# 构建
npm run build:lib

# 执行npm发布
npm publish

# cd -
