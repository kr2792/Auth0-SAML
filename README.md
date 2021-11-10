# shibboleth-test
Auth0 SAML configuration. Download project, run *yarn* to install node packages, then run *yarn start* to start the program. 


## Create Auth0 Tenant
First sign in or sign up to https://auth0.com/. Then create an Auth0 tenant


![image](https://user-images.githubusercontent.com/18439722/141102820-a6ac381d-7592-4769-ae07-cbb2b2739acb.png)


## Creating an application
![image](https://user-images.githubusercontent.com/18439722/141103619-851016e4-b155-43b9-970e-58053eda06af.png)


Go to **Applications** > **Applications**, and press *Create Application*. Give it a fitting name and select the type you want to use. This project uses *Single Page Web Application*. 


Press **Settings** and copy the domain and client id as it will be used in your project. Add your site url e.g. http://localhost:3000 to **Allowed Callback URLs** which makes it possible for Auth0 to rediret you back to the site after login. If you have downloaded this project, then access it in your code editor, and create an env.local file, where you add *REACT_APP_AUTH0_CLIENT_ID* and *REACT_APP_AUTH0_DOMAIN*. These two variables are used in the Auth0provider which can be seen in the index.js file.

## SAML configuration

Go to **Authentication** > **Enterprise** and press the add button for SAML.
![image](https://user-images.githubusercontent.com/18439722/141107503-91957e57-01d1-4720-bb5d-885a813ea281.png)

You'll now be able to change settings to for this connection. Give it a fitting identifier. 

Give it a sign in url then enable signout out and add the signout url. Scroll to the bottom and press save.

Now scroll back up and press *Login experience*
![image](https://user-images.githubusercontent.com/18439722/141130456-828d795e-08c2-49b1-9e72-04151134659b.png)

Scroll to the botton and toggle *Display connection as a button*, and give the button an approproate name.

### Auth0 SP metadata
Go to the top of the settings page for the SAMl enterpise configurion and press setup.

![image](https://user-images.githubusercontent.com/18439722/141117620-7ed7cfcd-7c7f-467f-ac33-be06feb058b2.png)

Go the url that's located there, and oy'll be directed to a page that looks like this:
![image](https://user-images.githubusercontent.com/18439722/141124945-99e927ca-5c5c-4487-b0b3-a018eedcf63a.png)


This page contains urls and metadata that the IDP requires, so that this SAMl configuration can registered.

The metadata can viewed or downloaded at https://TENANT_NAME/samlp/metadata?connection=YOUR_CONNECTION_NAME. *YOU_CONNECTION_NAME* is the identifier you gave the SAML enterprise configuration.

The metadata for this  [configuration](https://shiboleth-test.eu.auth0.com/samlp/metadata?connection=Shibboleth-test).

## Login with SAML enterprise

Go back to **Appilications** > **Applications**, select the project you created, then press *conections* and toggle the SAML Enterprise option you've created.

You can now login with SAML in your project.

##
Links to Auth0 documentation & tutorials:
https://auth0.com/docs/configure/saml-configuration/configure-auth0-saml-service-provider
https://auth0.com/docs/configure/saml-configuration/configure-auth0-as-service-and-identity-provider
