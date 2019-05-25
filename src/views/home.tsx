import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';

import Header from '../components/Header';
import generateAlphaNum from '../utils/generateAlphaNum';

const Home = () => {
  const [generated, setGenerated] = useState(generateAlphaNum());

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
                  onClick={() => navigator.clipboard.writeText(generated)}
                >
                  Clipboard
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Home;
