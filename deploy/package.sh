
sed -i -e "s,dev,prod,g" src/configs/config.js
sed -i -e "s,import AutoLogin from '../do-not-check-in';,,g" src/display-login/DisplayLogin.js
source deploy/util.sh
yarn build
mvn package
getProjectVersionFromPom
deploy/create_deploy_scripts.sh
