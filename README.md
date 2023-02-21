## 基于 Vue3+TypeScript+ElementPlus+Echart 的后台管理系统

> ### 1.Vue3+TS 后台管理系统

vue3-ts-admin是基于Vue3、Vuex、VueRouter、VueCLI、 ElementPlus 、TypeScript、Echart5等后台系统解决方案。

> ### 2.项目运行

- git clone
- cd 到 vue3_ts_cms 目录下运行：

```
npm install 或者 cnpm install
```

- 运行

```
npm run serve
```

- 浏览器打开 http://localost:8080/

> ### 3.项目功能（部分展示）

#### 3.1 登陆页面 （默认用户&密码：zayyo，123456）

![ 登陆页面](https://img-blog.csdnimg.cn/6841b06b4e0e4ff38bc7762048e953e4.png)

#### 3.2 商品数据展示（可视化页面）

![商品数据展示（可视化页面）](https://img-blog.csdnimg.cn/b1bbd0d332074460b0e60acff03b4981.png)

#### 3.3 系统管理（搜索联动）

![系统管理（搜索联动）](https://img-blog.csdnimg.cn/dcb47e13c0ae412cac451ba7688a6a34.png)

#### 3.4页面展示 （侧边菜单 - 技术栈展示） 

![侧边菜单 - 技术栈展示](https://img-blog.csdnimg.cn/3b76296f217c4556ab8eb7d809fdd9dd.png)

#### 3.5 富文本编辑器
！[富文本编辑](https://img-blog.csdnimg.cn/f3f5a8d95f0b4fa599b4dfaed1656965.png)


### 4.格式化代码

```
npm run prettier
```
### 5.代码ESlint检查

```
npm run lint
```

 ### 6.项目提交

```
npm run commit
git commit -m "message" --no-verify
git commit --no-verify -am "7/10"
```
### 7.项目详细


#### 7.1技术支持

- **开发工具：** Visual Studio Code
- **编程语言：** TypeScript 4.x + JavaScript
- **构建工具：** Vite 2.x / Webpack5.x
- **前端框架：** Vue 3.x
- **路由工具：** Vue Router 4.x
- **状态管理：** Vuex 4.x
- **UI 框架：** Element Plus
- **可视化：**  Echart5.x
- **富文本：**  WangEditor
- **工具库：**  @vueuse/core + dayjs + countup.js
- **CSS 预编译：** Sass / Less
- **HTTP 工具：**  Axios
- **Git Hook 工具：**  husky
- **代码规范：**  EditorConfig + Prettier + ESLint
- **提交规范：**  Commitizen + Commitlint
- **自动部署：**  Centos + Jenkins + Nginx

#### 7.2项目解构

```
    vue3_ts_cms
│  .browserslistrc
│  .editorconfig
│  .env.development
│  .env.production
│  .env.test
│  .eslintrc.js
│  .gitignore
│  .prettierignore
│  .prettierrc
│  babel.config.js
│  commitlint.config.js
│  package-lock.json
│  package.json
│  README.md
│  tsconfig.json
│  vue.config.js
│
├─.husky
│  │  commit-msg
│  │  pre-commit
│  │
│  └─_
│          .gitignore
│          husky.sh
│
├─public
│      favicon.ico
│      index.html
│
└─src
    │  App.vue
    │  main.ts
    │  shims-vue.d.ts
    │
    ├─assets
    │  ├─css
    │  │      base.less
    │  │      index.less
    │  │      wangEditor.less
    │  │
    │  └─images
    │          background_img.jpg
    │          logo.png
    │
    ├─common-ui
    │  ├─breadcrumb
    │  │  │  index.ts
    │  │  │
    │  │  ├─src
    │  │  │      BreadCrumb.vue
    │  │  │
    │  │  └─types
    │  │          types.ts
    │  │
    │  ├─zy-card
    │  │  │  index.ts
    │  │  │
    │  │  └─src
    │  │          ZYCard.vue
    │  │
    │  ├─zy-descriptions
    │  │  │  index.ts
    │  │  │
    │  │  └─src
    │  │          ZYDescriptions.vue
    │  │
    │  ├─zy-echarts
    │  │  │  index.ts
    │  │  │
    │  │  ├─hooks
    │  │  │      initECharts.ts
    │  │  │      mapCityToMap.ts
    │  │  │
    │  │  ├─map
    │  │  │      china.json
    │  │  │      city.ts
    │  │  │
    │  │  └─src
    │  │          ZYEcharts.vue
    │  │
    │  ├─zy-editor
    │  │  │  index.ts
    │  │  │
    │  │  └─src
    │  │          ZYEditor.vue
    │  │
    │  ├─zy-form
    │  │  │  index.ts
    │  │  │
    │  │  ├─src
    │  │  │      ZYForm.vue
    │  │  │
    │  │  └─types
    │  │          types.ts
    │  │
    │  ├─zy-tabel
    │  │  │  index.ts
    │  │  │
    │  │  ├─src
    │  │  │      ZYTabel.vue
    │  │  │
    │  │  └─types
    │  │          types.ts
    │  │
    │  └─zy-upload
    │      │  index.ts
    │      │
    │      └─src
    │              ZYUpload.vue
    │
    ├─components
    │  ├─nav-header
    │  │  │  index.ts
    │  │  │
    │  │  └─src
    │  │          NavHeader.vue
    │  │
    │  ├─nav-menu
    │  │  │  index.ts
    │  │  │
    │  │  └─src
    │  │          NavMenu.vue
    │  │
    │  ├─page-dialog
    │  │  │  index.ts
    │  │  │
    │  │  ├─src
    │  │  │      PageDialog.vue
    │  │  │
    │  │  └─types
    │  │          types.ts
    │  │
    │  ├─page-echart
    │  │  │  index.ts
    │  │  │
    │  │  └─src
    │  │          PageBarChart.vue
    │  │          PageChinaChart.vue
    │  │          PageLineChart.vue
    │  │          PagePicChart.vue
    │  │          PagePicLableChart.vue
    │  │          PageRoseChart.vue
    │  │
    │  ├─page-search
    │  │  │  index.ts
    │  │  │
    │  │  └─src
    │  │          PageSearch.vue
    │  │
    │  └─page-tabel
    │      │  index.ts
    │      │
    │      └─src
    │              PageTabel.vue
    │
    ├─global
    │      index.ts
    │      registerElement.ts
    │      registerGlobal.ts
    │
    ├─hooks
    │      countAction.ts
    │      pageLinkage.ts
    │      permission.ts
    │
    ├─router
    │  │  index.ts
    │  │
    │  └─main
    │      ├─analysis
    │      │  ├─dashboard
    │      │  │      dashboard.ts
    │      │  │
    │      │  └─overview
    │      │          overview.ts
    │      │
    │      ├─product
    │      │  ├─category
    │      │  │      category.ts
    │      │  │
    │      │  └─goods
    │      │          goods.ts
    │      │
    │      ├─story
    │      │  ├─chat
    │      │  │      chat.ts
    │      │  │
    │      │  └─list
    │      │          list.ts
    │      │
    │      └─system
    │          ├─department
    │          │      department.ts
    │          │
    │          ├─menu
    │          │      menu.ts
    │          │
    │          ├─role
    │          │      role.ts
    │          │
    │          └─user
    │                  user.ts
    │
    ├─service
    │  │  index.ts
    │  │  types.ts
    │  │
    │  ├─login
    │  │      index.ts
    │  │      types.ts
    │  │
    │  ├─main
    │  │  ├─analysis
    │  │  │      index.ts
    │  │  │
    │  │  ├─story
    │  │  │      index.ts
    │  │  │
    │  │  └─system
    │  │          index.ts
    │  │
    │  └─request
    │          index.ts
    │          type.ts
    │
    ├─store
    │  │  index.ts
    │  │  types.ts
    │  │
    │  ├─analysis
    │  │      index.ts
    │  │      types.ts
    │  │
    │  ├─login
    │  │      index.ts
    │  │      types.ts
    │  │
    │  ├─product
    │  │      index.ts
    │  │      types.ts
    │  │
    │  └─system
    │          index.ts
    │          types.ts
    │
    ├─utils
    │      cache.ts
    │      formate.ts
    │      handleString.ts
    │      menuToRoute.ts
    │
    └─views
        ├─login
        │  │  Login.vue
        │  │
        │  ├─cpns
        │  │      LoginPhone.vue
        │  │      LoginUser.vue
        │  │
        │  └─hooks
        │          rules.ts
        │
        ├─main
        │  │  Main.vue
        │  │
        │  ├─analysis
        │  │  ├─dashboard
        │  │  │  │  dashboard.vue
        │  │  │  │
        │  │  │  ├─config
        │  │  │  │      showCountConfig.ts
        │  │  │  │
        │  │  │  ├─cpn
        │  │  │  │      ShowCharts.vue
        │  │  │  │      ShowCount.vue
        │  │  │  │
        │  │  │  └─hook
        │  │  └─overview
        │  │      │  overview copy.vue
        │  │      │  overview.vue
        │  │      │
        │  │      └─config
        │  │              dependencies.ts
        │  │              devDependencies.ts
        │  │              projectStandard.ts
        │  │              projectTree.ts
        │  │              technologyStacks.ts
        │  │
        │  ├─product
        │  │  ├─category
        │  │  │  │  category.vue
        │  │  │  │
        │  │  │  ├─config
        │  │  │  │      dialog.config.ts
        │  │  │  │      form.config.ts
        │  │  │  │      tabel.config.ts
        │  │  │  │
        │  │  │  └─cpn
        │  │  │          CategoryHeader.vue
        │  │  │
        │  │  └─goods
        │  │      │  goods.vue
        │  │      │
        │  │      └─configs
        │  │              dialog.config.ts
        │  │              tabel.config.ts
        │  │
        │  ├─story
        │  │  ├─chat
        │  │  │      chat.vue
        │  │  │
        │  │  └─list
        │  │      │  list.vue
        │  │      │
        │  │      └─config
        │  │              tabel.config.ts
        │  │
        │  └─system
        │      ├─department
        │      │  │  department.vue
        │      │  │
        │      │  └─config
        │      │          dialog.config.ts
        │      │          from.config.ts
        │      │          tabel.config.ts
        │      │
        │      ├─menu
        │      │  │  menu.vue
        │      │  │
        │      │  └─configs
        │      │          dialog.config.ts
        │      │          tabel.config.ts
        │      │
        │      ├─role
        │      │  │  role.vue
        │      │  │
        │      │  └─config
        │      │          dialog.config.ts
        │      │          form.config.ts
        │      │          tabel.config.ts
        │      │
        │      └─user
        │          │  user.vue
        │          │
        │          └─configs
        │                  dialog.config.ts
        │                  form.config.ts
        │                  tabel.config.ts
        │
        └─not-found
            │  NotFound.vue
            │
            └─src
```
