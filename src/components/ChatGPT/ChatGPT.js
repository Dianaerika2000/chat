import { useState, useEffect } from 'react';

const OPENAI_API_KEY = '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';

export default function ChatGPT() {
  const [userInput, setUserInput] = useState('');
  const [botOutput, setBotOutput] = useState([]);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    if (botOutput.length > 0) {
      const lastBotMessage = botOutput[botOutput.length - 1];
      if (lastBotMessage.isBot) {
        setConversation([...conversation, lastBotMessage]);
      }
    }
  }, [botOutput]);

  const handleUserInput = (question) => {
    if (userInput === '') {
      alert('Por favor, escribe algo antes de enviar');
      return;
    }

    // Agrega la pregunta al estado de la conversación
    setConversation([...conversation, { isBot: false, message: question }]);

    const oHttp = new XMLHttpRequest();
    oHttp.open('POST', 'https://api.openai.com/v1/completions');
    oHttp.setRequestHeader('Accept', 'application/json');
    oHttp.setRequestHeader('Content-Type', 'application/json');
    oHttp.setRequestHeader('Authorization', 'Bearer ' + OPENAI_API_KEY);

    oHttp.onreadystatechange = function () {
      if (oHttp.readyState === 4) {
        let oJson = {};
        try {
          oJson = JSON.parse(oHttp.responseText);
        } catch (ex) {
          setBotOutput([...botOutput, { isBot: true, message: 'Error: ' + ex.message }]);
        }

        if (oJson.error && oJson.error.message) {
          setBotOutput([...botOutput, { isBot: true, message: 'Error: ' + oJson.error.message }]);
        } else if (oJson.choices && oJson.choices[0].text) {
          let s = oJson.choices[0].text;
          if (s === '') s = 'No hay respuesta';
          // Agrega la respuesta al estado de la conversación
          setBotOutput([...botOutput, { isBot: true, message: s }]);
        }
      }
    };

    const sModel = 'text-davinci-003';
    const iMaxTokens = 2048;
    const sUserId = '1';
    const dTemperature = 0.5;
    const data = {
      model: sModel,
      // prompt: question + ' ' + userInput,
      prompt: question,
      max_tokens: iMaxTokens,
      user: sUserId,
      temperature: dTemperature,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ['#', ';'],
    };

    oHttp.send(JSON.stringify(data));
    setUserInput('');
  };
  return (
    <div className="container my-3">
      <div className="row">
        {conversation.map((message, index) => {
          if (message.isBot) {
            return (
              <div className="" key={index}>
                <p className="p-3 bg-light text-dark rounded">GPT: {message.message}</p>
              </div>
            );
          } else {
            return (
              <div className="" key={index}>
                <p className="p-3 bg-warning text-white rounded">
                  Yo: {message.message}
                </p>
              </div>
            );
          }
        })}
      </div>
      <div className="row my-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="Escribe algo..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            //   onChange={handleMessage}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              handleUserInput(userInput);
            }}
          >
            <i className="bi bi-send"></i>&nbsp;
          </button>
        </div>
      </div>
    </div>
  );
}
