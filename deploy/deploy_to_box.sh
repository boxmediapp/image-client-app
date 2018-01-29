source ../box-secrets/image.sh
echo "deploying the version 1.1.25-SNAPSHOT to ec2-user@mediapp.iterativesolution.co.uk using the property file ../box-secrets/image.sh (for replacement of the environment specific variables) ..."
deploy/deploy.sh mediapp.iterativesolution.co.uk ec2-user 1.1.25-SNAPSHOT
