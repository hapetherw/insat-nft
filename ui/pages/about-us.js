import React, { Component } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Layout } from "components";

class AboutUsContainer extends Component {
  componentDidMount() {}

  render() {
    return (
      <Layout>
        <div className="about-us">
          <Container>
            <p className="about-us-title pl-5">
              photography <span>noun</span>
            </p>
            <p className="about-us-sub-title pl-5">
              pho·​tog·​ra·​phy | \ fə-ˈtä-grə-fē
            </p>
            <p className="small-header-sub-title pl-5">
              : the art or process of producing images by the action of radiant
              energy and <br></br>especially light on a sensitive surface (such as film
              or an optical sensor)
            </p>

            <div className="grey-card pt-5 pl-5 pb-5 pr-3">
              <Row>
                <Col xl="7" className="pr-4">
                  <p className="mt-4">
                    A photograph is created through a chemical reaction that is
                    100% unique. The pattern and amount of light that is
                    scattered is frozen in time - never to be repeated in the
                    same combination again.
                  </p>
                  <p>
                    Yet in today’s world, photographs are anything but unique.
                    Copied and shared endlessly across the internet, they have
                    become commoditized and their value is captured by platforms
                    like Instagram and Google - not by the photographers
                    themselves.
                  </p>
                  <p>
                    Pernamint™ was started by a small team of amateur
                    photographers who wanted to bring the power back to the
                    creator. By adding cryptographic assets - unique
                    identification codes and metadata - any photograph can be
                    bought, sold, and traded on the platform efficiently and
                    securely, allowing the photographer to monetize their
                    content.
                  </p>
                  <p>
                    While Pernamint™ is the first NFT-enabled marketplace for
                    photographers, it certainly won’t be the last. We believe
                    that the tools that the blockchain offers signal the
                    beginning of a paradigm shift in content creation. We can’t
                    wait to see what you’ll do with them!
                  </p>
                </Col>
                <Col xl="5" className="pl-4">
                  <img src={"/static/img/about-section.png"}></img>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

AboutUsContainer.propTypes = {};

export { AboutUsContainer };
export default connect(mapStateToProps, {})(AboutUsContainer);
