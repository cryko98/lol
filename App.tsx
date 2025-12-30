
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { PROJECT_NAME, TICKER, CONTRACT_ADDRESS, X_LINK, TELEGRAM_LINK, LOGO_URL, ABOUT_TEXT } from './constants';

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

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 md:py-3' : 'py-4 md:py-6'}`}>
      <div className="w-full px-4 md:px-12">
        <div className={`glass rounded-2xl flex justify-between items-center px-4 md:px-8 py-3 md:py-4 shadow-xl border border-slate-200`}>
          <div className="flex items-center gap-2 md:gap-3">
            <img src={LOGO_URL} className="w-8 h-8 md:w-10 md:h-10 rounded-lg" alt="logo" />
            <span className="font-extrabold text-lg md:text-xl tracking-tight text-slate-900 whitespace-nowrap">{PROJECT_NAME}</span>
          </div>
          <div className="hidden lg:flex items-center gap-8 font-semibold text-sm text-slate-600">
            <a href="#about" className="hover:text-green-600 transition-colors">Origins</a>
            <a href="#gallery" className="hover:text-green-600 transition-colors">Archive</a>
            <a href="#lab" className="hover:text-green-600 transition-colors">AI Studio</a>
            <a href="#chat" className="hover:text-green-600 transition-colors">Nexus Chat</a>
            <a href="#chart" className="hover:text-green-600 transition-colors">Analytics</a>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <a href={X_LINK} target="_blank" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#buy" className="bg-green-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-xs md:text-sm hover:bg-green-700 shadow-lg shadow-green-200 transition-all whitespace-nowrap">
              BUY $LOL
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const MemeTicker = () => {
  return (
    <div id="gallery" className="w-full overflow-hidden bg-white border-y border-slate-100 py-12 md:py-20 scroll-mt-24">
      <div className="w-full px-4 md:px-12 mb-8 md:mb-12">
        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900">Historical Asset Gallery</h2>
        <p className="text-slate-500 font-medium text-sm md:text-base">Archived visual milestones of the LOL Guy ecosystem.</p>
      </div>
      <div className="flex animate-ticker gap-4 md:gap-8 px-4 w-max">
        {[...TICKER_IMAGES, ...TICKER_IMAGES].map((src, i) => (
          <div key={i} className="group relative">
            <img 
              src={src} 
              className="h-48 md:h-80 w-auto rounded-xl md:rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 object-cover" 
              alt="meme asset" 
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl md:rounded-3xl"></div>
          </div>
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
  const [selectedStyle, setSelectedStyle] = useState<'color' | 'bw'>('color');
  const cachedRefImage = useRef<string | null>(null);

  const randomPrompts = [
    "LOL Guy exploring a futuristic Mars colony built by Solana fans",
    "LOL Guy discovering a hidden treasure chest filled with gold tokens",
    "LOL Guy as a CEO giving a speech at a global tech summit",
    "LOL Guy surfing a massive green stock candle wave",
    "LOL Guy drinking coffee in a luxury space station lounge",
  ];

  const getBase64FromUrl = async (url: string): Promise<string | null> => {
    if (cachedRefImage.current) return cachedRefImage.current;
    try {
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      const blob = await response.blob();
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(blob);
      });
      cachedRefImage.current = base64;
      return base64;
    } catch (e) {
      return null;
    }
  };

  const generateMeme = async (style: 'color' | 'bw', overridePrompt?: string) => {
    const finalPrompt = (overridePrompt || prompt).trim();
    if (!finalPrompt || loading) return;
    
    const apiKey = process.env.API_KEY || (window as any).process?.env?.API_KEY;
    if (!apiKey) {
      setErrorStatus("API Configuration Error: VITE_API_KEY missing.");
      return;
    }

    setLoading(true);
    setErrorStatus(null);
    setGeneratedImg(null);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const base64Ref = await getBase64FromUrl(LOGO_URL);
      const parts: any[] = [];
      if (base64Ref) parts.push({ inlineData: { data: base64Ref, mimeType: 'image/jpeg' } });
      
      const styleInstruction = style === 'color' 
        ? "PROFESSIONAL DIGITAL ART, VIBRANT COLORS, MODERN ILLUSTRATION STYLE." 
        : "HIGH-END MINIMALIST SKETCH, BLACK AND WHITE, CONCEPT ART STYLE.";

      const systemPrompt = `Reference the character 'LOL Guy'. SCENE: ${finalPrompt}. ${styleInstruction}. Keep character recognition high but render in a polished professional manner.`;
      parts.push({ text: systemPrompt });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: parts },
        config: { imageConfig: { aspectRatio: "1:1" } }
      });

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setGeneratedImg(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      }
    } catch (err) {
      setErrorStatus("Request failed. Please verify API configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="lab" className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-2xl shadow-slate-200 border border-slate-100 scroll-mt-24">
      <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
        <div className="space-y-6 md:space-y-10">
          <div>
            <span className="text-green-600 font-bold text-xs md:text-sm tracking-widest uppercase mb-2 md:mb-4 block">AI Visual Studio</span>
            <h2 className="text-3xl md:text-6xl font-extrabold text-slate-900 leading-tight">Generate Professional Brand Assets</h2>
            <p className="text-slate-500 text-base md:text-xl font-medium mt-4">Utilize our proprietary LLM integration to create custom LOL Guy iterations for your social channels.</p>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-2 md:space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase">Input Scenario</label>
              <textarea 
                placeholder="Describe the desired scene..." 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-4 md:p-6 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-green-500 focus:outline-none transition-all min-h-[120px] md:min-h-[160px] text-slate-900 font-medium text-sm md:text-lg"
              />
            </div>
            
            <div className="flex gap-2 md:gap-4">
              <button 
                onClick={() => setSelectedStyle('color')}
                className={`flex-1 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base transition-all ${selectedStyle === 'color' ? 'bg-green-600 text-white shadow-lg shadow-green-100' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Digital Color
              </button>
              <button 
                onClick={() => setSelectedStyle('bw')}
                className={`flex-1 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base transition-all ${selectedStyle === 'bw' ? 'bg-green-600 text-white shadow-lg shadow-green-100' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Monochrome
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
              <button 
                onClick={() => generateMeme(selectedStyle)}
                disabled={loading}
                className="flex-[2] bg-slate-900 text-white py-4 md:py-6 rounded-xl md:rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-slate-200 flex justify-center items-center gap-2 text-sm md:text-base"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "GENERATE ASSET"}
              </button>
              <button 
                onClick={() => {
                  const p = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
                  setPrompt(p);
                  generateMeme(selectedStyle, p);
                }}
                disabled={loading}
                className="flex-1 bg-white border border-slate-200 text-slate-900 py-4 md:py-6 rounded-xl md:rounded-2xl font-bold hover:bg-slate-50 transition-all text-sm md:text-base"
              >
                RANDOMIZE
              </button>
            </div>
          </div>
        </div>

        <div className="relative aspect-square w-full max-w-[550px] mx-auto bg-slate-50 rounded-2xl md:rounded-[3rem] overflow-hidden shadow-inner border border-slate-100 flex items-center justify-center group">
          {generatedImg ? (
            <div className="relative w-full h-full p-2 md:p-4">
              <img src={generatedImg} alt="Meme" className="w-full h-full object-cover rounded-xl md:rounded-[2.5rem]" />
              <button 
                onClick={() => {
                   const link = document.createElement('a');
                   link.href = generatedImg!;
                   link.download = `lol-guy-asset.png`;
                   link.click();
                }}
                className="absolute bottom-6 right-6 md:bottom-10 md:right-10 bg-white/90 backdrop-blur text-slate-900 px-4 md:px-8 py-2 md:py-4 rounded-lg md:rounded-2xl font-bold shadow-lg hover:bg-white transition-all text-xs md:text-sm"
              >
                Export PNG
              </button>
            </div>
          ) : (
            <div className="text-center p-6 md:p-12">
              {loading ? (
                <div className="space-y-4">
                  <div className="w-12 h-12 md:w-20 md:h-20 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">Rendering Neural Graphics...</p>
                </div>
              ) : errorStatus ? (
                <p className="text-red-500 font-bold text-sm md:text-base">{errorStatus}</p>
              ) : (
                <div className="space-y-6 opacity-20">
                  <img src={LOGO_URL} className="w-24 h-24 md:w-48 md:h-48 mx-auto grayscale rounded-3xl" alt="placeholder" />
                  <p className="font-bold uppercase tracking-widest text-[10px] md:text-xs">Virtual Studio Offline</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AIAgentSection = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
          systemInstruction: `You are the LOL Guy Executive Assistant. Professional personality: Efficient, knowledgeable, with a subtle dry wit. Respond concisely (1-2 sentences). Maintain a professional brand voice for the LOL ecosystem on Solana.`,
        }
      });
      setMessages(prev => [...prev, { role: "bot", text: response.text || "Connection timeout. Please retry." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "bot", text: "Service temporarily unavailable." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="chat" className="py-16 md:py-32 scroll-mt-24">
      <div className="w-full max-w-5xl mx-auto space-y-8 md:space-y-12">
        <div className="text-center space-y-2 md:space-y-4">
          <h2 className="text-3xl md:text-6xl font-extrabold text-slate-900">Ecosystem Nexus</h2>
          <p className="text-slate-500 font-medium text-sm md:text-xl">Direct real-time communication interface with our protocol intelligence.</p>
        </div>
        <div className="bg-white rounded-2xl md:rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[500px] md:h-[700px]">
          <div className="bg-slate-900 p-4 md:p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-green-600 flex items-center justify-center font-bold text-white text-xs md:text-base">LG</div>
              <span className="text-white font-bold text-sm md:text-lg">LOL Nexus v4.0</span>
            </div>
            <div className="flex gap-1.5 md:gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-slate-700 rounded-full"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 bg-slate-700 rounded-full"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-10 space-y-4 md:space-y-8 bg-slate-50">
            {messages.length === 0 && (
              <div className="text-center py-20 md:py-40">
                <p className="text-slate-300 font-bold uppercase tracking-widest text-[10px] md:text-xs">Uplink Stable - Awaiting Input</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 md:p-6 rounded-xl md:rounded-3xl max-w-[90%] md:max-w-[75%] text-xs md:text-lg font-medium shadow-sm leading-relaxed ${m.role === 'user' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-slate-400 text-[10px] md:text-sm font-bold animate-pulse px-2">Assistant processing request...</div>}
          </div>
          <div className="p-4 md:p-8 bg-white border-t border-slate-100 flex gap-2 md:gap-4">
            <input 
              className="flex-1 bg-slate-50 border border-slate-200 p-3 md:p-5 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium text-slate-700 text-sm md:text-lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Query the nexus protocol..."
            />
            <button onClick={sendMessage} className="bg-slate-900 text-white px-6 md:px-12 rounded-xl md:rounded-2xl font-bold hover:bg-black transition-all text-sm md:text-lg shadow-lg">Send</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Hero = () => {
  return (
    <section className="pt-24 md:pt-48 pb-16 md:pb-40">
      <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
        <div className="space-y-8 md:space-y-12 text-center lg:text-left">
          <div className="space-y-4 md:space-y-8">
            <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-100 text-green-700 font-bold text-[10px] md:text-xs tracking-widest uppercase">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
              Live on Solana Ecosystem
            </div>
            <h1 className="text-5xl md:text-9xl font-black text-slate-900 leading-[1.05] tracking-tight text-balance">
              The Sovereign <br className="hidden md:block"/>
              <span className="text-green-600">Legend Revived.</span>
            </h1>
            <p className="text-base md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed text-balance">
              Institutionalizing internet culture. LOL Guy returns as a sophisticated asset layer for the next generation of decentralized laughter.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 md:gap-6">
            <a href="#buy" className="bg-slate-900 text-white px-8 md:px-14 py-4 md:py-6 rounded-xl md:rounded-3xl font-bold text-base md:text-2xl hover:bg-black transition-all shadow-2xl shadow-slate-200 hover:-translate-y-1 text-center">
              Acquire $LOL
            </a>
            <a href={TELEGRAM_LINK} target="_blank" className="bg-white border border-slate-200 text-slate-900 px-8 md:px-14 py-4 md:py-6 rounded-xl md:rounded-3xl font-bold text-base md:text-2xl hover:bg-slate-50 transition-all shadow-lg hover:-translate-y-1 text-center">
              Community Hub
            </a>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl md:rounded-2xl inline-flex flex-col md:flex-row items-center gap-3 md:gap-4 text-[10px] md:text-xs font-bold text-slate-400 w-full md:w-auto">
            <span className="text-slate-900 whitespace-nowrap uppercase tracking-widest">Protocol Address:</span>
            <code className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-slate-600 select-all font-mono break-all text-center">
              {CONTRACT_ADDRESS}
            </code>
          </div>
        </div>

        <div className="relative flex justify-center order-first lg:order-last mb-12 lg:mb-0">
          <div className="relative w-full max-w-[300px] md:max-w-[650px]">
            <div className="absolute -inset-10 bg-green-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <img 
              src={LOGO_URL} 
              alt="Brand Identity" 
              className="relative w-full aspect-square rounded-[2rem] md:rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border-4 md:border-[16px] border-white object-cover transform rotate-1"
            />
            <div className="absolute -top-4 -right-4 md:top-10 md:-right-16 glass px-4 md:px-10 py-3 md:py-8 rounded-xl md:rounded-[2.5rem] shadow-2xl border border-slate-200 text-slate-900 font-black text-xl md:text-5xl animate-bounce pointer-events-none">
              ROFL
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const App = () => {
  return (
    <div className="min-h-screen selection:bg-green-100 selection:text-green-900">
      <Header />
      
      <main className="w-full px-4 md:px-12 py-6 space-y-20 md:space-y-48 overflow-x-hidden">
        <Hero />

        <section id="about" className="scroll-mt-24">
          <div className="bg-white rounded-[2rem] md:rounded-[5rem] p-8 md:p-24 shadow-2xl border border-slate-50">
            <div className="grid lg:grid-cols-2 gap-12 md:gap-32 items-center">
              <div className="space-y-8 md:space-y-12">
                <div className="space-y-4 md:space-y-6">
                  <span className="text-green-600 font-bold text-xs md:text-sm tracking-widest uppercase">Legacy & Heritage</span>
                  <h2 className="text-4xl md:text-8xl font-extrabold text-slate-900 tracking-tight">Ecosystem Origins</h2>
                </div>
                <div className="space-y-6 md:space-y-10 text-slate-500 text-base md:text-2xl leading-relaxed font-medium">
                  {ABOUT_TEXT.split('\n\n').map((para, i) => (
                    <p key={i} className="text-balance">{para}</p>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img src={ABOUT_GIF} alt="Asset visualization" className="w-full rounded-[2rem] md:rounded-[4rem] shadow-2xl border-4 md:border-8 border-white" />
                <div className="absolute -bottom-6 -left-6 md:-bottom-12 md:-left-12 bg-slate-900 text-white p-6 md:p-14 rounded-2xl md:rounded-[3rem] shadow-2xl font-bold text-base md:text-4xl tracking-tighter">
                  GENESIS: 2010
                </div>
              </div>
            </div>
          </div>
        </section>

        <MemeTicker />

        <div className="w-full">
           <AIMemeGenerator />
        </div>

        <section id="buy" className="py-12 md:py-24">
          <div className="text-center space-y-3 md:space-y-6 mb-12 md:mb-24">
            <h2 className="text-3xl md:text-7xl font-extrabold text-slate-900 tracking-tight">Onboarding Protocol</h2>
            <p className="text-slate-500 font-medium text-sm md:text-2xl">Standard operating procedures for ecosystem participation.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
            {[
              { title: "PHANTOM", desc: "Initialize a high-security Phantom wallet environment on desktop or mobile." },
              { title: "SOLANA", desc: "Procure native SOL tokens from your preferred exchange and transmit to your uplink address." },
              { title: "LIQUIDITY", desc: "Navigate to verified market pairs on Pump.fun or Raydium using the official contract." },
              { title: "EXECUTE", desc: "Confirm the exchange of SOL for $LOL assets. Your position is now secure in the archive." }
            ].map((step, i) => (
              <div key={i} className="bg-white p-8 md:p-14 rounded-2xl md:rounded-[3rem] border border-slate-100 shadow-xl card-hover flex flex-col items-center text-center">
                <div className="w-12 h-12 md:w-20 md:h-20 bg-slate-900 text-white flex items-center justify-center text-xl md:text-4xl font-bold rounded-xl md:rounded-[2rem] mb-6 md:mb-10 shadow-lg shadow-slate-200">
                  {i + 1}
                </div>
                <h3 className="text-xl md:text-3xl font-extrabold mb-4">{step.title}</h3>
                <p className="text-slate-500 text-sm md:text-lg font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <AIAgentSection />

        <section id="chart" className="py-12 md:py-24 scroll-mt-24">
          <div className="text-center space-y-3 md:space-y-6 mb-12 md:mb-24">
            <h2 className="text-3xl md:text-7xl font-extrabold text-slate-900 tracking-tight">Market Intel</h2>
            <p className="text-slate-500 font-medium text-sm md:text-2xl">Real-time performance metrics and deep liquidity analytics.</p>
          </div>
          <div className="bg-white rounded-2xl md:rounded-[5rem] shadow-[0_100px_100px_-50px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 p-2 md:p-6">
            <div id="dexscreener-embed" className="relative w-full pb-[150%] sm:pb-[100%] lg:pb-[56.25%] rounded-xl md:rounded-[4rem] overflow-hidden">
              <iframe 
                src={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartTheme=light&theme=light&chartStyle=0&chartType=usd&interval=15`}
                style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 0 }}
                title="Market Chart"
              />
            </div>
          </div>
        </section>

        <footer className="py-20 md:py-40 border-t border-slate-100 text-center space-y-12 md:space-y-20">
          <div className="flex justify-center flex-wrap gap-8 md:gap-20 text-slate-200 font-black text-3xl md:text-8xl opacity-10 select-none overflow-hidden uppercase tracking-tighter">
            {Array.from({length: 12}).map((_,i) => <span key={i}>LOLGUY</span>)}
          </div>
          <div className="space-y-6 md:space-y-10">
            <div className="flex justify-center gap-6 md:gap-10">
              <a href={X_LINK} target="_blank" className="text-slate-400 hover:text-slate-900 transition-colors">Twitter (X)</a>
              <a href={TELEGRAM_LINK} target="_blank" className="text-slate-400 hover:text-slate-900 transition-colors">Telegram</a>
              <a href="#buy" className="text-slate-400 hover:text-slate-900 transition-colors">Buy $LOL</a>
            </div>
            <div className="space-y-2">
              <p className="text-slate-400 font-bold text-xs md:text-lg uppercase tracking-widest">© 2025 LOL GUY FOUNDATION • GLOBAL HERITAGE PROTOCOL</p>
              <p className="text-slate-300 text-[10px] md:text-sm italic">Institutionalizing Humor Across the Solana Mainnet</p>
            </div>
          </div>
        </footer>
      </main>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 60s linear infinite;
        }
        html {
          scroll-behavior: smooth;
        }
        @media (max-width: 640px) {
          .animate-ticker {
            animation-duration: 30s;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
