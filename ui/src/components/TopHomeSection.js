import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { useRouter } from "next/router";

const TopHomeSection = ({}) => {
  const router = useRouter();
  const [instaUrl, setInstaUrl] = useState("");
  const instagramExp = new RegExp("(https?:\/\/(?:www\.)?instagram\.com\/p\/([^/?#&]+)).*");

  const onPasted = (e) => {
    let pasteText = (e.clipboardData || window.clipboardData).getData('text');
    goToOfferPage(pasteText);
  };

  const onKeyPressed = (e) => {
    if (e.which == 13) {
      goToOfferPage();
    }
  }

  const goToOfferPage = (url) => {
    setTimeout(function(){ 
      let offerInstalUrl = url? url: instaUrl;
      if(instagramExp.test(offerInstalUrl)) {
        let offerArr = offerInstalUrl.split("/p/");
        if(offerArr[1]) {
          let slug = offerArr[1].replace("/","");
          router.push('/post/' + slug); 
        } else {
          NotificationManager.warning(
            "Please input correct Instagram Url",
            "Warning"
          );
        }
      
      }else {
        NotificationManager.warning(
          "Please input correct Instagram Url",
          "Warning"
        );
      }
      
    }, 100);

  }

  return (
    <div className="top-auction">
      <Container>
        <div className="homepage-section-title text-center">
          <img src={'/static/img/section-title-text.png'} className="d-none d-sm-inline-block"/>
          <img src={'/static/img/section-title-text-sm.png'} className="d-inline-block d-sm-none"/>
        </div>
        <div className="text-center section-title mt-4">from instagram into blockchain art</div>
        <Form.Group className="homepage-search-input mt-5">
          <Form.Control type="text" className="pl-4" placeholder="Paste Instagram URL" value={instaUrl} onKeyPress={(e)=>onKeyPressed(e)} onPaste={(e)=>onPasted(e)} onChange={(e)=>setInstaUrl(e.target.value)}/>
        </Form.Group>
      </Container>
    </div>
  );
};

export default TopHomeSection;
