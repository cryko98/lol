
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { PROJECT_NAME, TICKER, CONTRACT_ADDRESS, LOGO_URL, ABOUT_TEXT } from './constants';

const TICKER_IMAGES = [
  "https://pbs.twimg.com/media/Gy3hHHfWsAAsVBo?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GyyHdItakAAz-JD?format=jpg&name=900x900",
  "https://pbs.twimg.com/media/Gyribs6XMAAq-z5?format=jpg&name=large",
  "https://pbs.twimg.com/media/GyqaL9wWQAI-Gpk?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GyqEVC3WEAULMaF?format=jpg&name=large",
  "https://pbs.twimg.com/media/Gyo_mlsXUAAtusY?format=jpg&name=large",
  "https://pbs.twimg.com/media/Gypdo7iX0AIFtB4?format=jpg&name=large",
  "https://pbs.twimg.com/media/Gyk6WxXXwAAVR_4?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GyhY_gnXwAASuWh?format=jpg&name=large",
  "https://pbs.twimg.com/media/GyXpwE7a4AYj3Ga?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GyUbPs_XsAUpn0w?format=jpg&name=large",
  "https://pbs.twimg.com/media/GyR05zQa4AIJjjM?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GyQRJMRbQAA1cFQ?format=jpg&name=small",
  "https://pbs.twimg.com/media/GyPLTVYbkAAd3qS?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GyOcYB3a0AAx-3_?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GyNBU52XsAAiJ6c?format=jpg&name=medium"
];

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto sketch-border bg-[#FACC15] px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} className="w-12 h-12 border-2 border-black sketch-button" alt="logo" />
          <span className="text-3xl font-black text-outline tracking-widest">{PROJECT_NAME}</span>
        </div>
        <div className="hidden md:flex gap-6 text-xl">
          <a href="#about" className="text-outline hover:text-red-500 transition-colors">History</a>
          <a href="#scripture" className="text-outline hover:text-red-500 transition-colors">Scripture</a>
          <a href="#paint" className="text-outline hover:text-red-500 transition-colors">Paint</a>
          <a href="#generate" className="text-outline hover:text-red-500 transition-colors">Meme Gen</a>
        </div>
        <a href="#buy" className="bg-red-600 text-white border-2 border-black px-4 py-2 text-lg sketch-button">
          GET {TICKER}
        </a>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="pt-32 pb-16 px-4 min-h-screen flex items-center justify-center relative overflow-hidden">
       {/* Background doodles */}
      <div className="absolute bottom-10 right-10 text-black/10 text-9xl -rotate-12 select-none">PAINT</div>

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-block bg-black text-white px-4 py-2 text-xl rotate-2 sketch-border">
            USD1 PAIR ON BONK.FUN
          </div>
          <h1 className="text-7xl md:text-9xl text-outline leading-none transform -rotate-2">
            THE YELLOW<br/>SCRIPTURE
          </h1>
          <p className="text-2xl md:text-3xl text-outline-sm leading-relaxed transform rotate-1">
            Born in Crude MS Paint. Not by corporate designers. <br/>
            YARL is the truth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <div className="sketch-border bg-white text-black p-4 flex flex-col items-center sm:items-start">
               <span className="text-sm">CA (COPY ME):</span>
               <code className="text-lg md:text-xl break-all select-all font-sans font-bold">{CONTRACT_ADDRESS}</code>
            </div>
          </div>
        </div>

        <div className="relative">
          <img 
            src={LOGO_URL} 
            alt="Yarl" 
            className="w-full max-w-md mx-auto sketch-border bg-white rotate-3 hover:-rotate-3 transition-transform duration-500 p-2"
          />
          <div className="absolute -bottom-10 -right-10 bg-red-600 text-white p-4 sketch-border text-2xl rotate-12">
            MS PAINT 4EVER
          </div>
        </div>
      </div>
    </section>
  );
}

