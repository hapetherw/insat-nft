import axios from "axios";
import PostOfferContainer from "containers/PostOfferContainer";
const BASE_URL = process.env.API_ENDPOINT;

export async function getServerSideProps(context) {
  try {
    const { params } = context;
    if(params.id) {
        const { data } = await axios.get(`${BASE_URL}/offer/${params.id}`);
        if (data.success && data.data) {
          const serverData = data.data;
          let meta = {}
          if(serverData && serverData.auction) {
              meta = {
                  title: serverData.auction.post.title,
                  imgUrl: serverData.auction.post.thumbnail? serverData.auction.post.thumbnail: serverData.auction.post.source
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

export default PostOfferContainer;
