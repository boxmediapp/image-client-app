source deploy/util.sh


createDeployScript image  $projectversion  ../box-secrets/image.sh  image.boxnetwork.co.uk      ec2-user
createDeployScript dubuntu  $projectversion  ../box-secrets/image.sh  dubuntu    dilshat
createDeployScript box  $projectversion  ../box-secrets/image.sh  mediapp.iterativesolution.co.uk     ec2-user
