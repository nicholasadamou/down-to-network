parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"dmRD":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const{gql:e}=require("apollo-server-express"),r=e`
  type User {
    name: String,
    role: String,
    eduction: String,
    location: String,
    bio: String,
    experiences: String,
    fun_facts: String
  }
  type Query {
    users: [User]
  }
`;var t=r;exports.default=t;
},{}],"c2nQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const e={Query:{users:()=>admin.database().ref("users").once("value").then(e=>e.val()).then(e=>Object.keys(e).map(t=>e[t]))}};var t=e;exports.default=t;
},{}],"WM+D":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=o(require("express")),r=require("apollo-server-express"),t=o(require("./schema")),s=o(require("./resolvers"));function o(e){return e&&e.__esModule?e:{default:e}}function u(){const o=(0,e.default)();return new r.ApolloServer({typeDefs:t.default,resolvers:s.default,introspection:!0,playground:!0}).applyMiddleware({app:o,path:"/",cors:!0}),o}var l=u;exports.default=l;
},{"./schema":"dmRD","./resolvers":"c2nQ"}],"guaG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.api=void 0;var e=require("firebase-functions"),r=t(require("./graphql/server"));function t(e){return e&&e.__esModule?e:{default:e}}const s=(0,r.default)(),u=e.https.onRequest(s);exports.api=u;
},{"./graphql/server":"WM+D"}]},{},["guaG"], null)
//# sourceMappingURL=/functions.js.map