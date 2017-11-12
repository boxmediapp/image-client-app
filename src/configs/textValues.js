const textValues={
    title:"Box Media Image",
    newepisodes:{
      link:"/image-app/new-episodes",
      linkText:"New Episodes"
    },
    imagesets:{
       link:"/image-app/contract-episode-images",
        linkText:"Image Sets"
    },
    clients:{
      link:"/image-app/clients",
      linkText:"Clients"
    },
    logout:{
      link:"/image-app/logout",
      linkText:"Sign out"
    },
    assignImageByEpisode:{
        link:"/image-app/assign-image/new-episodes",
        linkText:"Assign Image"
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