const About = () => {
  return (
    <section id="about" className="py-24 px-4 bg-white border-y-4 border-black text-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="bg-black text-yellow-400 px-4 py-1 text-xl sketch-border rotate-2 inline-block mb-4">ARCHIVE: 2014-2015</span>
          <h2 className="text-5xl md:text-7xl underline decoration-wavy decoration-red-500">THE FORGOTTEN PROJECT</h2>
          <p className="mt-4 text-xl font-bold">RESEARCHING AND PRESERVING THE HISTORY OF /YARL/</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="sketch-border bg-[#fef200] p-6 md:p-8 transform rotate-1 hover:rotate-0 transition-transform">
            <h3 className="text-3xl font-bold mb-4 border-b-2 border-black pb-2">HISTORICAL CONTEXT</h3>
            <p className="text-xl mb-6 font-sans font-bold">
              /r9k/ (Robot9000) circa 2014.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Yarl was an attempted meme character introduced by an anonymous user who hoped to create "the next Pepe."
            </p>
            <p className="text-lg leading-relaxed">
              The goal? To replace the "oversaturated" Pepe market.
              <br/>
              The result? <span className="bg-red-600 text-white px-1 font-bold">TOTAL REJECTION.</span>
            </p>
          </div>

          <div className="sketch-border bg-black text-white p-6 md:p-8 transform -rotate-1 hover:rotate-0 transition-transform">
            <h3 className="text-3xl font-bold mb-4 border-b-2 border-white pb-2 text-yellow-400">WHY IT FAILED</h3>
            <ul className="space-y-4 text-lg list-disc list-inside">
              <li>Lack of "versatility" (FALSE)</li>
              <li>"Poor artwork" (IT'S ABSTRACT ART)</li>
              <li>Community resistance (THEY WERE AFRAID)</li>
            </ul>
            <div className="mt-8 p-4 border-2 border-dashed border-white/30 rounded">
              <p className="text-xl italic text-gray-300">
                "mfw these newfags try to dethrone the obvious king."
              </p>
              <p className="text-right text-sm mt-2 text-gray-500">- Anonymous 4chan User, 2014</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl leading-relaxed">
            Only one archived Reddit post survived. Until now.
            <br/>
            <span className="bg-yellow-400 px-2 box-decoration-clone">We study memetic evolution and the forgotten corners of internet history.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

const Scripture = () => {
  return (
    <section id="scripture" className="py-24 px-4 bg-yellow-500 border-y-4 border-black">
      <div className="max-w-4xl mx-auto space-y-12 text-center">
        <h2 className="text-6xl text-outline mb-12 underline decoration-wavy decoration-red-500">THE YELLOW SCRIPTURE</h2>
        
        <div className="grid gap-8 text-2xl md:text-3xl leading-relaxed">
          <p className="bg-white text-black p-6 sketch-border rotate-1">
            "The cult of anonymous yarlers stand together strong, but every disciple unique in its own way."
          </p>
          <p className="bg-black text-white p-6 sketch-border -rotate-1">
            "YARL teaches that morality is our compass, not our chain."
          </p>
          <p className="bg-white text-black p-6 sketch-border rotate-1">
            "We are not driven by greed or fame, but by a quiet conviction that virtue can still exist online."
          </p>
          <p className="bg-red-600 text-white p-6 sketch-border -rotate-2 text-4xl">
            "We do not worship the meme; we live the message."
          </p>
        </div>
      </div>
    </section>
  );
}

const YarlPaint = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const startDrawing = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'my-yarl-masterpiece.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <section id="paint" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl text-outline text-center mb-8">DRAW YOUR YARL</h2>
        <div className="sketch-border bg-white p-2">
          <canvas
            ref={canvasRef}
            className="w-full h-[400px] cursor-crosshair touch-none bg-white border-2 border-dashed border-gray-300"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
        
        <div className="mt-6 flex flex-wrap gap-4 justify-center items-center bg-black p-4 sketch-border">
          <div className="flex gap-2">
            {['#000000', '#FF0000', '#FACC15', '#FFFFFF', '#0000FF'].map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-10 h-10 border-2 border-white ${color === c ? 'scale-125 ring-2 ring-white' : ''}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          
          <div className="flex gap-2 items-center text-white">
            <span className="text-sm">SIZE:</span>
            <input 
              type="range" 
              min="1" 
              max="20" 
              value={brushSize} 
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-24 accent-yellow-400"
            />
          </div>

          <div className="flex gap-4 ml-auto">
            <button onClick={clearCanvas} className="bg-red-500 text-white px-4 py-2 border border-white hover:bg-red-600">
              TRASH IT
            </button>
            <button onClick={downloadCanvas} className="bg-green-500 text-white px-4 py-2 border border-white hover:bg-green-600">
              SAVE MASTERPIECE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const MemeGallery = () => {
  return (
    <div className="py-20 overflow-hidden bg-black border-y-4 border-white">
      <div className="flex animate-marquee gap-8 w-max">
        {[...TICKER_IMAGES, ...TICKER_IMAGES].map((src, i) => (
          <div key={i} className="w-64 h-64 bg-white p-2 sketch-border rotate-2 hover:rotate-0 transition-transform">
            <img src={src} className="w-full h-full object-cover border border-black" alt="Yarl Meme" />
          </div>
        ))}
      </div>
      <style>{`
        .animate-marquee { animation: marquee 30s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
};

const RANDOM_PROMPTS = [
  "Yarl explaining crypto to a confused chicken",
  "Yarl as a king sitting on a throne of yellow bananas",
  "Yarl flying a paper airplane to Mars",
  "Yarl having a tea party with a sad frog",
  "Yarl painting the sky yellow with a giant brush",
  "Yarl surfing on a slice of cheese",
  "Yarl debating philosophy with a vending machine",
  "Yarl finding the secret yellow scripture in a cereal box",
  "Yarl driving a cardboard lambo"
];

const YarlGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const cachedRefImage = useRef<string | null>(null);

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
    } catch (e) { return null; }
  };

  const generate = async () => {
    if (!prompt || loading) return;
    const apiKey = process.env.API_KEY || (window as any).process?.env?.API_KEY;
    if (!apiKey) return;

    setLoading(true);
    setGeneratedImg(null);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const base64Ref = await getBase64FromUrl(LOGO_URL);
      const parts: any[] = [];
      if (base64Ref) parts.push({ inlineData: { data: base64Ref, mimeType: 'image/png' } });
      
      parts.push({ text: `Create an MS Paint style meme.
      INSTRUCTION: The provided image is the character's HEAD. Maintain this exact facial expression and head shape.
      ACTION: Draw a crude body attached to this head. The character is doing: ${prompt}.
      STYLE: Crude, amateur, funny, thick black lines, yellow skin, 4chan/reddit meme aesthetic.` });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: parts },
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = () => {
    const randomPrompt = RANDOM_PROMPTS[Math.floor(Math.random() * RANDOM_PROMPTS.length)];
    setPrompt(randomPrompt);
  };

  return (
    <section id="generate" className="py-24 px-4">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h2 className="text-5xl text-outline">MEME FACTORY</h2>
          <p className="text-2xl text-black">Make your own yellow scripture propaganda.</p>
          
          <div className="sketch-border bg-white p-6 space-y-4 text-black">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g. Yarl riding a rocket to the moon painted by a 5 year old..."
              className="w-full h-40 border-2 border-black p-4 text-xl font-sans"
            />
            <div className="flex gap-4">
              <button 
                onClick={handleRandom}
                disabled={loading}
                className="w-1/3 bg-blue-500 text-white text-xl py-4 sketch-button border-2 border-black"
              >
                RANDOM IDEA
              </button>
              <button 
                onClick={generate} 
                disabled={loading}
                className="w-2/3 bg-black text-yellow-400 text-2xl py-4 sketch-button"
              >
                {loading ? "PAINTING..." : "GENERATE CRUDE ART"}
              </button>
            </div>
          </div>
        </div>

        <div className="sketch-border bg-white min-h-[400px] flex items-center justify-center p-4 relative">
          {generatedImg ? (
            <div className="relative w-full">
              <img src={generatedImg} className="w-full border-2 border-black" />
              <a 
                href={generatedImg} 
                download="yarl-gen.png" 
                className="absolute bottom-4 right-4 bg-yellow-400 text-black border-2 border-black px-4 py-2 sketch-button"
              >
                SAVE
              </a>
            </div>
          ) : (
             <div className="text-black/20 text-4xl text-center rotate-12">
               ART GOES HERE
             </div>
          )}
        </div>
      </div>
    </section>
  );
};

const BuySection = () => {
  return (
    <section id="buy" className="py-24 px-4 text-center">
      <h2 className="text-6xl text-outline mb-16">JOIN THE CULT</h2>
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-black">
        <div className="bg-white p-8 sketch-border rotate-2 hover:rotate-0 transition-transform">
          <h3 className="text-4xl mb-4 bg-yellow-400 inline-block px-2 border border-black">STEP 1</h3>
          <p className="text-2xl">Download Phantom Wallet. Don't be a normie.</p>
        </div>
        <div className="bg-white p-8 sketch-border -rotate-2 hover:rotate-0 transition-transform">
          <h3 className="text-4xl mb-4 bg-yellow-400 inline-block px-2 border border-black">STEP 2</h3>
          <p className="text-2xl">Get some SOL. You need gas for the rocket.</p>
        </div>
        <div className="bg-white p-8 sketch-border rotate-1 hover:rotate-0 transition-transform">
          <h3 className="text-4xl mb-4 bg-yellow-400 inline-block px-2 border border-black">STEP 3</h3>
          <p className="text-2xl mb-4">Go to <a href="https://bonk.fun" target="_blank" className="underline decoration-wavy decoration-red-500">BONK.FUN</a></p>
          <p className="text-lg">Paste the CA:<br/><span className="font-bold text-sm select-all">{CONTRACT_ADDRESS}</span></p>
        </div>
      </div>
    </section>
  );
};

const Chart = () => {
  return (
    <section className="px-4 pb-24">
      <div className="max-w-6xl mx-auto sketch-border bg-black p-2 h-[600px]">
        <iframe 
          src={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}?embed=1&theme=dark`}
          className="w-full h-full border-0"
        />
      </div>
    </section>
  );
};

const App = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <MemeGallery />
      <Scripture />
      <YarlPaint />
      <YarlGenerator />
      <BuySection />
      <Chart />
      
      <footer className="bg-black text-yellow-400 py-12 text-center border-t-4 border-white">
        <div className="flex justify-center gap-4 mb-8">
           <img src={LOGO_URL} className="w-20 h-20 rounded-full border-2 border-white" />
        </div>
        <h2 className="text-6xl mb-4">YARL</h2>
        <p className="text-xl">THE YELLOW SCRIPTURE IS FOREVER.</p>
        <p className="mt-8 text-sm text-gray-500 font-sans">© 2025 Yarl Cult. Not financial advice. Just vibes.</p>
      </footer>
    </div>
  );
};

export default App;
