
import React, { useState } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import scenarios from "./data/scenarios.json";
import grammar from "./data/grammar.json";

const firebaseConfig = {
  apiKey: "AIzaSyDskAsF62ss7bTmmZnVrT9r_prAemb5b-o",
  authDomain: "eduspeakai.firebaseapp.com",
  projectId: "eduspeakai",
  storageBucket: "eduspeakai.firebasestorage.app",
  messagingSenderId: "730571450281",
  appId: "1:730571450281:web:1cdabd0c2064228ef146b8",
  measurementId: "G-V2YF5SP0RQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState("home");
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';

  const startListening = () => {
    recognition.start();
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setAnswer(transcript);
    getFeedback(transcript);
  };

  const getFeedback = async (spokenText) => {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "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"
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [
            { role: "system", content: "You are an English teacher. Give grammar correction and improvement suggestion." },
            { role: "user", content: `Correct and suggest for: "${spokenText}"` }
          ]
        })
      });

      const data = await response.json();
      setFeedback(data.choices[0].message.content);
    } catch (error) {
      console.error("AI Feedback Error:", error);
      setFeedback("Could not get feedback. Please try again.");
    }
  };

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => setUser(userCredential.user))
      .catch((error) => alert(error.message));
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => setUser(userCredential.user))
      .catch((error) => alert(error.message));
  };

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setStep("home");
    });
  };

  const handleGrammarAnswer = (q, selected) => {
    if (selected === q.answer) {
      setScore(score + 1);
    }
  };

  const calculateProgress = () => {
    if (score < 2) return "Beginner";
    if (score < 4) return "Intermediate";
    return "Advanced";
  };

  return (
    <div className="App">
      {!user ? (
        <div>
          <h2>Login / Register</h2>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={login}>Login</button>
          <button onClick={register}>Register</button>
        </div>
      ) : (
        <div>
          <h2>Welcome to EduSpeakAI</h2>
          <p>Progress Level: {calculateProgress()}</p>
          <button onClick={() => setStep("scenario")}>🗣 Scenario Speaking</button>
          <button onClick={() => setStep("grammar")}>📚 Grammar Practice</button>
          <button onClick={logout}>Logout</button>

          {step === "scenario" && (
            <div>
              <h3>Select a Scenario:</h3>
              {scenarios.map((s) => (
                <button key={s.id} onClick={() => setSelectedScenario(s)}>
                  {s.title}
                </button>
              ))}

              {selectedScenario && (
                <div>
                  <h4>{selectedScenario.question}</h4>
                  <button onClick={startListening}>🎤 Start Speaking</button>
                  <p><strong>Your Answer:</strong> {answer}</p>
                  <p><strong>AI Feedback:</strong> {feedback}</p>
                </div>
              )}
            </div>
          )}

          {step === "grammar" && (
            <div>
              <h3>Answer the following grammar questions:</h3>
              {grammar.map((q, i) => (
                <div key={i}>
                  <p>{q.question}</p>
                  {q.options.map((option, j) => (
                    <button
                      key={j}
                      onClick={() => handleGrammarAnswer(q, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ))}
              <p>Score: {score}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
