const textValues={
    title:"Box Media Image",
    uploadHDImageText:["Drop an image here",
                "Requires: 1920 x 1080"],
    newepisodes:{
      link:"/image-app/new-episodes",
      linkText:"Assign Images",
      actionText:"Assign Images"
    },
    imagesets:{
       link:"/image-app/image-sets",
       linkText:"Image Sets",
       norecords:"No assigned images",
       actionText:"Edit Image Sets"
    },
    assignedEpisodes:{
       link:"/image-app/assigned-episodes",
       linkText:"Image Library",
       norecords:"No images found",
       actionText:"Edit Images"
    },

    clientsView:{
      link:"/image-app/clients-view",
      linkText:"Clients View",
      actionText:"Approved Images"
    },
    logout:{
      link:"/image-app/logout",
      linkText:"Sign out"
    },
    assignImageByEpisode:{
        link:"/image-app/assign-image/new-episodes",
        linkText:"Assign Image"
    },

    cacheMamnagement:{
      link:"/image-app/cache-maagement",
      linkText:"Manage Cache",
      actionText:"Purge Image Cache"
    },
    scheduleImport:{
      link:"/image-app/schedule-imports",
      linkText:"Schedule Imports",
      actionText:"Import from Pirate"

    },
    assignImageByContractAndEpidodeNumber:{
         link:"/image-app/assign-image/contract-episode-number",
         actionText:"Edit"
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
    }


  };
export default textValues;
