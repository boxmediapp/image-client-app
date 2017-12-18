source ../box-secrets/image.sh
echo "deploying the version 1.1.15-SNAPSHOT to ec2-user@image.boxnetwork.co.uk using the property file ../box-secrets/image.sh (for replacement of the environment specific variables) ..."
deploy/deploy.sh image.boxnetwork.co.uk ec2-user 1.1.15-SNAPSHOT
