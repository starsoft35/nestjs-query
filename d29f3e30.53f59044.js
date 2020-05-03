(window.webpackJsonp=window.webpackJsonp||[]).push([[105],{205:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return s})),r.d(t,"rightToc",(function(){return o})),r.d(t,"default",(function(){return l}));var n=r(1),i=r(6),a=(r(0),r(223)),c={title:"Getting Started"},s={id:"persistence/sequelize/getting-started",title:"Getting Started",description:"The `@nestjs-query/query-sequelize` package provides an implementation of `@nestjs-query/core` [QueryService](../../concepts/services).",source:"@site/docs/persistence/sequelize/getting-started.md",permalink:"/nestjs-query/docs/persistence/sequelize/getting-started",editUrl:"https://github.com/doug-martin/nestjs-query/edit/master/documentation/docs/persistence/sequelize/getting-started.md",sidebar:"docs",previous:{title:"Services",permalink:"/nestjs-query/docs/persistence/services"},next:{title:"Custom Service",permalink:"/nestjs-query/docs/persistence/sequelize/custom-service"}},o=[{value:"Installation",id:"installation",children:[]},{value:"Docs",id:"docs",children:[]}],u={rightToc:o};function l(e){var t=e.components,r=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},u,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"@nestjs-query/query-sequelize")," package provides an implementation of ",Object(a.b)("inlineCode",{parentName:"p"},"@nestjs-query/core")," ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"../../concepts/services"}),"QueryService"),"."),Object(a.b)("p",null,"This package is built using ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"https://sequelize.org/"}),"sequelize")," and ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"https://docs.nestjs.com/techniques/database#sequelize-integration"}),"@nestjs/sequelize"),". If you are unfamiliar with them I suggest you read their documentation first."),Object(a.b)("h2",{id:"installation"},"Installation"),Object(a.b)("p",null,Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"../../introduction/install#nestjs-queryquery-sequelize"}),"Installation Docs")),Object(a.b)("h2",{id:"docs"},"Docs"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Read the ",Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"../services"}),"QueryService docs")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"./custom-service"}),"Custom Service")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"/nestjs-query/docs/persistence/sequelize/serialization"}),"Serialization")," - How to serialize ",Object(a.b)("inlineCode",{parentName:"li"},"sequelize")," models. ")))}l.isMDXComponent=!0},223:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return m}));var n=r(0),i=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var u=i.a.createContext({}),l=function(e){var t=i.a.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):s({},t,{},e)),r},p=function(e){var t=l(e.components);return i.a.createElement(u.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},d=Object(n.forwardRef)((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,c=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),p=l(r),d=n,m=p["".concat(c,".").concat(d)]||p[d]||b[d]||a;return r?i.a.createElement(m,s({ref:t},u,{components:r})):i.a.createElement(m,s({ref:t},u))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,c=new Array(a);c[0]=d;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s.mdxType="string"==typeof e?e:n,c[1]=s;for(var u=2;u<a;u++)c[u]=r[u];return i.a.createElement.apply(null,c)}return i.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);