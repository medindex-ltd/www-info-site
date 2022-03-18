# medindex.co.uk

A single-page 'about Medindex' web site for marketing, intros, etc.

## 📦 Live deployment

The site is served via [Cloudflare Pages](https://pages.cloudflare.com/), and integrated with this repository; changes to the `live` branch are automatically deployed to <https://medindex.co.uk>

💡 Changes to the live branch must be made via merging a pull request, not direct commits. PRs must be approved by a [code owner](CODEOWNERS) before they can be merged.

## 🪟 Preview deployments

Commits pushed to branches other than `live` will generate [preview deployments](https://developers.cloudflare.com/pages/platform/preview-deployments/). Open a pull request against the live branch to see the preview URL displayed in the PR comments.

Preview deployments are gated by [Cloudflare Access](https://www.cloudflare.com/en-gb/products/zero-trust/access/) zero trust application access, you will need to be a member of the [Medindex admins](https://github.com/orgs/medindex-ltd/teams/admins) or [collaborators](https://github.com/orgs/medindex-ltd/teams/collaborators) teams to access the preview URL.

After validating the preview, merge the PR to deploy the changes to the live site.

## 🔧 Development

### 🧰 Requirements

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### ⚡️ Quick start

```shell
$ git clone git@github.com:medindex-ltd/www-info-site.git
$ cd www-info-site
$ npm install
$ gulp
```

### 👩‍💻 Workflow

For local development, the default `gulp` task will generate the static files in `output/` and start a local web server to preview the output at <http://localhost:3000>. Changes to the source files (in `src/`) will trigger a rebuild and reload the browser page.

### 🚀 Release builds

The release [build configuration](https://developers.cloudflare.com/pages/platform/build-configuration/) for the site uses a shell script as the build command, with `output` as the build directory. If you need to change the build command, you can edit shell script, [`build.sh`](build.sh), and/or the Gulp recipe file, [`gulpfile.js`](gulpfile.js), accordingly. Fatal errors in the build script will cause the preview deployment to fail; verify the preview deployment succeeded following any changes, or roll back if necessary.

💡 Note that the build process will automatically run `npm install`  to install any packages defined in [`package.json`](package.json) that are required for the build.

The Cloudflare [documentation](https://developers.cloudflare.com/pages/platform/build-configuration/#language-support-and-tools) for build configurations describes the language support and tools available by default.

### ✒️ Design considerations

Cloudflare Pages is a lightweight [Jamstack](https://jamstack.org) platform, there are a number of [features](https://developers.cloudflare.com/pages/platform/serving-pages/) and [limitations](https://developers.cloudflare.com/pages/platform/known-issues/) to the architecture; see the Cloudflare [documentation](https://developers.cloudflare.com/pages/platform/) for further details.
