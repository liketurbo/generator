import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Zoom from 'react-reveal/Zoom';

import Header from '../components/Header';
import generateAlphaNum from '../utils/generateAlphaNum';

const Home = () => {
  const [generated, setGenerated] = useState(generateAlphaNum());
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <Header />
      <Container>
        <Row>
          <Col sm={{ span: 6, offset: 3 }}>
            <FormControl type="text" readOnly={true} value={generated} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={{ span: 6, offset: 3 }}>
            <ButtonToolbar className="justify-content-center">
              <ButtonGroup size="sm">
                <Button
                  variant="primary"
                  onClick={() => setGenerated(generateAlphaNum())}
                >
                  Generate
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigator.clipboard.writeText(generated);
                    setShow(true);
                    setTimeout(() => {
                      setShow(false);
                    }, 1000);
                  }}
                >
                  Clipboard
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
        </Row>
        <Zoom when={show} duration={250}>
          <br />
          <Row>
            <Col sm={{ span: 6, offset: 3 }}>
              <Alert variant="success">Copied!</Alert>
            </Col>
          </Row>
        </Zoom>
      </Container>
    </Fragment>
  );
};

export default Home;
