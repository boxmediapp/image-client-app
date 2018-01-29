import {textValues as appTextValues} from "../../configs";


const ptextValues={
      tc:{
        title:"IMAGE USE TERMS AND CONDITIONS",
        content:{
            p1:[
                "The following is a legal Agreement between you or the employer or other entity on whose behalf you are entering into this Agreement (\"**you**\" or \"**Platform**\") and The Box Plus Network Limited (\“**Box Plus**\”).",
                "Please read these Terms and Conditions (\“**Terms**\”) carefully. By accessing or using any Box Plus Images (as defined below), and by stating you accept the Terms, you agree to abide by and be bound by the Terms and by all terms, policies and guidelines incorporated by reference, as well as any additional terms and restrictions presented in relation to specific Images.  Box Plus reserves the right to modify these terms at any time in its sole discretion. Box Plus will notify you of any such change by an announcement on this page, and/or by other means to provide you the opportunity to review the modifications before they become effective. By continuing to download and/or use Images, you agree to be bound by all such changes. If you do not agree with any of the changes, do not download or use any Images",
                "\"**Images**\" means photographs, still images, drawings and the like made available by Box Plus for download by you at ```http://images.boxplus.com/```",
                "PART I – VISUAL IMAGES LICENSE:",
                "1.	Box Plus hereby grants you a non-exclusive, non-transferable, revocable right to use, modify and digitally reproduce the Images in the United Kingdom (the “Territory”), subject to the limitations set forth herein.",
                "2.	You have the right to use the Images solely in the electronic program guide (“EPG”) for the Box Plus channels (currently The Box, Box Upfront, Box Hits, 4Music, Kiss, Magic, and Kerrang!) (hereinafter individually a “Channel” and collectively the “Channels”) and for no other purpose.",
                "3.	Images may be downloaded by you at the following link: INSERT LINK HERE.",
                "4.	If a particular Image may only be used within certain dates, you shall only use that Image within those dates.  Further, any Image may only be used with its associated Channel.",
                "5.	Any use of the Images shall be non-commercial, and the Images may not be used in any manner other than as set forth herein, including but not limited to outside of the Territory and/or use in merchandising, advertising, social media, websites, trademarks, service marks, logos, and physical printed form.",
                "6.	You may not resell, redistribute, provide access to, share or transfer any Images except as specifically provided herein.",
                "7.	Box Plus shall be entitled to require you to cease your use of the Images upon written notice (telephone or email to suffice). Upon receipt of such notice, you shall immediately (and in any event within twenty four (24 hours)) cease using the Images within the EPG.  Box Plus may discontinue licensing any of the Images at any time in its sole discretion.",
                "PART II - ADDITIONAL TERMS:",
                "8.	This Agreement is effective until it is terminated by either party. This Agreement may be terminated by Box Plus at any time, and for any reason.  Customer may terminate this Agreement by ceasing to use the Images.",
                "9.	You and Box Plus each warrants that you have the power and authority to enter into and perform your obligations under this Agreement.  You warrant that you shall only use the Images as set out in this Agreement.",
                "10.	You agree to defend, indemnify and hold harmless Box Plus and its parent, subsidiaries, affiliates, and content suppliers, and each of their respective officers, directors and employees from all damages, liabilities and expenses (including reasonable legal fees) arising out of or in connection with any breach or alleged breach by you (or anyone acting on your behalf) of any of the terms of this Agreement.",
                "11. Provided that the Images only used in accordance with this Agreement and you are not otherwise in breach of this Agreement, and as your sole and exclusive remedy for any breach of the warranties set forth in Section 9 above, Box Plus agrees, subject to the terms of this Section 11, to defend, indemnify and hold harmless you, your corporate parent, subsidiaries and affiliates, and each of your respective officers, directors and employees from all damages, liabilities and expenses (including reasonable legal fees) arising out of or in connection with any breach or alleged breach by Box Plus of its warranty in Section 9 above. This indemnification does not apply to the extent any damages, costs or losses arise out of or are a result of modifications made by you to the Images or the context in which the Images are used by you. This indemnification also does not apply to your continued use of Images following notice from Box Plus, or upon your knowledge, that the Images are subject to a claim of infringement of a third party's right.",
                "12.	Each party acknowledges that this Agreement constitutes the entire and only agreement between the parties relating to the subject matter hereof.",
                "13.	You may not assign any of your rights and obligations under this Agreement.",
                "14.	This Agreement shall be governed and construed in accordance with the laws of England and the parties hereby submit to the exclusive jurisdiction of the English Courts."
            ]
        },
        checkbox:{
            p1:"I agree to the ",
            p2:"Terms and Conditions",
            error:{
                title:"Accepting Terms and Conditions",
                content:"Please click on the check box to accept the Terms and Conditions."
            }
        }

      },
      imageSearch:{
        link:"/image-app/client-image/search-image",
        linkText:"Images",
        actionText:"Search Images"
      },
      home:{
          link:"/",
          linkText:"Home"
      },
      
      logout:{
        link:"/",
        linkText:"Sign out"
      },
      apiAccessHelp:{
        link:"/image-app/image-client/api-help",
        linkText:"Image API",
        actionText:"Image API",
        content:{
            title:"Image API",
            p1:["You need  a pair of a Client ID and a Client Secret to access the Box Image API.",
                "Your client ID and client Secret, and the services endpoint:"]
        }
      },
      noServices:{
          link:"/image-app/services",
          title:"Service Not Permitted"
      },

  };

var textValues=Object.assign({},appTextValues,ptextValues);

export default textValues;
