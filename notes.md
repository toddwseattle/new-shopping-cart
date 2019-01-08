# static images

I used the /public directory instead of the solution in the directions. This has some problems as it's not deployable because there is a "hard coded" url.

# project organization

## organization

I used the pattern of "components" and "containers to organize my application (see issue #2 for which compoonent is which). In general; containers are stateful and components are stateless; but i reserve the right to mix and match

## components in folders

I put each component in folders; and use an index.js and default export

# React features I use

All my components use PropTypes which provide runtime checking. check out someting like [ProductItem](./src/containers/ProductItem/index.js)

# local tool chain

I like using vscode; and there are some good 'snippets' that help with the boiler plate
**ES7 React/Redux/GraphQL/React-Native snippets**
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets
I also use vscode debugging. to setup on a pc; all i needed to do was select the "bug" on the left; and then the "gear" under the menu bar; then change the port to localhost:3000 in the file that's open. do an npm run start in a console window (either in the editor or elsewhere) and it will auto reload.

I also use prettier to tidy code and get things consistent: Exension Name: **Prettier - Code formatter** VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
