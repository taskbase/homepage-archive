# Taskbase Setup

## Dev env

To run craft you'll need the following tools:
1. Apache Server
2. PHP7+ with Composer
3. MySql Database

### Setup Local Env

1. Get a DB dump from servd.host (Daniel has access)
2. Get the files from GitLab `git@code.taskbase.com:taskbase/craft-homepage.git`
3. Go to the webroot and copy the .env.example file to .env
4. Go to the webroot and run `php craft setup/security-key` to generate a Security Key
5. Fill in all the information. If you don't use a table prefix, you can just leave it empty
6. Go to the webroot and run `composer install`. This will install craft and all its dependencies
7. Now you should be able to run the website


---


## Deployment

The deployment to the staging and production environment uses git. To deploy you changes follow these steps:

1. Just commit your changes to the master. (You could deploy a branch, I just wouldn't)
2. Go to servd.host and navigate to Staging -> Settings
3. In the section **Select a Bundle** click the button **Create Bundle**
4. Select the commit you want to deploy and click **Create Bundle**. This will take a while.
5. When the bundle is created, it will show in the list. Click **Select**.
6. Click the **Sync** button in the top right of the control panel. This will sync all you configurations.

The same steps apply to the production environment.
> **Important:** The content will not be deployed and is different on every environment.