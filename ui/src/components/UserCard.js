import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";

const UserCard = ({ item }) => {
  
  const openInstagramPost = () => {
    window.open(item.url, '_blank');
  }

  return (
    <div className="mb-4 p-2 user-card-detail">
      <div className="user-mark">
        <Link
          href="/user/[id]"
          as={`/user/${item.instagramUser.username}`}
        >
          <div className="inline">
            <div className="avatar">
              <img src={item.instagramUser.avatar} />
            </div>
            <span>@{item.instagramUser.username}</span>
          </div>
        </Link>
      </div>
      <p className="mt-2 ml-1">{item.title}</p>
      <hr></hr>
      <div className="flex justify-content-between align-items-center">
        <div className="small-header-text">
          <FontAwesomeIcon icon={faHeart} />
          <span className="ml-2 mr-3">{item.likes}</span>
          <FontAwesomeIcon icon={faComment} flip="horizontal" />
          <span className="ml-2">{item.comments}</span>
        </div>
        <div className="pointer-cursor" onClick={()=> openInstagramPost()}>
          <span className="grey-transparent-text bold mr-2">
            View post on Instagram
          </span>
          <img className="user-instaram" src={"/static/img/instagram.png"} />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
