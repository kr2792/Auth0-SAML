# shibboleth-test
This configurations uses React but Auth0 also supports other SSO implementations such a Angular or Vue.

## Starting project
Clone repository, run *yarn* to install node packages. You'll have to create an env.local file with variables called *REACT_APP_AUTH0_CLIENT_ID* and *REACT_APP_AUTH0_DOMAIN*. You need to leave them undefined, as their required values come from the service provider Auth0 tent which you haven't made yet.


## Create Auth0 Tenant
First sign in or sign up to https://auth0.com/. Then create an Auth0 tenant that will act as a service provider.


![image](https://user-images.githubusercontent.com/18439722/141102820-a6ac381d-7592-4769-ae07-cbb2b2739acb.png)


## Creating an application
![image](https://user-images.githubusercontent.com/18439722/141103619-851016e4-b155-43b9-970e-58053eda06af.png)


Go to **Applications** > **Applications**, and press *Create Application*. Give it a fitting name and select the type you want to use. This project uses *Single Page Web Application*. 


Press **Settings** and copy the domain and client id as it will be used in your project. Add your site url e.g. http://localhost:3000 to **Allowed Callback URLs** which makes it possible for Auth0 to rediret you back to the site after login. If you have downloaded this project, then access it in your code editor, and create an env.local file, where you add *REACT_APP_AUTH0_CLIENT_ID* and *REACT_APP_AUTH0_DOMAIN*. These two variables are used in the Auth0Provider which can be seen in the [index.js](https://github.com/kr2792/shibboleth-test/blob/main/src/index.js#L10) file. Auth0 will fail if *redirectUri* is not in the **Allowed Callback URLs** field.

## SAML configuration

Go to **Authentication** > **Enterprise** and press the add button for SAML.
![image](https://user-images.githubusercontent.com/18439722/141107503-91957e57-01d1-4720-bb5d-885a813ea281.png)

You'll now be able to change settings to for this connection. Give it a fitting identifier. 

Leave the sign in field with a temporary placeholder and sign out field empty for now, as we'll have to create an Auth0 tenant ID provider which will have those value. Scroll to the bottom and press save.

Now scroll back up and press *Login experience*
![image](https://user-images.githubusercontent.com/18439722/141130456-828d795e-08c2-49b1-9e72-04151134659b.png)

Scroll to the botton and toggle *Display connection as a button*, and give the button an approproate name.

### Auth0 SP metadata
Go to the top of the settings page for the SAMl enterpise configurion and press setup.

![image](https://user-images.githubusercontent.com/18439722/141117620-7ed7cfcd-7c7f-467f-ac33-be06feb058b2.png)

Go the url that's located there, and you'll be directed to a page that looks like this:
![image](https://user-images.githubusercontent.com/18439722/141124945-99e927ca-5c5c-4487-b0b3-a018eedcf63a.png)


This page contains urls and metadata that the IDP requires, so that this SAMl configuration can registered.

The metadata can viewed or downloaded at https://TENANT_NAME/samlp/metadata?connection=YOUR_CONNECTION_NAME. *YOUR_CONNECTION_NAME* is the identifier you gave the SAML enterprise configuration.

The metadata for this  [configuration](https://shiboleth-test.eu.auth0.com/samlp/metadata?connection=Shibboleth-test).

## Creating the ID provider
Create a new tentant again, then either create a new application or use the default one.

Go to the settings tab, and scroll to *Advanced settings*
![image](https://user-images.githubusercontent.com/18439722/141764829-0920b1f8-5678-4e69-b377-9a47c920f2a6.png)

Press *Certificates* then *Download* certificate and select *pem*.

Then go to *Endpoints* and copy the SAML protocol url.
![image](https://user-images.githubusercontent.com/18439722/141766097-b8ec4c1d-809e-46e8-9795-967c6da2b32c.png)

Now change the tab to **Addons**

![image](https://user-images.githubusercontent.com/18439722/141768900-45bb45f8-6ce9-4d3b-a7e6-2b70531b6cfd.png)

Press **Settings**
![image](https://user-images.githubusercontent.com/18439722/141769568-7e68e0e5-7589-4066-b022-4941e15aee6d.png)
Delete the code in the windows except for audience, and paste the entityId from the Service Provider. If you haven't copied it, then you can go back to https://auth0.com/docs/configure/saml-configuration/saml-identity-provider-configuration-settings, and change to the service provider tenant in the top right corner.

Change tenant to the Serve Provider

![image](https://user-images.githubusercontent.com/18439722/141766684-0248f240-fc8a-4f24-8cc0-a2d01d54932c.png)

And go back to your newly enterprise login which you do by pressing **Authentication > Enterprise > SAML** and then the SAMl you have created there.

Paste the copied url in **Sign In URL** and **Sign Out URL**, then add the downloaded certificate in **X509 Signing Certificate**
## Login with SAML enterprise

Go back to **Appilications** > **Applications**, select the project you created, then press *conections* and toggle the SAML Enterprise option you've created.

You can now login with SAML in your project.

Auth0 has a [tool](https://samltool.io/) that can can SAML.

##
Links to Auth0 documentation & tutorials:
https://auth0.com/docs/configure/saml-configuration/configure-auth0-saml-service-provider
https://auth0.com/docs/configure/saml-configuration/configure-auth0-as-service-and-identity-provider
