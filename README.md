# Build Your Personal Blog With Storyblok, Next.js, and Edgio

Guide: https://www.storyblok.com/tp/blog-next-layer0

## Demo

https://rishi-raj-jain-blog-next-storyblok-layer0-starter-default.layer0-limelight.link

## Try It Now

[![Deploy with Edgio](https://docs.edg.io/button.svg)](https://app.layer0.co/deploy?repo=https://github.com/rishi-raj-jain/blog-next-storyblok-edgio-starter)

## Getting Started

### Clone This Repo

Use `git clone https://github.com/rishi-raj-jain/blog-next-storyblok-edgio-starter.git` to get the files within this repository onto your local machine.

### Install dependencies

On the command line, in the project root directory, run the following command:

```bash
npm install
```

### Run the Next.js app locally on Edgio

Run the Next.js app with the command:

```bash
npm run edgio:dev
```

Load the site: http://127.0.0.1:3000

### Testing production build locally with Edgio

You can do a production build of your app and test it locally using:

```bash
npm run edgio:build && npm run edgio:production
```

Setting --production runs your app exactly as it will be uploaded to the Edgio cloud using serverless-offline.

## Deploying to Edgio

Deploying requires an account on Edgio. [Sign up here for free](https://app.layer0.co/signup). Once you have an account, you can deploy to Edgio by running the following in the root folder of your project:

```bash
npm run edgio:deploy
```

See [deploying](https://docs.edg.io/guides/deploying) for more information.
