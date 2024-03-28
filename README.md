This project was bootstrapped with [Create Contentful App](https://github.com/contentful/create-contentful-app).

# Adapt Essentials: Advanced Descriptions
A simple tool to help your developers make life easier for the content editors!

This application is designed to provide extensive descriptions about your content types with the help of images and longer help texts.

## Why?
Quite often developers implement custom logic behind the scenes that changes the way a content type is being rendered on the website. For a content editor without any development experience, that can lead to confusion and multiple trial and error testing before achieving the desired result.

The solution is to provide additional **visual** information for your content types so that editors know what kind of variations they can build.

## How to use it?
### Create description
Once you've installed the application, in the configuration screen simply press **Create a description** and a modal will show up asking you to choose which content type would you like to create a description for.
![image](https://github.com/adaptdk/adapt-essentials-sidebar-descriptions/assets/69549795/97cef06b-c119-44b3-8669-2dcd0c371c67)

By default, a description will have a single text field. Text fields are supported by markdown and you can see how it will look by pressing **Preview text**. If a text field is not enough, you have the options to add image fields too.
![image](https://github.com/adaptdk/adapt-essentials-sidebar-descriptions/assets/69549795/acfa3bf4-213c-4e44-bd77-b6a750f2321a)

⚠️ Once you are done adding descriptions for your content types, don't forget to hit **Save** in the top right corner!

### Configure content type
The next and final step is to enable the application for your content types. Simply hit the **Open configuration** button for each content type you've added descriptions for and enable the application in your **Sidebar** or **Entry editors** sections.

ℹ️ We recommend using the **Entry editors** view since it has more space available for displaying your descriptions.

| Sidebar | Entry editors |
| --- | --- |
| ![image](https://github.com/adaptdk/adapt-essentials-sidebar-descriptions/assets/69549795/7e8ea77c-9043-4a05-84ec-8b6cc49f9fcd) | ![image](https://github.com/adaptdk/adapt-essentials-sidebar-descriptions/assets/69549795/6345ec5c-fe8a-4f2f-914c-5cc414da944d) |

### Final result
After you've configured everything correctly, go to an entry of your configured content type and you should see your descriptions in the Entry editor or the Sidebar! In the screenshot below, we have them configured in both places.
![image](https://github.com/adaptdk/adapt-essentials-sidebar-descriptions/assets/69549795/1ceba38e-4f74-46a7-81cb-fba20c213259)

## Bug reports
If you've found any bugs, please open an issue here: https://github.com/adaptdk/adapt-essentials-sidebar-descriptions/issues

## Feature requests
If you think the application is missing any features, please open an issue here: https://github.com/adaptdk/adapt-essentials-sidebar-descriptions/issues

## [Privacy Policy](https://adaptagency.com/privacy-policy)


---


## Development

Execute create-contentful-app with npm, npx or yarn to bootstrap the example:

```bash
# npx
npx create-contentful-app --example vite-react

# npm
npm init contentful-app --example vite-react

# Yarn
yarn create contentful-app --example vite-react
```

### Available Scripts

In the project directory, you can run:

#### `npm start`

Creates or updates your app definition in Contentful, and runs the app in development mode.
Open your app to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

#### `npm run upload`

Uploads the `dist` folder to Contentful and creates a bundle that is automatically activated.
The command guides you through the deployment process and asks for all required arguments.
Read [here](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/#deploy-with-contentful) for more information about the deployment process.

#### `npm run upload-ci`

Similar to `npm run upload` it will upload your app to contentful and activate it. The only difference is
that with this command all required arguments are read from the environment variables, for example when you add
the upload command to your CI pipeline.

For this command to work, the following environment variables must be set:

- `CONTENTFUL_ORG_ID` - The ID of your organization
- `CONTENTFUL_APP_DEF_ID` - The ID of the app to which to add the bundle
- `CONTENTFUL_ACCESS_TOKEN` - A personal [access token](https://www.contentful.com/developers/docs/references/content-management-api/#/reference/personal-access-tokens)

### Libraries to use

To make your app look and feel like Contentful use the following libraries:

- [Forma 36](https://f36.contentful.com/) – Contentful's design system
- [Contentful Field Editors](https://www.contentful.com/developers/docs/extensibility/field-editors/) – Contentful's field editor React components

### Using the `contentful-management` SDK

In the default create contentful app output, a contentful management client is
passed into each location. This can be used to interact with Contentful's
management API. For example

```js
// Use the client
cma.locale.getMany({}).then((locales) => console.log(locales));
```

Visit the [`contentful-management` documentation](https://www.contentful.com/developers/docs/extensibility/app-framework/sdk/#using-the-contentful-management-library)
to find out more.

### Learn More

[Read more](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/) and check out the video on how to use the CLI.
