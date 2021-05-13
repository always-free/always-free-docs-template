---
home: true
heroImage: /images/do-good-thing.jpg
heroAlt: Photo by Damir Kopezhanov on Unsplash  
heroText: Always free for developers
tagline: The goodness of open source technologies stack and probable free hosting solution
actionText: Get Started
actionLink: /get-started
xFeatures:
  - title: Applications
    details: Popular frontend and backend technologies along with the deployment details.
    link: /apps/
  - title: Servers
    details: All about web servers, application servers, database servers, cache and integration solutions.
    link: /servers/
  - title: Cloud
    details: Cloud provider details along with their various hosting, storage and security solutions.
    link: /cloud/    
footer: MIT Licensed | Copyright © 2021-present Prasad Jayakumar
---

<div class="features">
  <div class="feature" v-for="feat in $page.frontmatter.xFeatures">
    <h2><a v-bind:href="feat.link">{{ feat.title }}</a></h2>
    <p>{{ feat.details }} </p>
  </div>
</div>

::: warning
:construction: Under construction... :building_construction:
:::
