<h1 align="center">
  <br>
  <a href="https://github.com/nicholasadamou/DownToNetwork"><img src="../data/images/logo.png" alt="Logo"></a>
  <br>
  Down to Network's Back-End
  <br>
</h1>

<h4 align="center">The directory contains everything required to interact with the <a href="https://firebase.google.com/">Firebase</a> backend of <em>DownToNetwork</em>.</h4>

<p align="center">
  <a href="https://github.com/nicholasadamou/DownToNetwork/blob/master/LICENSE.txt">
      <img src="https://img.shields.io/badge/license-GPLv3-blue.svg?style=flat-square" alt="License">
  </a>
  <a href="https://travis-ci.org/nicholasadamou/DownToNetwork">
      <img src="https://img.shields.io/travis/nicholasadamou/DownToNetwork/master.svg?style=flat-square" alt="Build Status">
  </a>
  <a href="https://saythanks.io/to/NicholasAdamou">
      <img src="https://img.shields.io/badge/say-thanks-ff69b4.svg" alt="Say Thanks">
  </a>
</p>

---

## What is '_Down To Network_'?

This project was created for the Summer IBM HackCIO event, where fellow IBM interns in groups of 4 had 24 hours to design and construct an app that would improve IBM in one of the following categories:

1. Inclusion
2. Community Building
3. Environmental Friendly
4. Onboarding Process.

🏆 **_DownToNetwork_** **won** under the category **_Community Building_** and voted **_Most likely to be used at IBM_**.

DownToNetwork is a dynamic web / mobile app optimized to connect new fellow IBMers to experienced IBMers through the power of matching.

⚠️ To access the demo of 'DownToNetwork' visit this link: [DownToNetwork demo](https://DownToNetwork.netlify.com/).

## 📚 The Tech. Stack

This project uses the following technologies:

**The Back-End**:

- [**GraphQL-Yoga**](https://github.com/prisma/graphql-yoga) - An [_Express_](https://expressjs.com/) GraphQL Server For:
  - Implementing **Query and Mutation Resolvers**
  - Custom **Server Side Logic**
  - **Sending** Email
  - Performing **JWT Authentication**
  - Checking **Permissions**
- [**Prisma**](https://github.com/prisma/prisma) - A [_GraphQL_](https://graphql.org/) Database Interface.
  - Provides a set of GraphQL **CRUD APIs** for a MySQL, Postgres or MongoDB **Database**.
  - **Schema** Definition
  - Data **Relationships**
  - **Queried** Directly from our Yoga Server
  - **Self-hosted** or as-a-service

## Installing Dependencies

The following snippet only needs to be ran once if dependencies are not installed:

```bash
yarn install # Installs dependencies
```

## Building & Running _SickFits_'s Back-End

To _properly_ compile the back-end of _DownToNetwork_ `.env` must exist. For an example of what `.env` should look like, look at [.env.example](.env.example).

To launch the [**Prisma**](https://github.com/prisma/prisma) GraphQL Development Server for the **back-end**, simply run the following:

```bash
yarn start
```

## License

DownToNetwork is © 2019, Nicholas Adamou, Edward Lovely, Stephen Alt, Diana Bank, & Julia Lauer.

It is free software, and may be redistributed under the terms specified in the [LICENSE] file.

[license]: LICENSE
