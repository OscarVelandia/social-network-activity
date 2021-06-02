# Social network activity
This project use **NextJs** to improve *SEO* with the *SSR* and **Redux Toolkit (RTK)** to manage the *State* and **RTK Query** to manage the server state

Config taken from [here](https://github.com/OscarVelandia/opinionated-nextjs-config)

## Getting Started
1. Run `yarn` to install dependencies
2. Run `yarn dev`
3. Open the project in **[local](http://localhost:3000)**
4. Enjoy

## Project folder config
The resolver of every folder is @folderName, E.G. @features imports the files in the features folder, don't forget add the export of every file in index.tsx  

* ### components
  Folder with every React component with their corresponding *[componentName].module.css*.

* ### features
  Folder with every feature with a RTK slice and feature components slice, as a convention the name of every slice is featureName + Slice suffix, E.G. counterSlice.ts.

  In the counterSlice.ts file is a *slice* example.

* ### hooks
  Folder with the custom react hooks.

* ### pages
  Folder with every *NextJs* page.

* ### services
  Folder with every *RTK Query Api* config and queries, is needed just one file per endpoint.

  In the pokemonApi.ts file is a *service* example.

* ### store
  Folder with the **hooks** to wrap a typed useDispatch and useSelector and the **store** config with *RTK Query* middleware and reducer added.

* ### styles
  Folder with the global CSS file

* ### util
  Folder with the util functions, add one util per file.