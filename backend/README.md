<h1 align="center">
  <br>
  <a href="https://github.com/nicholasadamou/DownToNetwork"><img src="../data/images/logo.png" alt="Logo"></a>
  <br>
  Down to Network's Back-End
  <br>
</h1>

<h4 align="center">The directory contains everything required to interact with the <a href="https://firebase.google.com/">Firebase</a> backend of <em>DownToNetwork</em>.</h4>

<p align="center">
  <a href="https://github.com/nicholasadamou/DownToNetworks/blob/master/LICENSE.txt">
      <img src="https://img.shields.io/badge/license-GPLv3-blue.svg?style=flat-square" alt="License">
  </a>
  <a href="https://david-dm.org/nicholasadamou/DownToNetworks#info=devDependencies">
      <img src="https://img.shields.io/david/dev/nicholasadamou/DownToNetworks.svg?style=flat-square" alt="devDependencies">
  </a>
  <a href="https://dependabot.com">
      <img src="https://api.dependabot.com/badges/status?host=github&repo=nicholasadamou/DownToNetworks" alt="dependabot">
  </a>
  <a href="https://travis-ci.org/nicholasadamou/DownToNetworks">
      <img src="https://img.shields.io/travis/nicholasadamou/DownToNetworks/master.svg?style=flat-square" alt="Build Status">
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

DownToNetwork is a dynamic web / mobile app optimized to connect new fellow IBMers to experienced IBMers through the power of matching.

⚠️ To access the demo of 'DownToNetwork' visit this link: [DownToNetwork demo](https://DownToNetwork.netlify.com/).

## 📚 The Tech. Stack

This project uses the following technologies:

**The Back-End**:

- [**Firebase**](https://firebase.google.com/) - Firebase is Google's mobile platform that helps you quickly develop high-quality apps and grow your business.
- [**Apollo Server**](https://github.com/apollographql/apollo-server) - GraphQL server for Express.

## How To Use

```shell
# Install
yarn install
# Locally serve
yarn serve
# Deploy
yarn deploy
```

## Routes

GraphQL Playground: `https://us-central1-<project-id>.cloudfunctions.net/api`

GraphQL Endpoint: `https://us-central1-<project-id>.cloudfunctions.net/api/graphql`

## Use

Go to the GraphQL Playground route and enter the GraphQL endpoint route into the GraphQL Server address bar to connect the playground to your endpoint. Now you can query away and develop your app!

## License

DownToNetwork is © 2019, Nicholas Adamou.

It is free software, and may be redistributed under the terms specified in the [LICENSE] file.

[license]: LICENSE
