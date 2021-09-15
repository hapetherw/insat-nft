import React from "react";
import Link from "next/link";

const UserMark = ({ avatar, username }) => {
  return (
    <div className="user-mark">
      <Link href="/user/[id]" as={`/user/${encodeURIComponent(id)}`}>
        <div className="inline">
          <div className="avatar">
            <img src={avatar} />
          </div>
          <span>@{username}</span>
        </div>
        
      </Link>

      <img className="user-instaram ml-3" src={"/static/img/instagram.png"} />
    </div>
  );
};

export default UserMark;
