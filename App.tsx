import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { PROJECT_NAME, TICKER, CONTRACT_ADDRESS, X_LINK, TELEGRAM_LINK, LOGO_URL, ABOUT_TEXT } from './constants';

const LOL_REF_IMAGE = LOGO_URL;
const CULT_GIF = "https://gifdb.com/images/high/lol-meme-troll-face-fans-concert-jumping-12w0ovt04xph2bph.gif";
const ABOUT_GIF = "https://giffiles.alphacoders.com/105/10501.gif";

const TICKER_IMAGES = [
  "https://pbs.twimg.com/media/G604SzpWYAAnWTL?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G6ceD4pWcAA9ieQ?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G7XOQsfXcAAlv7h?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G53ytJXWMAAvPh_?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G5jmK9YWwAA0jFM?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G5divj8WcAAk0Vt?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G5UF3kAXsAA3JOL?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G45nz0MXMAA1J3k?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G4VX6SxWgAAIq5n?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G2xLBQ-WwAAFSib?format=jpg&name=large",
  "https://pbs.twimg.com/media/G2l3WtkXoAAKRA3?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G2L5mmqXAAAvYon?format=jpg&name=large",
];

const FloatingLOL = () => {
  const [elements, setElements] = useState<{ id: number, x: number, y: number, duration: number, delay: number, size: number, rotate: number }[]>([]);

  useEffect(() => {
    const newElements = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * -20,
      size: 14 + Math.random() * 80,
      rotate: Math.random() * 360
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {elements.map(el => (
        <span
          key={el.id}
          className="floating-lol absolute marker-font select-none opacity-[0.1]"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            fontSize: `${el.size}px`,
            transform: `rotate(${el.rotate}deg)`,
            '--tw-translate-x': `${(Math.random() - 0.5) * 800}px`,
            '--tw-translate-y': `${-1500 - Math.random() * 500}px`,
            '--duration': `${el.duration}s`,
            animationDelay: `${el.delay}s`
          } as any}
        >
          LOL
        </span>
      ))}
      <div className="absolute top-1/4 left-10 opacity-[0.05] marker-font text-9xl transform -rotate-12 select-none">LOL!!</div>
      <div className="absolute bottom-1/4 right-20 opacity-[0.05] marker-font text-[15rem] transform rotate-45 select-none">ROFL</div>
      <div className="absolute top-1/2 left-1/2 opacity-[0.03] marker-font text-[20rem] transform -translate-x-1/2 -translate-y-1/2 select-none">LOLOLOL</div>
    </div>
  );
};

const Header = () => {
  return (
    <nav className="sticky top-4 md:top-6 z-50 mx-auto max-w-[1440px] px-4">
      <div className="sketch-border bg-white flex flex-col md:flex-row justify-between items-center p-3 md:p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 gap-4">
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} className="w-10 h-10 md:w-12 md:h-12" alt="logo" />
          <span className="marker-font text-2xl md:text-3xl uppercase tracking-tighter">{PROJECT_NAME}</span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-6 marker-font text-sm md:text-xl uppercase">
          <a href="#about" className="hover:underline hover:text-green-500 transition-colors">About</a>
          <a href="#gallery" className="hover:underline hover:text-green-500 transition-colors">Gallery</a>
          <a href="#lab" className="hover:underline hover:text-green-500 transition-colors">AI Lab</a>
          <a href="#chat-section" className="hover:underline hover:text-green-500 transition-colors">AI Chat</a>
          <a href="#buy" className="hover:underline hover:text-green-500 transition-colors">Buy</a>
          <a href="#chart" className="hover:underline hover:text-green-500 transition-colors">Chart</a>
        </div>
      </div>
    </nav>
  );
};

const MemeTicker = () => {
  return (
    <div id="gallery" className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] overflow-hidden bg-white border-y-8 border-black py-8 md:py-12 transform -rotate-1 scroll-mt-32">
       <h2 className="text-3xl md:text-4xl marker-font text-center mb-6 md:mb-8 uppercase">Legendary Archive</h2>
      <div className="flex animate-ticker gap-6 md:gap-12 px-6 w-max">
        {[...TICKER_IMAGES, ...TICKER_IMAGES].map((src, i) => (
          <img 
            key={i} 
            src={src} 
            className="h-48 md:h-72 w-auto sketch-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] object-cover flex-shrink-0 hover:scale-105 transition-transform" 
            alt="meme gallery item" 
          />
        ))}
      </div>
    </div>
  );
};

const AIMemeGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const randomPrompts = [
    "Flexing his huge muscular body at the gym with Solana weights",
    "Ripped muscular body lifting a massive green candle above his head",
    "On a surfboard made of $LOL coins showing off his muscular body and 8-pack abs",
    "Running in terror from a giant red candle while having a huge muscular body",
    "Dressed as an astronaut showing off a giant muscular body through the suit",
    "Winning a bodybuilding competition with a massive muscular body against 1000 clones",
    "Sitting on a mountain of cash showing off a giant muscular chest"
  ];

  const getBase64FromUrl = async (url: string): Promise<string | null> => {
    try {
      // Proxy használata a CORS hibák elkerülésére kliens oldalon
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error("Proxy fetch failed");
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      console.warn("CORS fetch error, attempting direct fetch", e);
      try {
        const directResp = await fetch(url);
        const blob = await directResp.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(blob);
        });
      } catch (inner) {
        console.error("All fetch methods failed for reference image", inner);
        return null;
      }
    }
  };

  const generateMeme = async (overridePrompt?: string) => {
    const finalPrompt = (overridePrompt || prompt).trim();
    if (!finalPrompt || loading) return;
    
    // API Kulcs ellenőrzése
    const apiKey = process.env.API_KEY || (window as any).process?.env?.API_KEY;
    if (!apiKey) {
      setErrorStatus("API KEY MISSING! ADD VITE_API_KEY TO VERCEL!");
      return;
    }

    setLoading(true);
    setErrorStatus(null);
    setGeneratedImg(null);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const base64Ref = await getBase64FromUrl(LOL_REF_IMAGE);
      
      const parts: any[] = [];
      
      if (base64Ref) {
        parts.push({
          inlineData: {
            data: base64Ref,
            mimeType: 'image/jpeg'
          }
        });
      }

      const systemPrompt = `ACT AS AN MS PAINT ARTIST FROM 2010. 
      Reference the provided character head of 'LOL Guy'.
      MANDATORY: He has a distinct wide shouting/laughing mouth and oval eyes.
      SCENE: ${finalPrompt}. 
      VISUAL STYLE: CRUDE, SHAKY, MS PAINT DOODLE, BLACK AND WHITE ONLY, PLAIN WHITE BACKGROUND. 
      CHARACTER TRAIT: Give him an ABSURDLY RIPPED MUSCULAR BODY matching the crude sketch style.`;

      parts.push({ text: systemPrompt });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: parts },
        config: { imageConfig: { aspectRatio: "1:1" } }
      });

      let imagePartFound = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setGeneratedImg(`data:image/png;base64,${part.inlineData.data}`);
            imagePartFound = true;
            break;
          }
        }
      }

      if (!imagePartFound) throw new Error("No image in response");

    } catch (err) {
      console.error(err);
      setErrorStatus("ROFL! GENERATION FAILED! CHECK YOUR VITE_API_KEY!");
    } finally {
      setLoading(false);
    }
  };

  const downloadMeme = () => {
    if (!generatedImg) return;
    const link = document.createElement('a');
    link.href = generatedImg;
    link.download = `muscular-lol-guy-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="lab" className="sketch-border p-6 md:p-10 bg-white space-y-6 md:space-y-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all scroll-mt-32">
      <h2 className="text-4xl md:text-6xl marker-font text-center transform -rotate-1 border-b-4 border-black pb-4 uppercase">LOL MEME LAB</h2>
      <p className="text-center italic opacity-70 text-lg md:text-2xl px-4">The OG head. A muscular body. MS Paint style.</p>
      
      <div className="relative aspect-square w-full max-w-[500px] mx-auto bg-gray-50 sketch-border overflow-hidden flex flex-col items-center justify-center group">
        {generatedImg ? (
          <>
            <img src={generatedImg} alt="Meme" className="w-full h-full object-contain" />
            <button 
              onClick={downloadMeme}
              className="absolute bottom-4 right-4 bg-green-500 text-black p-3 marker-font text-xl sketch-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all active:scale-95"
            >
              DOWNLOAD PNG
            </button>
          </>
        ) : (
          <div className="text-center p-6 md:p-10">
            {loading ? (
              <div className="animate-spin text-7xl md:text-9xl">😂</div>
            ) : errorStatus ? (
               <div className="text-red-500 marker-font text-2xl md:text-3xl uppercase">{errorStatus}</div>
            ) : (
              <div className="space-y-4 md:space-y-6 opacity-40 group-hover:opacity-100 transition-opacity">
                <img src={LOGO_URL} className="w-24 h-24 md:w-40 md:h-40 mx-auto" alt="ref" />
                <p className="marker-font text-2xl md:text-3xl px-2 uppercase">Ready to Flex?</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4 md:space-y-6">
        <textarea 
          placeholder="Where should MUSCULAR LOL Guy go next?" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-4 md:p-8 border-4 border-black rounded-none text-xl md:text-3xl focus:outline-none focus:ring-8 md:focus:ring-12 focus:ring-green-400 transition-all min-h-[120px] md:min-h-[150px] marker-font"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <button 
            onClick={() => generateMeme()}
            disabled={loading}
            className="bg-black text-white p-4 md:p-6 marker-font text-2xl md:text-3xl sketch-border shadow-[8px_8px_0px_0px_rgba(34,197,94,1)] hover:bg-white hover:text-black transition-all active:translate-y-2"
          >
            {loading ? "PAINTING..." : "GENERATE MEME"}
          </button>
          <button 
            onClick={() => {
              const p = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
              setPrompt(p);
              generateMeme(p);
            }}
            disabled={loading}
            className="bg-green-500 text-black p-4 md:p-6 marker-font text-2xl md:text-3xl sketch-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all active:translate-y-2"
          >
            RANDOM MEME
          </button>
        </div>
      </div>
    </div>
  );
};

const HowToBuy = () => {
  const steps = [
    { title: "PHANTOM", desc: "Get the Phantom wallet. It's the ghost with the most. Don't forget your seed phrase, ROFL." },
    { title: "SOLANA", desc: "Buy SOL on an exchange and send it to your wallet address. Gas fees are basically free, LOL." },
    { title: "PUMP.FUN", desc: "Head to pump.fun, paste our CA, and get ready for the laugh of your life." },
    { title: "APE IN", desc: "Swap that SOL for $LOL. Welcome to the legend. U MAD BRO? NO, U RICH BRO." }
  ];

  return (
    <section id="buy" className="py-12 md:py-24 scroll-mt-32 px-4">
      <h2 className="text-5xl md:text-8xl marker-font text-center mb-12 md:mb-20 transform -rotate-1 underline decoration-double decoration-green-500 px-4 uppercase">HOW TO JOIN THE CULT</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
        {steps.map((step, i) => (
          <div key={i} className="sketch-border p-6 md:p-10 bg-white transform transition-all hover:scale-105 hover:rotate-1 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]" style={{ rotate: `${(Math.random() - 0.5) * 4}deg` }}>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-black text-white flex items-center justify-center text-4xl md:text-5xl marker-font mb-6 md:mb-8 sketch-border shadow-[4px_4px_0px_0px_rgba(34,197,94,1)]">
              {i + 1}
            </div>
            <h3 className="text-3xl md:text-4xl marker-font mb-4 md:mb-6 border-b-6 border-black inline-block">{step.title}</h3>
            <p className="text-2xl md:text-3xl leading-snug">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const AIAgentSection = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const apiKey = process.env.API_KEY || (window as any).process?.env?.API_KEY;
    if (!apiKey) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => m.text), userMsg].join("\n"),
        config: {
          systemInstruction: `You are LOLGuy, the legendary 2010 internet meme. 
          Personality: Pure chaos, funny, witty, and chaotic. You are the embodiment of "ROFL". 
          Style: Punchy, short, conversational, and energetic. Avoid long corporate explanations. Use 2010 internet slang (ROFL, LMAO, U MAD BRO?, EPIC WIN) naturally but keep it fresh.
          Interactivity: Don't act like an assistant. Be a funny troll who laughs at everything. If a user asks something stupid, laugh at them. If they ask something smart, laugh anyway.
          Mention $LOL on Solana only when it's funny. Never say "trolling" - you ARE the joke.
          Keep your responses to 1-3 sentences max. Be punchy!`,
        }
      });
      
      setMessages(prev => [...prev, { role: "bot", text: response.text || "LOL CANT TALK RIGHT NOW, BUSY LAUGHING!" }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: "bot", text: "ERROR! ROFL! TRY AGAIN!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="chat-section" className="py-12 md:py-24 scroll-mt-32 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl md:text-6xl marker-font text-center transform -rotate-1 uppercase">TALK TO THE LEGEND</h2>
        <div className="sketch-border bg-white w-full h-[500px] md:h-[600px] flex flex-col shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <div className="bg-black text-white p-4 md:p-5 marker-font text-xl md:text-2xl flex justify-between items-center">
            <div className="flex items-center gap-3">
               <img src={LOGO_URL} className="w-8 h-8 rounded-full border-2 border-white" alt="avatar" />
               <span>LOL CHAT v3.0 (MS PAINT EDITION)</span>
            </div>
            <div className="flex gap-2">
               <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
               <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
               <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
            </div>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 marker-font bg-[#fafafa]">
            {messages.length === 0 && (
              <div className="text-center italic opacity-30 py-20 text-2xl px-6">The legendary LOL Guy is listening. Say something ROFL...</div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 max-w-[85%] sketch-border ${m.role === 'user' ? 'bg-green-500 text-black' : 'bg-white text-black font-bold'} text-xl md:text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`} 
                     style={{ transform: `rotate(${(Math.random() - 0.5) * 3}deg)` }}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-3xl md:text-4xl animate-bounce text-center">🤣 ROFLING...</div>}
          </div>
          <div className="p-4 md:p-6 border-t-4 border-black bg-white flex gap-4">
            <input 
              className="flex-1 border-4 border-black p-4 marker-font focus:outline-none text-xl md:text-2xl bg-[#eee]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="ROFL ME..."
            />
            <button onClick={sendMessage} className="bg-black text-white p-4 marker-font px-8 text-xl md:text-2xl sketch-border shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] hover:bg-green-500 hover:text-black transition-all">ROFL</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const DexScreenerChart = () => {
  return (
    <section id="chart" className="py-12 md:py-24 scroll-mt-32 px-4">
      <h2 className="text-4xl md:text-6xl marker-font text-center mb-8 md:mb-12 transform -rotate-1 uppercase">LIVE CANDLE CHART</h2>
      <div className="sketch-border bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] max-w-[1440px] mx-auto overflow-hidden">
        <div id="dexscreener-embed" style={{ position: 'relative', width: '100%', paddingBottom: '125%' }}>
          <iframe 
            src={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartTheme=dark&theme=light&chartStyle=0&chartType=usd&interval=15`}
            style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 0 }}
          />
        </div>
      </div>
      <style>{`
        @media(min-width: 1400px) {
          #dexscreener-embed { padding-bottom: 65% !important; }
        }
      `}</style>
    </section>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-12 md:pt-20 pb-24 md:pb-40 px-4 md:px-6">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8 md:space-y-10 order-2 lg:order-1 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] marker-font uppercase tracking-tighter leading-[0.85] lg:leading-[0.8] transform -rotate-1 lg:-rotate-2">
              <span className="text-black block">THE REAL</span>
              <span className="text-green-500 block animate-pulse">LOL GUY</span>
            </h1>
            <p className="text-2xl md:text-4xl lg:text-5xl marker-font italic opacity-90 leading-tight px-2 lg:px-0">
              Trolling the blockchain since 2010. <br className="hidden md:block"/>
              <span className="underline decoration-wavy decoration-green-500">The OG has returned.</span>
            </p>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6">
            <a 
              href={X_LINK} 
              target="_blank" 
              rel="noreferrer" 
              className="bg-black text-white px-6 md:px-8 py-4 md:py-6 marker-font text-xl md:text-3xl sketch-border shadow-[8px_8px_0px_0px_rgba(34,197,94,1)] hover:bg-green-500 hover:text-black transition-all transform hover:-translate-y-2 active:translate-y-1"
            >
              FOLLOW THE TROLL (X)
            </a>
            <a 
              href={TELEGRAM_LINK} 
              target="_blank" 
              rel="noreferrer" 
              className="bg-white text-black px-6 md:px-8 py-4 md:py-6 marker-font text-xl md:text-3xl sketch-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all transform hover:-translate-y-2 active:translate-y-1"
            >
              JOIN THE CULT (TG)
            </a>
          </div>

          <div className="sketch-border p-3 md:p-4 bg-green-500 text-black marker-font text-base md:text-2xl transform rotate-1 inline-block shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] break-all max-w-full uppercase">
            CA: {CONTRACT_ADDRESS.slice(0, 8)}...{CONTRACT_ADDRESS.slice(-8)}
          </div>
        </div>

        <div className="lg:col-span-5 relative order-1 lg:order-2 flex justify-center">
          <div className="relative max-w-[300px] sm:max-w-[400px] lg:max-w-full">
            <img 
              src={LOGO_URL} 
              alt="LOL Guy Hero" 
              className="w-full aspect-square sketch-border shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transform rotate-2 lg:rotate-3"
            />
            <div className="absolute -top-6 -left-6 md:-top-10 md:-left-16 bg-white border-2 md:border-4 border-black p-3 md:p-6 rounded-[30px] md:rounded-[50px] marker-font text-2xl md:text-4xl shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] transform -rotate-12 animate-bounce uppercase">
              ROFL!!!
              <div className="absolute bottom-[-10px] md:bottom-[-15px] right-[15px] md:right-[20px] w-0 h-0 border-l-[10px] md:border-l-[15px] border-l-transparent border-t-[10px] md:border-t-[15px] border-t-black border-r-[10px] md:border-r-[15px] border-r-transparent"></div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-black text-white p-3 md:p-4 marker-font text-xl md:text-3xl transform rotate-6 md:rotate-12 sketch-border shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] md:shadow-[6px_6px_0px_0px_rgba(34,197,94,1)]">
              {TICKER}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const App = () => {
  return (
    <div className="min-h-screen bg-[#f0f0f0] text-black selection:bg-green-400 overflow-x-hidden relative">
      <FloatingLOL />
      <Header />
      
      <main className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12 space-y-24 md:space-y-32 relative z-10">
        <Hero />

        <section className="text-center space-y-6 md:space-y-8 px-4">
          <h2 className="text-4xl md:text-6xl marker-font transform rotate-1 uppercase">CURRENT MOOD: CULT STATUS</h2>
          <div className="sketch-border overflow-hidden bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] max-w-5xl mx-auto transform -rotate-1">
            <img src={CULT_GIF} alt="LOL CULT" className="w-full object-cover aspect-video" />
          </div>
        </section>

        <section id="about" className="scroll-mt-48 px-4">
          <div className="sketch-border bg-white p-6 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
            <h2 className="text-5xl md:text-7xl marker-font border-b-6 md:border-b-8 border-black pb-4 mb-8 uppercase">THE LEGENDARY ORIGIN</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
              <div className="space-y-6 text-2xl md:text-3xl leading-relaxed">
                {ABOUT_TEXT.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="space-y-8 lg:space-y-6">
                <div className="sketch-border p-4 md:p-6 bg-gray-100 mb-8">
                  <p className="marker-font text-xl md:text-2xl uppercase opacity-60 mb-2">Contract Address:</p>
                  <code className="text-lg md:text-xl break-all font-mono font-bold bg-white p-3 md:p-4 block border-2 border-black select-all">
                    {CONTRACT_ADDRESS}
                  </code>
                </div>
                <div className="relative">
                  <img src={ABOUT_GIF} alt="About GIF" className="w-full sketch-border shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform -rotate-2" />
                  <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-black text-white p-2 marker-font text-lg md:text-xl transform rotate-12 uppercase">EST. 2010</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MemeTicker />

        <div className="px-4">
          <AIMemeGenerator />
        </div>
        
        <div className="px-4">
          <HowToBuy />
        </div>

        <AIAgentSection />

        <DexScreenerChart />

        <footer className="text-center py-16 md:py-24 border-t-8 border-black border-dashed opacity-80 marker-font text-2xl md:text-4xl space-y-4 px-4 uppercase">
          <div className="flex justify-center gap-6 md:gap-10 overflow-hidden whitespace-nowrap opacity-10 select-none">
            {Array.from({length: 10}).map((_,i) => <span key={i}>LOL</span>)}
          </div>
          <p>© 2025 {PROJECT_NAME} - NO COPYRIGHTS, JUST PURE ROFL.</p>
          <p className="text-lg md:text-xl italic opacity-50 capitalize">History is written by the one who laughs last.</p>
        </footer>
      </main>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 35s linear infinite;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default App;