const textValues={
    title:"Box Plus Image Application",
    newEpisodes:{
      link:"/image-app/missing-images",
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
    addImageView:{
      episode:{
          link:"/image-app/add-image/episode-images",
          text:"Add Image"
      },
      contractEpisode:{
         link:"/image-app/add-image/contract-episode-images",
         text:"Edit"
      },
      uploadText:["You can drag and drop the image you would like to upload",
                  "or you can click to select the image you would like to upload",
                  "Note that only the images with 1920 x 1080 resolution is acceptable."]
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
