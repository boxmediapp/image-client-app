# image-client-app
This is the ReactJS web application




### Checkout

> ```git clone git@github.com:boxmediapp/image-client-app.git```

### Run locally

>```yarn start```

or
>```npm start```

This React JS application is created with ```create-react-app```

### How to deploy it to your own server

open the following file with an editor

```deploy/create_deploy_scripts.sh```

and add the following a new line representing your target host:

```createDeployScript <replace-it-with-a-unique-name>  $projectversion  ~/global-input-secrets/env.sh  <host-name>      <user-name> ```

the ```env.sh``` in this case an empty file.

 then package it by running the following command:

 ```deploy/package.sh```

 and then deploy it to your host:

 ```deploy/<replace-it-with-unique-name>.sh```

 above script will be generated when you run the ```deploy/package.sh```

It will just copy the static files to the host.
