source deploy/util.sh
sed -i -e "s,import AutoLogin from '../do-not-check-in';,,g" src/display-login/DisplayLogin.js
git add .
git commit -m "releasing"
yarn build
mvn gitflow:release-start
mvn gitflow:release-finish
git checkout  master
getProjectVersionFromPom
git checkout develop
