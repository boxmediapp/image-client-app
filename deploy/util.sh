projectName="image-client-app"
userguidefilepath="/Users/dilshathewzulla/Dropbox/boxtv/image-workflow/UserGuide.pdf"
getProjectVersionFromPom(){
  projectversion=`grep -A 0 -B 2 "<packaging>" pom.xml  | grep version  | cut -d\> -f 2 | cut -d\< -f 1`
  export projectversion
}

buildVariables(){
  export websiterootfolder="bdocker/bnginx/var/www"

  export websitefoldername="imageapp"
  export zipfilename="$projectName-$projectversion.zip"
  export sourcezipfilepath="package/target/$zipfilename"
  export destzipfolder="$websiterootfolder/$websitefoldername"
}

executeScript(){
   echo "executing the script $1 remotely  on  $deploy_to_username@$deploy_to_hostname "
   ssh $deploy_to_username@$deploy_to_hostname 'bash -s' < $1
   echo "remote execution completed"
}
executeDeployedScriptOnServer(){
   echo "executing the deployed script $1 remotely  on  $deploy_to_username@$deploy_to_hostname "
   ssh $deploy_to_username@$deploy_to_hostname "cd $destzipfolder && ./$1"
   echo "remote execution completed"
}


createFolders(){
    createUniqueidforfilename
    echo "creating the script for creating folder: /tmp/script_$uniqueidforfilename.sh"
    echo "mkdir -p $destzipfolder" > /tmp/script_$uniqueidforfilename.sh

    executeScript /tmp/script_$uniqueidforfilename.sh
}

uploadZipFile(){
    echo "uploading the $sourcezipfilepath to  $deploy_to_username@$deploy_to_hostname:$destzipfolder/"
    scp $sourcezipfilepath $deploy_to_username@$deploy_to_hostname:$destzipfolder/
}

uploadSSLCertificated(){
    scp $ssl_certificate_location/* $deploy_to_username@$deploy_to_hostname:bdocker/bnginx/etc/nginx/ssl/
}
unzipZipFile(){
      createUniqueidforfilename
      unzipAndReplaceVariables $uniqueidforfilename
      executeScript /tmp/script_$uniqueidforfilename.sh
}

unzipAndReplaceVariables(){
    uniqueidforfilename=$1

    echo "creating the script:/tmp/script_$uniqueidforfilename.sh"
    echo "cd $destzipfolder" > /tmp/script_$uniqueidforfilename.sh
    echo "unzip -o $zipfilename" >> /tmp/script_$uniqueidforfilename.sh
    echo  'find static/js/ -iname "*.js" -exec sed -i -e "s,@@@global_input_url@@@,'$global_input_url',g" {} \;' >> /tmp/script_$uniqueidforfilename.sh
    echo  'find static/js/ -iname "*.js" -exec sed -i -e "s,@@@global_input_apikey@@@,'$global_input_apikey',g" {} \;' >> /tmp/script_$uniqueidforfilename.sh
    echo  'find static/js/ -iname "*.js" -exec sed -i -e "s,@@@global_input_apikey_securityGroup@@@,'$global_input_apikey_securityGroup',g" {} \;' >> /tmp/script_$uniqueidforfilename.sh


}
makeSchellScriptExecutable(){
    createUniqueidforfilename
    createSCriptFormakeSchellScriptExecutable $uniqueidforfilename

    executeScript /tmp/script_$uniqueidforfilename.sh
}

createSCriptFormakeSchellScriptExecutable(){
    uniqueidforfilename=$1
    echo "creating the script for making executable: /tmp/script_$uniqueidforfilename.sh"
    echo "cd  $destzipfolder && chmod u+x *.sh" > /tmp/script_$uniqueidforfilename.sh
}

createDeployScript(){
    echo "source $3" > deploy/deploy_to_$1.sh
    echo 'echo "deploying the version '$2' to '$5'@'$4' using the property file '$3' (for replacement of the environment specific variables) ..."' >>  deploy/deploy_to_$1.sh
    echo "deploy/deploy.sh $4 $5 $2" >> deploy/deploy_to_$1.sh
    chmod u+x deploy/deploy_to_$1.sh
}


createUniqueidforfilename(){
  if [ -z "${uniqueidforfilename+x}" ]
  then
        uniqueidforfilename=$(date +%s)

 else
        export uniqueidforfilename=$((uniqueidforfilename+1))
 fi
}

copyTheAppToDockerFolder(){
    createUniqueidforfilename
    echo "creating the script for copyTheAppToDockerFolder: /tmp/script_$uniqueidforfilename.sh"
    echo "rsync -azvv  $destzipfolder/app/ $destzipfolder/node/app/" > /tmp/script_$uniqueidforfilename.sh
    executeScript /tmp/script_$uniqueidforfilename.sh
}
buildAndStartDocker(){
    executeDeployedScriptOnServer start.sh
}
uploaUserGuideFile(){
    echo "uploading the userguide to  $deploy_to_username@$deploy_to_hostname:$destzipfolder/"
    scp $userguidefilepath $deploy_to_username@$deploy_to_hostname:$destzipfolder/
}
