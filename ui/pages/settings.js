import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Layout, ChangePasswordForm, UpdateSettingForm } from "components";

class SettingsContainer extends Component {
  render() {
    return (
      <Layout>
        <div className="settings-container">
          <Container>
            <Row>
              <Col lg={{ span: 8, offset: 2 }} xl={{ span: 6, offset: 3 }}>
                <ChangePasswordForm></ChangePasswordForm>
                <UpdateSettingForm></UpdateSettingForm>
              </Col>
            </Row>
          </Container>
        </div>
      </Layout>
    );
  }
}

export default SettingsContainer;
