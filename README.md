![www.api2o.com](https://www.api2o.com/icon/logo.png)


# api2o.com
This repository contains the source code for the [www.api2o.com](www.api2o.com).

## Description

api2o.com is a website built with Nuxt3, Nuxt Content@3.x, and Tailwind CSS. It is a blog website.

## Packages

### blog

The `blog` package is located in the `./package-blog` directory. 

#### Frameworks Used
- Nuxt3
- Nuxt Content
- Tailwind CSS


#### Content Directory 
> refer [nuxt-content](https://content.nuxt.com/docs/getting-started) for usage and configuration

The content files for the blog should be stored in the `content` directory or github repo (For api2o, it's stored in private github repo). The directory structure should be as follows:

```
content/
├── blog
│   ├── <article>.md
│   └── ...
│
├── handbook
|   ├──nav.json           
│   └── <bookname>
│       └── <article>.md
└── ...
```

Markdown metas :
```yaml
_id: '<article-id>'  #use https://www.api2o.com/en/blog/<article-id> to visit
title: '<article-title>'
description: '<article-description>'
tags: []
date: '2024-01-01'
image:   #article head image
  src: ''   
  alt: ''
_locale: 'en'
```

`nav.json` is outline for handbook's books:
```json
{
  "books": [
    {
      "name": "nodejs",
      "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
    },
    {
      "name": "typescript",
      "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
    },
    {
      "name": "docker",
      "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
    }
  ]
}
```
#### Development

To develop the `blog` package locally, follow these steps:

1.  Install the dependencies: `pnpm install`
2.  Run the development server: `pnpm dev`
3.  visit `http://localhost:3000`
  

> for github repo as content source,  create a link of local repo dir for hot-reload of page. (Windows: ` mklink /D content  D:\xxxxxxx\<your content repo dir>\ `)



#### Building

To build the `blog` package, run the following command:

```bash
pnpm build
```
And follow the output instructions to deploy.

