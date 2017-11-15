const textValues={
    title:"Box Media Image",
    newepisodes:{
      link:"/image-app/new-episodes",
      linkText:"New Episodes",
      actionText:"Assign Images"
    },
    imagesets:{
       link:"/image-app/contract-episode-images",
       linkText:"Assigned Images",
       norecords:"No assigned images",
       actionText:"Edit Assigned Images"
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
    admin:{
      link:"/image-app/admin-view",
      linkText:"Admin",
      actionText:"Purge Image Cache"
    },

    addImageView:{
      episode:{
          link:"/image-app/add-image/episode-images",
          text:"Add Image"
      },
      contractEpisode:{
         link:"/image-app/add-image/contract-episode-images",
         text:"Edit"
      },
      uploadText:["Drop an image here",
                  "Requires: 1920 x 1080"]

    },
    upload:{
      failed:"Failed to upload the file to the s3 bucket",
      aborted:"Upload aborted"
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

    }


  };
export default textValues;
