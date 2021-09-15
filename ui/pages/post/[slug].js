import axios from "axios";
import PostOfferContainer from 'containers/PostOfferContainer'
const BASE_URL = process.env.API_ENDPOINT;

export async function getServerSideProps(context) {
    try {
      const { params } = context;
      if(params.slug) {
          const url = encodeURIComponent("https://www.instagram.com/p/" + params.slug);
          const { data } = await axios.get(`${BASE_URL}/get-post/${url}`);
          if (data.success && data.data) {
            const serverData = data.data;
            let meta = {}
            if(serverData.post) {
                meta = {
                    title: serverData.post.title,
                    imgUrl: serverData.post.thumbnail? serverData.post.thumbnail: serverData.post.source
                }
            }
            return {
              props: {
                serverData: data.data,
                meta
              },
            };
          }
      }
      return {
        props: {
          serverData: {
              
          },
        },
      };
    } catch (err) {
      return {
        props: {
          serverData: {},
        },
      };
    }
  }

export default PostOfferContainer