import React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import { Container } from "react-bootstrap";
import { SellPost } from "../components"
import Progress from "../components/Common/Progress";
import Loading from '../components/Common/Loading';
import Helpers from "../utils/helper";

const SellPostContainer = ({
}) => {
  const router = useRouter();

  const postItem = {
    createdAt: "2021-03-24T19:07:35.437Z",
    endTime: "1617476855",
    id: "3fa89522-87cf-40c7-a2f3-edd348940dcb",
    nftId: "9f318ae4-f23f-49c6-8da4-bdda053ab9ea",
    imageUrl: "https://scontent-hel3-1.cdninstagram.com/v/t51.2885-15/e15/11282674_397449130379764_1167662669_n.jpg?tp=1&_nc_ht=scontent-hel3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=sTJHRVVmjqQAX8kdAQp&ccb=7-4&oh=dc99f7a8a06f005659c762b5144403b0&oe=608622E1&_nc_sid=86f79a",
    nftId: "88cf8f58-1803-472e-ae2c-029637ae83e8",
    price: "0.01",
    startTime: "1616612855",
    tokenId: "3",
    transactionHash: "0x94f2969a925c0c2890416be862186d939941da96eb4534c3345f638279a0bb7e",
    updatedAt: "2021-03-24T19:07:35.437Z",
    user: {
      followings: 113,
      follows: 25,
      fullName: "vlad b",
      instagramAvatar: "https://scontent-arn2-1.cdninstagram.com/v/t51.2885-19/11821343_1144975552185877_450810173_a.jpg?_nc_ht=scontent-arn2-1.cdninstagram.com&_nc_ohc=Y46zIkZCIXcAX8Dhrwn&ccb=7-4&oh=0133dad782c49bc8999cb734588295d4&oe=60834E21&_nc_sid=7bff83",
      instagramUsername: "vladb7",
      posts: 11
    },
    nft: {
      comments: "9",
      imageUrl: "https://scontent-arn2-1.cdninstagram.com/v/t51.2885-15/e15/11282674_397449130379764_1167662669_n.jpg?tp=1&_nc_ht=scontent-arn2-1.cdninstagram.com&_nc_cat=104&_nc_ohc=6sZcVQH-IF0AX_jmiaU&ccb=7-4&oh=c58f6cb22999f3d06be569854d24676d&oe=608A1761&_nc_sid=86f79a",
      likes: "19",
      shortCode: "Y8ojVew7OL",
      title: ":) w @angelina_p1",
    },
    followings: 113,
    follows: 25,
    fullName: "vlad b",
    posts: 11,
    userId: "f874d3f1-d473-496d-8c79-fa5afc2c2848"
  };

  React.useEffect(() => {
  }, []);

  return (
    <Layout>
      <div className="sell-post-page">
        <Container>
          <SellPost item={postItem}>
          </SellPost>
        </Container>
      </div> 
    </Layout>
  );
}

function mapStateToProps(state) {
  return {};
}

const dispatchers = {
}

SellPostContainer.propTypes = {};

export { SellPostContainer };
export default connect(mapStateToProps, dispatchers)(SellPostContainer);
