# shibboleth-test
This configurations uses React but Auth0 also supports other frameworks such a Angular or Vue.

## Starting project
Clone the repository, run *yarn* to install node packages. You'll have to create an env.local file with variables called *REACT_APP_AUTH0_CLIENT_ID* and *REACT_APP_AUTH0_DOMAIN*. You need to leave them undefined, as their required values come from the service provider Auth0 tenant which you haven't made yet.


## Create Auth0 Tenant
First sign in or sign up to https://auth0.com/. Then create an Auth0 tenant that will act as a service provider.


![image](https://user-images.githubusercontent.com/18439722/141102820-a6ac381d-7592-4769-ae07-cbb2b2739acb.png)


## Creating an application
![image](https://user-images.githubusercontent.com/18439722/141103619-851016e4-b155-43b9-970e-58053eda06af.png)


Go to **Applications** > **Applications**, and press *Create Application*. Give it a fitting name and select the type you want to use. This project uses *Single Page Web Application*. 


Press **Settings** and copy the domain and client id as it will be used in your project. Add your site url e.g. http://localhost:3000 to **Allowed Callback URLs** , **Allowed Web Origins**, and **Allowed Logout URLs** which makes it possible for Auth0 to redirect you back to the site after login/logout. If you have downloaded this project, then access it in your code editor, and create an env.local file, where you add *REACT_APP_AUTH0_CLIENT_ID* and *REACT_APP_AUTH0_DOMAIN*. These two variables are used in the Auth0Provider which can be seen in the [index.js](https://github.com/kr2792/shibboleth-test/blob/main/src/index.js#L10) file. Auth0 will fail if *redirectUri* is not in the **Allowed Callback URLs** field.


## Creating the ID provider
Create a new tenant again, then either create a new application or use the default one.

Go to the settings tab, and scroll to *Advanced settings*
![image](https://user-images.githubusercontent.com/18439722/141764829-0920b1f8-5678-4e69-b377-9a47c920f2a6.png)

Press *Certificates* then *Download certificate* and select *pem*.

Then go to *Endpoints* and copy the SAML protocol url.
![image](https://user-images.githubusercontent.com/18439722/141766097-b8ec4c1d-809e-46e8-9795-967c6da2b32c.png)

Switch to the Service Provider tenant.

![image](https://user-images.githubusercontent.com/18439722/141766684-0248f240-fc8a-4f24-8cc0-a2d01d54932c.png)


## SAML configuration

Go to **Authentication** > **Enterprise** and press the add button for SAML.
![image](https://user-images.githubusercontent.com/18439722/141107503-91957e57-01d1-4720-bb5d-885a813ea281.png)

You'll now be able to change settings to for this connection. 

Give it a fitting identifier and paste the copied url in **Sign In URL** and **Sign Out URL**, then add the downloaded certificate in **X509 Signing Certificate**. Scroll to the bottom and press save.

Now scroll back up and press *Login experience*
![image](https://user-images.githubusercontent.com/18439722/141130456-828d795e-08c2-49b1-9e72-04151134659b.png)

Scroll to the botton in the new view and toggle *Display connection as a button*. You can also add a descriptive text e.g. "Login with SAML".

### Auth0 SP metadata
Go to the top of the settings page for the SAMl enterpise configuration and press setup.

![image](https://user-images.githubusercontent.com/18439722/141117620-7ed7cfcd-7c7f-467f-ac33-be06feb058b2.png)

Go the url that's located there, and you'll be directed to a page that looks like this:
![image](https://user-images.githubusercontent.com/18439722/141124945-99e927ca-5c5c-4487-b0b3-a018eedcf63a.png)

This page contains urls and metadata that the IDP requires, so that this SAML configuration can be registered with it.

Copy *post-back URL* and *Entity Id* fields

Switch to your ID Provier tenant, press **Applications > applications** and select the app you configered before.  
Press the **Addons** tab.

![image](https://user-images.githubusercontent.com/18439722/141768900-45bb45f8-6ce9-4d3b-a7e6-2b70531b6cfd.png)

Press **Settings**

![image](https://user-images.githubusercontent.com/18439722/141769568-7e68e0e5-7589-4066-b022-4941e15aee6d.png)
Delete the code in the settings window except for audience, and paste the entityId from the Service Provider. If you haven't copied it, then you can go back to https://auth0.com/docs/configure/saml-configuration/saml-identity-provider-configuration-settings, and change to the service provider tenant in the top right corner. The page might redirect you to a different page, but you can just press back in the browser, and you'll return to the metadata page, where the right tenant is selected.


Go back to **Appilications** > **Applications**, select the project you created, then press *conections* and toggle the SAML Enterprise option you've created.


You can now login with SAML in your project.
![image](https://user-images.githubusercontent.com/18439722/141794724-4073ec43-6de3-44fd-95bf-c563a029fa6b.png)


##
Links to Auth0 documentation & tutorials:
https://auth0.com/docs/configure/saml-configuration/configure-auth0-saml-service-provider
https://auth0.com/docs/configure/saml-configuration/configure-auth0-as-service-and-identity-provider
Auth0 has a [tool](https://samltool.io/) that can decode SAML.
