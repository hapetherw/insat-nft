import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import { NotificationManager } from "react-notifications";

import Helpers from "../utils/helper";

const PostOnlyItem = ({ item }) => {
  const router = useRouter();

  const [isPostVideo, setIsPostVideo] = React.useState(false);

  useEffect(() => {
    if (item && item.thumbnail) {
      setIsPostVideo(true);
    } else {
      setIsPostVideo(false);
    }
  }, [item]);

  const openPostUserOnInstagram = (evt) => {
    evt.stopPropagation();
    window.open(
      "https://www.instagram.com/" + item.instagramUser.username,
      "_blank"
    );
  };

  const openOtherPost = (evt) => {
    evt.preventDefault();
    setTimeout(function () {
      let instaUrl = item.url;
      let urlArr = instaUrl.split("/p/");
      if (urlArr[1]) {
        let slug = urlArr[1].replace("/", "");
        router.push("/post/" + slug);
      } else {
        NotificationManager.warning(
          "Please input correct Instagram Url",
          "Warning"
        );
      }
    }, 100);
  };

  return (
    <div
      className="post-extra-item pointer-cursor"
      onClick={(e) => openOtherPost(e)}
    >
      <div className="content p-1">
        <div className="auction-img-content">
          <div className="p-relative">
            <img
              className="auction-img"
              src={isPostVideo ? item.thumbnail : item.source}
            ></img>
            {isPostVideo && (
              <img className="camera-btn" src={"/static/img/camera.png"} />
            )}
          </div>
          <div className="post-name pt-2 pb-2 pl-3 pr-3">{item.title}</div>
        </div>

        <div className="auction-detail-card mt-3 pt-2 pb-2 pl-3 pr-3">
          <div className="flex justify-content-between align-items-center mb-2">
            <div className="post-item-user-mark">
              <div className="avatar">
                <div>
                  <img src={item.instagramUser.avatar || ""} />
                </div>
              </div>
              <span>@{item.instagramUser.username}</span>
            </div>
            <img
              className="user-instaram"
              src={"/static/img/instagram.png"}
              onClick={(evt) => openPostUserOnInstagram(evt)}
            />
          </div>
          <p className="small-header-text mt-1 post-item-title">{item.title}</p>
          <div className="small-header-text mt-1">
            <FontAwesomeIcon icon={faHeart} />
            <span className="ml-2 mr-3">{item.likes}</span>
            <FontAwesomeIcon icon={faComment} flip="horizontal" />
            <span className="ml-2">{item.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostOnlyItem;
