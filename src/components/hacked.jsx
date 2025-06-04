import React from "react";

const HackedPage = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-mono text-green-400">
      {/* Glitchy background */}
      <div
        className="absolute inset-0 opacity-20 z-0 mix-blend-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')`,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Glitch Text */}
        <h1 className="relative text-5xl md:text-7xl font-extrabold glitch-text mb-4">
          HACKED! by Waifu99
        </h1>

        <p className="text-xl md:text-2xl animate-pulse mb-6">
          System Breach Detected...
        </p>

        <div className="border border-green-400 p-4 bg-black/50 rounded max-w-md w-full mb-6 space-y-2 text-sm md:text-base">
          <p>
            <strong>Target IP:</strong> 192.168.0.101
          </p>
          <p>
            <strong>Status:</strong> Access Granted ✅ Recived Data 25.1%
          </p>
          <p>
            <strong>Logs:</strong> Extracting sensitive data...
          </p>
          <p>
            <strong>Time Left:</strong>{" "}
            <span className="text-red-400">00:29:57</span>
          </p>
        </div>

        <p className="italic text-sm text-gray-300">
          If you're seeing this, it's already too late...
        </p>
      </div>

      {/* Glitch Effect via Tailwind and pseudo-elements */}
      <style>
        {`
        .glitch-text::before,
        .glitch-text::after {
          content: 'HACKED! by Waifu99';
          position: absolute;
          left: 0;
          width: 100%;
        }
        .glitch-text::before {
          color: #ff00c1;
          animation: glitchTop 1s infinite;
          top: -2px;
          z-index: -1;
        }
        .glitch-text::after {
          color: #00fff9;
          animation: glitchBottom 1s infinite;
          top: 2px;
          z-index: -2;
        }

        @keyframes glitchTop {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, -2px); }
          40% { transform: translate(2px, 1px); }
          60% { transform: translate(-1px, 2px); }
          80% { transform: translate(1px, -1px); }
        }

        @keyframes glitchBottom {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, 1px); }
          40% { transform: translate(-2px, -1px); }
          60% { transform: translate(1px, 1px); }
          80% { transform: translate(-1px, -2px); }
        }
        `}
      </style>
    </div>
  );
};

export default HackedPage;
