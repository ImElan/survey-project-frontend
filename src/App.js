import React, { useState } from 'react';
import CheckSendCopy from './components/TakeSurveyComponents/CheckSendCopy';

function App() {

  const [sendCopy,setSendCopy] = useState(0);

  return (
    <div className="App">
      <CheckSendCopy sendCopy={sendCopy}/>
    </div>
  );
}

export default App;
