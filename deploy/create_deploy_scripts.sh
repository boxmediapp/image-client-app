source deploy/util.sh


createDeployScript prod  $projectversion  ../box-secrets/image.sh  image.boxnetwork.co.uk      ec2-user
