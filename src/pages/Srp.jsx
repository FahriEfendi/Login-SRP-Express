import { useState, useEffect } from "react";
import axios from "axios";

function SRPForm({ userId }) {
  const [srp, setSrp] = useState([]);
  const [inputWords, setInputWords] = useState({});
  const [missingIndexes, setMissingIndexes] = useState([]);

  useEffect(() => {
    const fetchSRP = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/get-srp/${userId}`
      );
      const words = Object.values(res.data); // Array of 12 words
      setSrp(words);

      // Pilih 3 index secara acak
      const indices = new Set();
      while (indices.size < 3) {
        indices.add(Math.floor(Math.random() * 12));
      }

      const missing = [...indices];
      const inputDefaults = {};
      missing.forEach((i) => (inputDefaults[i] = "")); // Kosongkan untuk user isi

      setMissingIndexes(missing);
      setInputWords(inputDefaults);
    };

    fetchSRP();
  }, [userId]);

  const handleChange = (index, value) => {
    setInputWords((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = async () => {
    // Buat array final userInput
    const userInput = srp.map((word, index) =>
      missingIndexes.includes(index) ? inputWords[index] : word
    );

    try {
      const res = await axios.post("http://localhost:5000/api/verify-srp", {
        userId,
        srpInput: userInput,
      });
      alert(res.data.message);
    } catch (err) {
      alert("SRP verification failed");
    }
  };

  return (
    <div>
      <h2>Confirm Secret Recovery Phrase</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        {srp.map((word, i) => (
          <input
            key={i}
            placeholder={`Word ${i + 1}`}
            value={missingIndexes.includes(i) ? inputWords[i] || "" : word}
            onChange={(e) => handleChange(i, e.target.value)}
            readOnly={!missingIndexes.includes(i)}
            style={{
              backgroundColor: missingIndexes.includes(i) ? "#fff" : "#eee",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        ))}
      </div>
      <button onClick={handleSubmit} style={{ marginTop: 20 }}>
        Verify
      </button>
    </div>
  );
}

export default SRPForm;
