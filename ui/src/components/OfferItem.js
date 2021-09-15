import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import Helpers from "../utils/helper";

const OfferItem = ({ offer, dollarPrice }) => {
  const router = useRouter();
  
  const [passedTime, setPassedTime] = useState("");
  const [offerDollarPrice, setOfferDollarPrice] = useState(0);
  const [isPostVideo, setIsPostVideo] = React.useState(false);

  useEffect(() => {
    setOfferDollarPrice((offer.price * dollarPrice).toFixed(2));
    setPassedTime(Helpers.getPassedTime(offer.createdAt));
    if (offer.post && offer.post.thumbnail) {
      setIsPostVideo(true);
    } else {
      setIsPostVideo(false);
    }
  },[]);
  


  return (
    <Link href="/offer/[id]" as={"/offer/" + offer.id}>
      <div className="post-item pointer-cursor">
        <div className="content p-1">
          <div className="auction-img-content">
            <div className="p-relative">
              <img className="auction-img" src={isPostVideo?offer.post.thumbnail:offer.post.source}></img>
              {isPostVideo && <img className="camera-btn" src={"/static/img/camera.png"} />}
            </div>
        
            <div className="post-name pt-2 pb-2 pl-3 pr-3">
              {offer.post.title}
            </div>
          </div>

          <div className="below-area">
            <div className="mt-3">
              <p className="mb-0">Offered (${offerDollarPrice}) {offer.price} Eth</p>
              <p className="grey-transparent-text mb-0">{passedTime}</p>
              <Link href={"/user/" + offer.buyer.username}>
              <div className="mb-0">by @{offer.buyer.fullName}</div>
              </Link>
            </div>
            <div className="auction-detail-card mt-3 pt-2 pb-2 pl-3 pr-3">
              <div className="flex justify-content-between align-items-center mb-2">
                  <div className="post-item-user-mark">
                    <div className="avatar">
                      <div>
                        <img src={offer.post.instagramUser.avatar || ''} />
                      </div>
                    </div>
                    <span>@{offer.post.instagramUser.username}</span>
                  </div>
                <img
                  className="user-instaram"
                  src={"/static/img/instagram.png"}
                />
              </div>
              <p className="small-header-text mt-1 post-item-title">
                {offer.post.title}
              </p>
              <div className="small-header-text mt-1">
                <FontAwesomeIcon icon={faHeart} />
                <span className="ml-2 mr-3">{offer.post.likes}</span>
                <FontAwesomeIcon icon={faComment} flip="horizontal" />
                <span className="ml-2">{offer.post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default OfferItem;
