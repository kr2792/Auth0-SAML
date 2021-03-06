SAML tutorial markdown

# Auth0 SAML
This configurations uses React but Auth0 also supports other frameworks such a Angular or Vue. The React project uses a node package *@auth0/auth0-react"* which makes it possible to use Auth0 functions and objects like login, logout, isAuthenticated, and user. The entry points of the project e.g. index.js gets wrapped with an Auth0Provider from the same package with a set configuration which makes it posssible for us to the use the previosly mentioned Auth0 functionalites in all of our project. 

## Starting project
Clone the repository, run *yarn* to install node packages. You'll have to create an env.local file with variables called *REACT_APP_AUTH0_CLIENT_ID* and *REACT_APP_AUTH0_DOMAIN*. You need to leave them undefined, as their required values come from the service provider Auth0 tenant which you haven't made yet.


## Create Auth0 Tenant
![image](https://user-images.githubusercontent.com/18439722/141959056-c64c3071-9188-4ffb-aa02-57227337c4cd.png)

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

Then scroll up again and press *Endpoints* and copy the SAML protocol url.
![image](https://user-images.githubusercontent.com/18439722/141766097-b8ec4c1d-809e-46e8-9795-967c6da2b32c.png)

Switch to the Service Provider tenant.

![image](https://user-images.githubusercontent.com/18439722/141766684-0248f240-fc8a-4f24-8cc0-a2d01d54932c.png)


## SAML configuration

Go to **Authentication** > **Enterprise** and press the add button for SAML.
![image](https://user-images.githubusercontent.com/18439722/141107503-91957e57-01d1-4720-bb5d-885a813ea281.png)

You'll now be able to change settings to for this connection. 

![image](https://user-images.githubusercontent.com/18439722/141949579-1cfbf69d-0d27-4952-a1da-f46413e523e7.png)


Give it a fitting identifier and paste the copied url in **Sign In URL** and **Sign Out URL**, then add the downloaded certificate in **X509 Signing Certificate**. Scroll to the bottom and press save.


Now scroll back up and press *Login experience*
![image](https://user-images.githubusercontent.com/18439722/141130456-828d795e-08c2-49b1-9e72-04151134659b.png)

Scroll to the botton in the new view and toggle *Display connection as a button*. You can also add a descriptive text e.g. "Login with SAML".

Go back to **Appilications** > **Applications**, select the project you created, then press *conections* and toggle the SAML Enterprise option you've created.
![image](https://user-images.githubusercontent.com/18439722/141951707-85b465a3-1452-4770-94c5-387bd0270894.png)


### Auth0 SP metadata
Go to the top of the settings page for the SAML enterpise configuration and press setup.

![image](https://user-images.githubusercontent.com/18439722/141117620-7ed7cfcd-7c7f-467f-ac33-be06feb058b2.png)

Go the url that's located there, and you'll be directed to a page that looks like this:
![image](https://user-images.githubusercontent.com/18439722/141124945-99e927ca-5c5c-4487-b0b3-a018eedcf63a.png)

This page contains urls and metadata that the IDP requires, so that this SAML configuration can be registered with it.

Copy *post-back URL* and *Entity Id* fields

Switch to your ID Provider tenant, press **Applications > applications** and select the app you configered before.  
Press the **Addons** tab.

![image](https://user-images.githubusercontent.com/18439722/141768900-45bb45f8-6ce9-4d3b-a7e6-2b70531b6cfd.png)

Press **Settings**

![image](https://user-images.githubusercontent.com/18439722/141769568-7e68e0e5-7589-4066-b022-4941e15aee6d.png)
Delete the code in the settings window except for audience, and paste the entityId from the Service Provider. If you haven't copied it, then you can go back to https://auth0.com/docs/configure/saml-configuration/saml-identity-provider-configuration-settings, and change to the service provider tenant in the top right corner. The page might redirect you to a different page, but you can just press back in the browser, and you'll return to the metadata page with the right tenant is selected. The **conection_name** variable is the name of your enterprise connection.


You can now login with SAML in your project.
![image](https://user-images.githubusercontent.com/18439722/141794724-4073ec43-6de3-44fd-95bf-c563a029fa6b.png)

## Logout

Logging out for SAML is a bit different in Auth0 fro other than other configurations e.g. Google social login, so it needs some further [configuration](https://auth0.com/docs/login/logout/log-users-out-of-saml-idps). This might be cause for why Auth0 keeps logging the same user in everytime. This issue can be mitigated by open site in an incognito tab.


## Decoding SAML Response

Auth0 has a [tool](https://samltool.io/) that can decode SAML. Look at the network tab when logging in select the *callback?conection=YOUR_CONECTION*, copy the saml response in the bottom, and go the Auth0 tool and paste the SAML response there.

![image](https://user-images.githubusercontent.com/18439722/141998757-22a58cd0-28c1-4cf2-94bb-c5407c18b4b0.png)

## SAML Bindings
![image](https://user-images.githubusercontent.com/18439722/142000194-86678256-7e8e-47e2-abb9-906df02c29c0.png)

You can map SAML bindings like this for you enterprise configuration. *personalIdentityNumber* is a custom property for an user in the Auth0 IDP tenant

![image](https://user-images.githubusercontent.com/18439722/142000529-4ae39969-b387-4559-ba02-eacf831e5567.png)


## Links
Links to Auth0 documentation & tutorials:
https://auth0.com/docs/configure/saml-configuration/configure-auth0-saml-service-provider
https://auth0.com/docs/configure/saml-configuration/configure-auth0-as-service-and-identity-provider

