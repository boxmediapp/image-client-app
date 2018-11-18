const textValues={
    title:"Box Image Asset Manager",
    uploadHDImageText:["Drop an image here",
                "Requires: 1920 x 1080"],

    uploadPermissonError:"You do not have permission to upload image",
    permissionError:{
        title:"Permission Error",
        content:"You do not have permission to do this operation!"
    },
    signin:{
        title:"Sign in"
    },
    userGuide:{
        linkText:"User Guide"
    },
    newepisodes:{
      link:"/image-app/services/new-episodes",
      linkText:"Assign Images",
      actionText:"Assign Images"
    },
    listScheduleEpisodes:{
      link:"/image-app/services/schedule-episodes",
      linkText:"Schedules",
      actionText:"Episodes by TX"
    },
    imagesets:{
       link:"/image-app/services/image-sets",
       linkText:"Image Sets",
       norecords:"No assigned images",
       actionText:"Edit Image Sets"
    },
    assignedEpisodes:{
       link:"/image-app/services/assigned-episodes",
       linkText:"Edit Images",
       norecords:"No images found",
       actionText:"Edit Images"
    },
    admin:{
              link:"/image-app/services/admin",
              linkText:"Admin",
              actionText:"Admin"
        },

    logout:{
      link:"/image-app/logout",
      linkText:"Sign out"
    },
    signup:{
       link:"/image-app/sign-up",
       linkText:"Create Account",
       error:{
         title:"Error",
         firstName:"The first name is a required field",
         lastName:"The last name is a required field",
         email:"The email is a required field",
         password:{
             missing:"The password is a required field",
             tooshort:"The password should be at least 6 characters inn length"
         },
         company:"The company field is a required field",
       },
       welcome:{
            title:"Welcome to the Box Image Asset Manager",
            content:["You can now sign in using the username and the password you have specified. Please click",
              "here",
              " to continue"
            ],
            mobile:{
               content:["You can now sign in using the username and the password you have specified. Please click",
                        "Please click on the following button to go to sign in page"],
              okButton:"OK"
            }

       }
    },
    assignImageByEpisode:{
        link:"/image-app/services/assign-image/new-episodes",
        linkText:"Assign Image"
    },
    manageUser:{
          linkText:"Users Manager",
          actionText:"Manage Users",
          link:"/image-app/services/manage-users",
    },
    manageCache:{
      link:"/image-app/services/manage-cache",
      linkText:"Manage Cache",
      actionText:"Purge Image Cache"
    },
    manageSchduleImport:{
      link:"/image-app/services/manage-schedule-imports",
      linkText:"Schedule Imports",
      actionText:"Import from Pirate"

    },
    manageSMTPConfig:{
      link:"/image-app/services/manage-smtp-config",
      linkText:"SMTP Config",
      actionText:"Email Configuration",
      loadingError:{
        title:"Error Loading Config"
      },
      updateError:{
        title:"Error Updating Config"
      },
      updateSucess:{
         title:"Updated Successful",
         content:"SMTP Config is updated"
      }
    },
    assignImageByContractAndEpidodeNumber:{
         link:"/image-app/services/assign-image/contract-episode-number",
         actionText:"Edit",
         linkText:"Edit"
    },


    upload:{
      failed:"Failed to upload the file to the s3 bucket",
      aborted:"Upload aborted"
    },
    notCorrectSize:{
        droppedImage:"The dropped image ",
          required:" is not acceptable for the field."
    },
    home:{
        link:"/",
        linkText:"Home"
    },
    logout:{
      link:"/",
      linkText:"Sign out"
    },
    deleteImageDialog:{
      title:"Warning",
      content:"The image and its associated metadata will be deleted permanently",
      confirm:"Delete",
      cancel:"Cancel"

    },
    deleteImageSetDialog:{
      title:"Danger",
      content:"All the images in this set will be deleted permanently, are you sure you want continue?",
      confirm:"Delete All",
      cancel:"Cancel"

    },
    uploadToMediaAppDialog:{
      title:"Box Media App",
      content:"The Image is uploaded to the Box Media App",
      confirm:"OK"
    },
    account:{
      link: "/image-app/account",
      linkText:"Account",
      actionText:"Account",
      originalPasswordVerify:{
           title:"User Verification",
           verification:{
                 error:"The password verification failed"
           }
      },
      selectDataToModify:{
          title:"Select Data to Modify",
          firstName:{
              label:"First Name"
          },
          lastName:{
              label:"Last Name"
          },
          email:{
              label:"Email"
          },
          password:{
              label:"Change Password"
          },
          company:{
              label:"Company"
          },
      },
      modifyFirstName:{
            title:"Update First Name",
            error:"Failed to update the first name",
            placeHolder:"First Name",
            label:"First Name"
      },
      modifyLastName:{
            title:"Update Last Name",
            error:"Failed to update the last name",
            placeHolder:"Last Name",
            label:"Last Name"
      },
      modifyEmail:{
            title:"Update Email",
            error:"Failed to update the email",
            placeHolder:"Email",
            label:"Email"
      },
      modifyPassword:{
            title:"Change Password",
            error:"Failed to change password",
            placeHolder:"Password",
            label:"New Passsword"
      },
      modifyCompany:{
            title:"Modifying Company",
            error:"Failed to update the company",
            placeHolder:"Company",
            label:"Company"
      },
    },
    noServices:{
        link:"/image-app/services",
        title:"Service Not Permitted"
    },
    deleteAllImageSet:{
        buttonName:"Delete the Existing Images",
    },
    copyImageSet:{
        action:"Copy To the Episodes with the Same Contract",
        title:"Copying To the Episodes",
        content:"The following episodes are found to have the same contract number.",
        help:"The 'Copy' button copies the images to the episodes that do not have images. The 'Delete' button deletes all the existing images.",
        deleteImageSet:{
            title:"Deleting the image sets in the episodes",
            content:"Are you sure you want permanantly delete the images in the episodes?",
            deleteError:"Failed to delete the image set:"
        },
        buttonName:"Copy",
        error:{
            title:"Error",
            copyError:"Error when copying the images into the other episodes:",
            loadFailed:"Error loading episode data from the server"
        },
        loading:{
            title:"Loading Data",
            content:"Loading the Episodes to copy images into"
        },
        noEpisodes:{
            title:"No Episodes Found",
            content:"There is no episodes found that has the same contract number and no images assigned"
        },

        progress:{
          title:"Work in Progress",
          content:"Jobs remaining:"
        }

    }


  };
export default textValues;
