---
title: Hello!
description: 欢迎访问我的博客
date: 2026-03-
---

# Nice to meet you!

现在这个项目已经可以直接读取 `content/blog/*.md` 文件，并把它们渲染为网页。

## 你可以怎么写

- 正常使用标题、列表、链接、代码块
- 通过 frontmatter 提供 `title`、`description`、`date`
- 把文章放到 `content/blog/` 目录下

## 路由规则

这个文件会生成页面地址：

`/blog/hello-nuxt-content`

## 示例代码

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
})
```
