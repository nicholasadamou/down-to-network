<h1 align="center">
  <br>
  <a href="https://github.com/nicholasadamou/DownToNetwork"><img src="data/images/logo.png" alt="Logo"></a>
  <br>
  Down to Network Mono Repo
  <br>
</h1>

<h4 align="center">The mono repo that holds the <a href="backend">backend/</a>, the <a href="frontend">frontend/</a>, and the <a href="design">design/</a> of <em>DownToNetwork</em>.</h4>

<p align="center">
  <a href="https://github.com/nicholasadamou/DownToNetworks/blob/master/LICENSE.txt">
      <img src="https://img.shields.io/badge/license-GPLv3-blue.svg?style=flat-square" alt="License">
  </a>
  <a href="https://saythanks.io/to/NicholasAdamou">
      <img src="https://img.shields.io/badge/say-thanks-ff69b4.svg" alt="Say Thanks">
  </a>
</p>

---

# What is '_Down To Network_'?

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

**The Front-End**:

- [**React.js**](https://reactjs.org/) - For building the interface along with:
  - [**React Router**](https://reacttraining.com/react-router/) - for declarative routing for React.
  - [**React Context API**](https://reactjs.org/docs/context.html) - Context provides a way to pass data through the component tree without having to pass props down manually at every level.
  - [**React-Apollo**](https://github.com/apollographql/react-apollo) - for interfacing with Apollo Client.
  - [**Styled-Components**](https://www.styled-components.com/) - for styling.
- [**Apollo-Client**](https://github.com/apollographql/apollo-client) - For Data Management.
  - Performing GraphQL **Mutations**
  - Fetching GraphQL **Queries**
  - **Caching** GraphQL Data
  - Managing **Local State**
  - **Error** and **Loading** UI States
  - Apollo Client replaces the need for redux + data fetching/caching libraries.

**The Back-End**:

- [**Firebase**](https://firebase.google.com/) - Firebase is Google's mobile platform that helps you quickly develop high-quality apps and grow your business.
- [**Apollo Server**](https://github.com/apollographql/apollo-server) - GraphQL server for Express.

## 📚 The Design Stack

This project uses the following technologies:

- [**Carbon Design System**](https://carbondesignsystem.com) - Carbon is the design system for IBM web and product. It is a series of individual styles, components, and guidelines used for creating unified UI.
- [**Sketch**](https://www.sketch.com/) - Create, prototype, collaborate and turn your ideas into incredible products with the definitive platform for digital design.
- [**Abstract**](https://www.abstract.com/) - Use Abstract to manage, collaborate and version your Sketch files. Our version control for designers supports a modern design workflow.
- [**Invision**](https://www.invisionapp.com/) - InVision is the digital product design platform used to make the world's best customer experiences.

## How To Use

```bash
git clone https://github.com/nicholasadamou/DownToNetwork
cd DownToNetwork
yarn install-dependencies # alteratively, 'npm' can be used
```

## License

DownToNetwork is © 2019, Nicholas Adamou, Edward Lovely, Stephen Alt, Diana Bank, & Julia Lauer.

It is free software, and may be redistributed under the terms specified in the [LICENSE] file.

[license]: LICENSE
