import { h } from 'preact';
import { useState } from 'preact/hooks';
import Button from 'react-bootstrap/Button';

import generateAlphaNum from '../utils/generateAlphaNum';

const Home = () => {
  const [generated, setGenerated] = useState(generateAlphaNum());

  return (
    <div>
      <p>{generated}</p>
      <Button
        variant="success"
        onClick={() => setGenerated(generateAlphaNum())}
      >
        Generate
      </Button>
    </div>
  );
};

export default Home;
