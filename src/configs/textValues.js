const textValues={
    title:"Box Media Image",
    uploadHDImageText:["Drop an image here",
                "Requires: 1920 x 1080"],                
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

    }


  };
export default textValues;
