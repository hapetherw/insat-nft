import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import UserMark from "./Common/UserMark";
import Link from "next/link";

const AuctionDetail = ({ auction, dollarPrice }) => {
  const [diff, setDiff] = React.useState(0);

  React.useEffect(() => {
    let interval = setInterval(() => {
      setDiff(diff - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  React.useEffect(() => {
    if (auction.endTime) {
      setDiff(parseInt((1000 * auction.endTime - (new Date().getTime())) / 1000));
    }
  }, [auction.endTime]);

  const getEndInTime = function () {
    const hr = parseInt(diff / 3600);
    const remainSecs = diff % 3600;
    const min = parseInt(remainSecs / 60);
    const sec = remainSecs % 60;

    return (
      <>
        <div className="inline mr-4">
          <p className="normal-header-title mb-1">{hr}</p>
          <span className="grey-transparent-text">hr</span>
        </div>
        <div className="inline mr-4">
          <p className="normal-header-title mb-1">{min}</p>
          <span className="grey-transparent-text">min</span>
        </div>
        <div className="inline">
          <p className="normal-header-title mb-1">{sec}</p>
          <span className="grey-transparent-text">sec</span>
        </div>
      </>
    );
  };

  const gotoOriginalPost = () => {
    window.open(`https://instagram.com/p/${auction.nft.shortCode}`, '_blank');
  }

  return (
    <div className="auction-detail">
      <Link href={"/offer/[id]"} as={"/offer/" + auction.id}>
        <img className="auction-bg pointer-cursor" src={auction.nft.imageUrl} />
      </Link>
    <Row>
        <Col md={{ span: 5, offset: 7 }}>
          <p className="small-header-text bold mb-2">Owner</p>
          <UserMark
            avatar={auction.user.instagramAvatar}
            username={auction.user.instagramUsername}
          ></UserMark>
          <div className="mt-4">
            <div className="inline mr-5">
              <p className="small-header-text bold mb-1">Current Bid</p>
              <div className="flex align-items-center">
                <img
                  src={"/static/img/ethereum.png"}
                  className="ethereum mr-2"
                />
                <p className="normal-header-title mb-1">{auction.price} ETH</p>
              </div>
              <span className="grey-transparent-text">${(auction.price * dollarPrice).toFixed(2)}</span>
            </div>
            <div className="inline">
              <p className="small-header-text bold mb-1">Ending in</p>
              <div>{getEndInTime()}</div>
            </div>
          </div>
          <Link href="/offer/[id]" as={`/offer/${auction.id}`}>
            <Button className="place-bid pink-button mt-4 mb-3">
              Place a bid
            </Button>
          </Link>
          <div className="grey-transparent-text bold pointer-cursor ml-5" onClick={gotoOriginalPost}>
            View original post
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AuctionDetail;
