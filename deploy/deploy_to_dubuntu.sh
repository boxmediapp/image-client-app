source ../box-secrets/image.sh
echo "deploying the version 1.1.19-SNAPSHOT to dilshat@dubuntu using the property file ../box-secrets/image.sh (for replacement of the environment specific variables) ..."
deploy/deploy.sh dubuntu dilshat 1.1.19-SNAPSHOT
