import { useState, useEffect, useCallback, useRef } from "react";

const O  = "#F7931A";
const BK = "#000000";
const D1 = "#0A0A0A";
const D2 = "#111111";
const D3 = "#1A1A1A";
const G0 = "#2A2A2A";
const G1 = "#444444";
const G2 = "#666666";
const G3 = "#8A8A8A";
const G4 = "#B0B0B0";
const W2 = "#E8E8E8";
const W  = "#FFFFFF";
const E  = "#00E5FF";

/* ─── SPLASH SCREEN ─── */
function SplashScreen({ onComplete }) {
  const videoRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    
    // Show our overlay text when the AI text would appear (~2s)
    const textTimer = setTimeout(() => setShowText(true), 1800);

    const handleEnd = () => {
      setFadeOut(true);
      setTimeout(onComplete, 1200);
    };

    vid.addEventListener("ended", handleEnd);
    vid.play().catch(() => {
      setShowText(true);
      setTimeout(() => { setFadeOut(true); setTimeout(onComplete, 1200); }, 3000);
    });

    return () => { vid.removeEventListener("ended", handleEnd); clearTimeout(textTimer); };
  }, [onComplete]);

  return (
    <div
      onClick={() => { setFadeOut(true); setTimeout(onComplete, 800); }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999, background: BK,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 1.2s ease",
        cursor: "pointer",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes textFadeIn { 0% { opacity: 0; transform: translateY(8px); } 100% { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div style={{ position: "relative", maxWidth: "100%", maxHeight: "100vh" }}>
        <video
          ref={videoRef}
          src="/intro.mp4"
          muted
          playsInline
          preload="auto"
          style={{
            maxWidth: "100%", maxHeight: "100vh",
            objectFit: "contain", display: "block",
          }}
        />
        {/* Clean text overlay — covers the AI-generated text */}
        {showText && (
          <div style={{
            position: "absolute",
            top: "36%", left: 0, right: 0,
            textAlign: "center",
            pointerEvents: "none",
          }}>
            {/* Background patch to hide AI text underneath */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(80,30,0,0.85) 0%, rgba(80,30,0,0.6) 40%, transparent 70%)",
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                fontSize: "clamp(28px, 7vw, 52px)", fontWeight: 800, color: W,
                fontFamily: "'IBM Plex Sans', -apple-system, sans-serif",
                letterSpacing: "-0.02em", lineHeight: 1.1,
                animation: "textFadeIn 0.8s ease forwards",
                textShadow: "0 2px 20px rgba(0,0,0,0.6)",
              }}>
                21m Reasons
              </div>
              <div style={{
                fontSize: "clamp(14px, 3.5vw, 24px)", fontWeight: 400, color: "rgba(255,255,255,0.85)",
                fontFamily: "'IBM Plex Sans', -apple-system, sans-serif",
                letterSpacing: "0.02em", marginTop: 6,
                animation: "textFadeIn 0.8s ease 0.2s forwards",
                opacity: 0,
                textShadow: "0 2px 16px rgba(0,0,0,0.5)",
              }}>
                BTC explained — bit by bit
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{
        position: "absolute", bottom: 30, left: 0, right: 0, textAlign: "center",
        fontSize: 11, color: G2, fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: "0.1em", opacity: fadeOut ? 0 : 0.6,
        transition: "opacity 0.5s ease",
      }}>
        TAP TO SKIP
      </div>
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }
  return <MainPortal />;
}

const useBTC = () => {
  const [price, setPrice] = useState(68450);
  const [prev, setPrev] = useState(68450);
  useEffect(() => {
    const i = setInterval(() => {
      setPrev(price);
      setPrice((p) => p + (Math.random() - 0.5) * 80);
    }, 5000);
    return () => clearInterval(i);
  }, [price]);
  return { price, prev };
};

const SCHEMES = [
  { bg: O, heading: BK, body: G0, tag: "rgba(0,0,0,0.22)", tagText: BK, meta: G1, dots: BK, dotsOff: "rgba(0,0,0,0.18)" },
  { bg: BK, heading: O, body: G4, tag: "rgba(247,147,26,0.12)", tagText: O, meta: G2, dots: O, dotsOff: "rgba(255,255,255,0.1)" },
  { bg: O, heading: W, body: "rgba(255,255,255,0.82)", tag: "rgba(0,0,0,0.2)", tagText: W, meta: "rgba(255,255,255,0.55)", dots: W, dotsOff: "rgba(255,255,255,0.22)" },
  { bg: G0, heading: O, body: G4, tag: "rgba(247,147,26,0.1)", tagText: O, meta: G3, dots: O, dotsOff: "rgba(255,255,255,0.08)" },
];

const POSTS = [
  { tag: "REASON #1", headline: "BITCOIN IS SOVEREIGN. IT ISN'T CONTROLLED BY ANY GOVERNMENT OR CENTRAL AUTHORITY", body: "No state or institution can influence, print more of, or change the policy of Bitcoin." },
  { tag: "REASON #2", headline: "BTC HAS A CAP OF 21M COINS WHICH MAKES IT THE FIRST EVER AND ONLY TRULY SCARCE ASSET", body: "Every other commodity on the planet has an unfixed supply. Gold, silver, oil — all can be mined or extracted in greater quantities. Bitcoin cannot." },
  { tag: "REASON #3", headline: "BITCOIN IS BORDERLESS WEALTH ACCESSIBLE BY YOU AND ONLY YOU WHEREVER YOU ARE IN THE WORLD", body: "Bitcoin has given refugees around the world the ability to retain their wealth and ensure financial sovereignty across any border." },
  { tag: "REASON #4", headline: "EVERY TRANSACTION IS IMMUTABLE AND CANNOT BE STOPPED, CHANGED, OR REVERSED BY ANYONE", body: "Nobody can change the ledger, stop or withhold the funds. Once confirmed, it is final." },
  { tag: "REASON #5", headline: "LIKE GOLD, BITCOIN IS SEEN BY BLACKROCK AND OTHERS AS A WAY TO PRESERVE WEALTH AND PROTECT AGAINST INFLATION", body: "'Bitcoin is digital gold' — Larry Fink (BlackRock). Institutional validation of Bitcoin as a store of value continues to accelerate." },
  { tag: "REASON #6", headline: "BITCOIN IS A HEDGE AGAINST INFLATION, FISCAL IRRESPONSIBILITY AND CURRENCY DEBASEMENT", body: "USD is the strongest currency in the world and has lost 40% of its purchasing power in 20 years. Every fiat currency trends toward zero." },
  { tag: "REASON #7", headline: "BITCOIN IS THE 5TH LARGEST ASSET IN THE WORLD BEHIND ONLY GOLD, NVIDIA, APPLE AND MICROSOFT", body: "Bitcoin is a $2.19 trillion asset and on target to go No.2 in 2025. It has outperformed every traditional asset class over any 4-year period." },
  { tag: "REASON #8", headline: "THE BITCOIN ETF IS THE MOST SUCCESSFUL IN HISTORY — 20X FASTER THAN GOLD ETFS", body: "Despite gold ETFs being available for 20+ years, Bitcoin ETF took only weeks to surpass expectations. Fastest growing ETF product ever launched." },
  { tag: "REASON #9", headline: "BITCOIN STILL ONLY REPRESENTS 0.25% OF GLOBAL ASSETS AND ITS SUPERIOR QUALITIES WILL CAPTURE EVEN MORE IN THE NEXT DECADES", body: "Bitcoin has arrived as a globally recognised asset with superior properties: scarcity, portability, divisibility, verifiability, and censorship resistance." },
  { tag: "REASON #10", headline: "BITCOIN IS AN UNHACKABLE BANK ACCOUNT THAT ANYONE IN THE WORLD CAN USE — NO PERMISSION, NO ACCOUNT FEES", body: "'You can't crack that at all.' The government can't get in. Everyone is walking around with a Swiss bank account in their pocket." },
  { tag: "REASON #11", headline: "TOTAL GLOBAL ASSET VALUE TREBLES EVERY 10 YEARS — $8.1 QUADRILLION (2045) BTC @ 20% OF TGA = $81M/BTC", body: "Even if total global assets is only $4 quadrillion by 2045 and BTC only 2.5% (alongside gold), the price per Bitcoin would exceed $1M." },
  { tag: "REASON #12", headline: "BITCOIN IS A COMPLETELY INDEPENDENT MONETARY SYSTEM — UNHACKABLE, UNSEIZABLE, UNCONTROLLABLE", body: "Nobody can gain access. No government can seize funds or shut down your bank account. True financial independence for every individual." },
  { tag: "REASON #13", headline: "BITCOIN DOES NOT NEED THE INTERNET AND WOULD REMAIN FUNCTIONAL IN AN ENERGY OR INTERNET BLACKOUT", body: "The network can be broadcast over radiowave, mesh network, shortwave, ham radio, or SMS text. It is resilient by design." },
  { tag: "REASON #14", headline: "NO HACKER HAS EVER STOLEN BITCOIN FUNDS DESPITE THERE BEING A MULTI-TRILLION DOLLAR BOUNTY FOR DOING SO", body: "America, Russia, Chinese governments and hackers from around the world have tried for 15 years. The protocol remains unbroken." },
  { tag: "REASON #15", headline: "VANGUARD MAKES U-TURN ON BITCOIN STRATEGY AFTER REFUSING TO LAUNCH BTC ETF... NOW THE LARGEST HOLDER OF MSTR STOCK", body: "Vanguard famously sat out as BlackRock and others launched ETFs in Jan '24. This resulted in the most significant institutional reversal in crypto history." },
  { tag: "REASON #16", headline: "SAB 121 REPEALED IN JAN '25 TO ALLOW BANKS TO CUSTODY BITCOIN AS AN ASSET RATHER THAN TREATING IT AS A LIABILITY", body: "Previously, if banks were to custody BTC they would need to hold the equivalent amount in reserves. This regulatory change unlocks institutional custody." },
  { tag: "REASON #17", headline: "BITCOIN IS A REVOLUTION: A MOVEMENT THAT IS BRINGING PEOPLE TOGETHER TO WORK TOWARD A BETTER FUTURE", body: "There is no blue or red, black or white in Bitcoin. There is just enthusiasm to collaborate with like-minded people for sound money." },
  { tag: "REASON #18", headline: "BITCOIN UTILIZES FLARED GAS AS WELL AS OTHER TYPES OF TRAPPED AND WASTED POTENTIAL ENERGY THAT WOULD OTHERWISE BE WASTED", body: "Flared gas used to power BTC miners is harnessing energy and saving companies an economic loss while reducing emissions." },
  { tag: "REASON #19", headline: "BEING ABLE TO TAKE YOUR WEALTH ANYWHERE IN THE WORLD WITH 12 OR 24 WORDS IN YOUR HEAD IS IMMENSELY EMPOWERING", body: "No need to take physical gold, diamonds, or cash on you or in your luggage. Just a string of words grants access to your entire wealth." },
  { tag: "REASON #20", headline: "BITCOIN MINING IS AN UPGRADE TO EXISTING ENERGY INFRASTRUCTURE AS IT STABILIZES THE GRID WHEN THE POWERLOAD VARIES", body: "This not only provides more stability to the energy grid but also provides a floor buyer for energy, encouraging more investment in generation capacity." },
  { tag: "REASON #21", headline: "BITCOIN MINING PROVIDES A WAY TO CAPTURE ENERGY IN REMOTE AND STRATEGICALLY ISOLATED AREAS", body: "Lots of energy is inaccessible due to the prohibitive cost of the infrastructure required to transport it. Bitcoin mining monetizes stranded energy." },
  { tag: "REASON #22", headline: "TRUMP SIGNED AN EXECUTIVE ORDER TO CREATE A STRATEGIC BITCOIN RESERVE USING TREASURY-HELD BITCOIN", body: "Trump has said he wants America to become the Bitcoin capital of the world and is making bold and unprecedented moves to achieve it." },
  { tag: "REASON #23", headline: "'BITCOIN IS OVERWHELMINGLY THE NUMBER ONE PRIORITY, DRIVEN BY ITS SCARCITY AND DECENTRALIZED NATURE'", body: "Robert Mitchnick (Head of Digital Assets, BlackRock). The world's largest asset manager with $10T+ AUM is all-in on BTC." },
  { tag: "REASON #24", headline: "AI AGENTS WILL NEED BITCOIN WALLETS TO OPERATE AND ACT AUTONOMOUSLY. NOTHING ELSE IS SECURE ENOUGH TO ENSURE SAFE TRADE", body: "The next version of the digital economy is built with agentic AI, and they will need ways to transact without human intermediaries." },
  { tag: "REASON #25", headline: "MONEY, IN THE SIMPLEST TERMS IS A VEHICLE FOR STORING ENERGY AND TRANSFERRING IT ACROSS SPACE AND TIME EFFICIENTLY", body: "Bitcoin is the most efficient and useful battery ever created. Taking energy with minimal loss, storing it indefinitely, and transferring it instantly." },
  { tag: "REASON #26", headline: "BITCOIN IS A PEACEFUL PROTEST AGAINST THE BANKS AND GOVERNMENTS THAT HAVE STOLEN YOUR HARD-EARNED TIME AND MONEY", body: "Shortly after the 2008 financial crisis a new technology was born. Occupy Wall St. wasn't enough. Bitcoin is the peaceful financial revolution." },
  { tag: "REASON #27", headline: "CBDCs WILL SOON BE EUROPEWIDE, WHICH MEANS COMPLETE CONTROL OF YOUR MONEY AND THE ERADICATION OF RIGHTS", body: "Control money, control voters. Limits or restrictions where, when, for how long you can spend your own money. Bitcoin is the antidote." },
  { tag: "REASON #28", headline: "MONEY SHOULD BE BUILT ON UNBREAKABLE UNCHANGEABLE INCORRUPTIBLE FUNDAMENTALS LIKE MATH AND PHYSICS", body: "It should not be built on flawed human judgment or political expediency. Bitcoin's rules are enforced by mathematics, not institutions." },
  { tag: "REASON #29", headline: "THE NEW ISSUANCE RATE OF BTC DROPS BELOW ANNUALLY MINED GOLD AND WILL CONTINUE TO BE MORE AND MORE SCARCE", body: "1.2% of new gold is mined each year. New BTC issuance is ~0.85% annual. Bitcoin is already scarcer than gold by issuance rate." },
  { tag: "REASON #30", headline: "FLORIDA ANNOUNCES ZERO CAPITAL GAINS TAX ON BTC", body: "Other states will follow or see wealth outflows. Tax competition between jurisdictions is accelerating Bitcoin adoption nationwide." },
  { tag: "REASON #31", headline: "'BITCOIN CRITICS ARE WRONG... IT IS A WAY OF STORING VALUE IN A MODERN DIGITAL AGE. BITCOIN HAS A CHAMPION AND ALLY IN THE WHITE HOUSE.'", body: "'We want our fellow Americans to know that crypto, digital assets, and Bitcoin... are part of the future.'" },
  { tag: "REASON #32", headline: "THERE IS TWICE AS MUCH MONEY KEPT IN BITCOIN THAN IN THE BRITISH POUND — BTC ONLY SITS BEHIND THE USD $, EUR €, CNY AND JPY ¥", body: "Bitcoin is now the 5th biggest currency, and on course to be No.1 by the end of 2032. An explosion in adoption is underway." },
  { tag: "REASON #33", headline: "PAKISTAN LATEST COUNTRY TO ANNOUNCE BITCOIN STRATEGIC RESERVE AS USA, SWITZERLAND, HONG KONG AND BRAZIL PAVE THE WAY", body: "The first country to adopt Bitcoin was El Salvador but since, many countries around the world have followed. Nation-state game theory is playing out." },
  { tag: "REASON #34", headline: "SINGAPORE, HONG KONG, UAE AND SEVERAL OTHER COUNTRIES OFFER 0% CAPITAL GAINS TAX TO ATTRACT CRYPTO INVESTORS", body: "El Salvador, Malta, Malaysia, Puerto Rico, Monaco, Switzerland, Bermuda, Belarus, Georgia and many more. Jurisdictional competition is fierce." },
  { tag: "REASON #35", headline: "BITCOIN IS COMPLETELY DECENTRALISED AS ANYONE CAN RUN A NODE FOR A VERY LOW COST AND WITH FEW TECHNICAL SKILLS", body: "It is technically possible for any person to run Bitcoin code and verify the transactions on the network. True decentralization." },
  { tag: "REASON #36", headline: "BITCOIN'S NETWORK SIZE AND ADOPTION, PRICE AND HASHRATE ARE POWER LAWS CONSISTENT WITH SCALE SYSTEMS SEEN IN NATURE", body: "The phenomenon shows calculable and observable regularities in the presumably random system. Like cities, earthquakes, and biological networks." },
  { tag: "REASON #37", headline: "GERMANY SOLD ALL ITS BITCOIN IN 2024. AND THEY HAVE SINCE MISSED OUT ON $2.3B OF PROFIT — AND COUNTING", body: "In the monumental blunder, their realised profit is close to being eclipsed by the potential profit they left on the table." },
  { tag: "REASON #39", headline: "THE US DEBT HAS GONE FROM $6T IN 2005 TO $36T IN 2025 AND THE 5TH WORST DEBT-TO-GDP RATIO IN THE WORLD WITH DEBT 131% OF INCOME", body: "If the US was a person on $50,000 salary, then their debt would be $65,500. Debt refinancing interest alone exceeds the defence budget." },
  { tag: "REASON #40", headline: "BTC HAS NO COUNTER-PARTY RISK OR REHYPOTHECATION — THERE IS NO THIRD PARTY CUSTODIAN TO SEIZE, DEFAULT ON OR DENY DELIVERY", body: "Even governments fail to commit to their agreements and many assets have been reneged upon or seized. Bitcoin is bearer money." },
  { tag: "REASON #42", headline: "PRESIDENT TRUMP SIGNS EXECUTIVE ORDER TO ESTABLISH BITCOIN STRATEGIC RESERVE. OTHER COUNTRIES HAVE OR HAVE ANNOUNCED TO FOLLOW", body: "The US is not the first but it is the most significant. As the richest, largest economy and world reserve currency holder." },
  { tag: "REASON #43", headline: "BITCOIN IS THE LARGEST DECENTRALISED NETWORK IN THE WORLD WITH NO SINGLE POINT OF FAILURE", body: "No government, power outage, or cyber attack can take down BTC. It will always be running and would take an impossibly coordinated global effort to stop." },
  { tag: "REASON #44", headline: "GOLD IS HARD TO DIVIDE UP OR SHAVE THE EXACT AMOUNT OFF TO PAY YOUR BILL. BITCOIN IS DIVISIBLE TO 100 MILLION PARTS CALLED SATOSHIS", body: "Even fiat currency cannot divide up more than 100 parts per whole. More divisibility, more granularity, more usability for micro-transactions." },
  { tag: "REASON #45", headline: "'ULTIMATELY, THE WORLD, THE INTERNET WILL HAVE A SINGLE CURRENCY. I PERSONALLY BELIEVE THAT IT WILL BE BITCOIN'", body: "Jack Dorsey (creator of Twitter) is among the most knowledgeable tech creators of our generation. He has bet his career on Bitcoin." },
  { tag: "REASON #47", headline: "BITCOIN IS THE ULTIMATE PROTEST AGAINST OPPRESSIVE GOVERNMENTS AND TYRANNICAL INSTITUTIONS AS IT CANNOT BE PRESSURED", body: "They have no power here. Where lies the control of money, lies the power. BTC is the right to dissent with your wallet." },
  { tag: "REASON #48", headline: "FAST SETTLEMENT, NO INTERMEDIARY — BITCOIN LIGHTNING 25M TRANSACTIONS PER SECOND. VISA 1700. MASTERCARD 5000.", body: "No weekend or bank holiday delays. No freezing or holding of funds. No delays. Instant, global, 24/7/365." },
  { tag: "REASON #49", headline: "THE US GOVERNMENT ARE PASSING NUMEROUS LEGISLATION TO MAKE THE USA THE 'CRYPTO CAPITAL OF THE WORLD'", body: "The GENIUS Act, Strategic Bitcoin Reserve, allowing BTC in 401k retirement schemes, and dozens more bills in various stages." },
  { tag: "REASON #50", headline: "THE US$ IS FAILING AND CANNOT SUSTAIN AS THE WORLD RESERVE CURRENCY — GOLD AND BTC ARE EMERGING AS MUTUAL RESERVE ASSETS", body: "The next version of the Plaza Accords is likely to take place to establish a new global reserve structure. Bitcoin is part of that conversation." },
  { tag: "REASON #51", headline: "THE GENIUS ACT IS PASSED INTO LAW — REGULATES STABLECOINS, REQUIRING 1:1 RESERVE BACKING, AUDITS", body: "In effect, the industry has been given green light to go mainstream and expand the size of the crypto industry enormously." },
  { tag: "REASON #52", headline: "'I'D ADVISE PUTTING 15% (OF NET WORTH) IN EITHER BITCOIN OR GOLD TO PROTECT AGAINST DEBT CRISIS AND CURRENCY DEVALUATION'", body: "Ray Dalio (author of 'Principles' and one of the world's most famous investors with net worth of $15B+) on portfolio allocation." },
  { tag: "REASON #54", headline: "TRUMP SIGNS EXECUTIVE ORDER ALLOWING BTC TO BE INCLUDED IN 401K RETIREMENT SCHEMES — WELCOMED BY THIS GENERATION", body: "Millions of Americans will now be passively investing in BTC as part of their retirement pension scheme. Enormous passive demand." },
  { tag: "REASON #55", headline: "DJT SIGNS EXECUTIVE ORDER 'GUARANTEEING FAIR BANKING FOR ALL AMERICANS' PROTECTING RIGHT TO SELF-CUSTODY OF BTC", body: "This comes as complete U-turn from the Democrats previous policies including Operation Chokepoint 2.0 which saw people debanked or refused service." },
  { tag: "REASON #56", headline: "$8.7 BILLION IN REALIZED LOSSES IN ONE WEEK — A TEXTBOOK CAPITULATION EVENT. WEAK HANDS OUT, STRONG HANDS IN.", body: "Second only to the 3AC collapse. The rotation of supply from weak hands to conviction investors has historically marked the beginning of the next leg up." },
  { tag: "REASON #57", headline: "CRYPTO FEAR & GREED INDEX AT 'EXTREME FEAR' — EVERY PREVIOUS TIME THIS HAPPENED, BTC WAS HIGHER 12 MONTHS LATER", body: "Markets are driven by emotion. When the crowd panics and sells, the smart money accumulates. Fear is temporary. Fundamentals are permanent." },
  { tag: "REASON #58", headline: "IBIT HAS ATTRACTED $21 BILLION IN NET INFLOWS OVER THE PAST YEAR — LONG-TERM INVESTORS ARE NOT LEAVING", body: "Despite $2.8B in recent outflows, the net position is overwhelmingly positive. Hedge funds and speculators are trimming. Conviction holders are adding." },
  { tag: "REASON #59", headline: "THE CFTC HAS PACKED ITS INNOVATION ADVISORY COMMITTEE WITH 35 MEMBERS INCLUDING CEOS OF COINBASE, RIPPLE AND GEMINI", body: "The most powerful commodity regulator in the world is building crypto into its infrastructure. This is not the behaviour of a government about to ban anything." },
  { tag: "REASON #60", headline: "THE FEDERAL RESERVE PUBLISHED A WORKING PAPER PROPOSING CRYPTO BE TREATED AS A DISTINCT ASSET CLASS FOR MARGIN REQUIREMENTS", body: "The Fed is acknowledging crypto's maturity at the institutional level. Separate margin frameworks mean they expect it to be a permanent part of the financial system." },
  { tag: "REASON #61", headline: "BTC IS DOWN 50% FROM ATH — EVERY CYCLE HAS HAD A DRAWDOWN OF THIS MAGNITUDE. EVERY CYCLE HAS RECOVERED AND EXCEEDED THE PREVIOUS HIGH.", body: "2011: -93%. 2014: -86%. 2018: -84%. 2022: -77%. The pattern is undefeated across 15 years and 4 cycles. Zoom out." },
  { tag: "REASON #62", headline: "BITCOIN TREASURY FIRMS WERE SITTING ON $21B OF UNREALIZED LOSSES — THIS HAS ALREADY BEGUN TO RECOVER", body: "Strategy Inc. and others absorbed the drawdown without selling. Corporate conviction is being tested in real time and it is holding firm." },
  { tag: "REASON #63", headline: "BITWISE CIO CITES 'THE FOUR-YEAR CYCLE' AS THE NO.1 REASON FOR THE CURRENT DECLINE — NOT A FAILURE OF BITCOIN", body: "2026 is the bear leg. This is expected. The halving cycle has repeated with remarkable consistency since 2012. The next bull phase follows." },
  { tag: "REASON #64", headline: "PROTECT PROGRESS HAS EARMARKED $1.5M TO UNSEAT ANTI-CRYPTO POLITICIANS — THE INDUSTRY IS FUNDING ITS OWN FUTURE", body: "Crypto PACs are reshaping US elections. Politicians who oppose the industry are being outspent and replaced. The political infrastructure is now permanent." },
  { tag: "REASON #65", headline: "GOLD HAS GAINED 61% IN THE PAST YEAR WHILE BTC HAS FALLEN 40% — THIS DIVERGENCE HAS ALWAYS REVERSED IN BITCOIN'S FAVOUR", body: "Gold leads in fear. Bitcoin leads in recovery. The last time gold massively outperformed BTC was 2022. Within 18 months, BTC had 4x'd." },
  { tag: "REASON #66", headline: "BITCOIN HAS ZERO COUNTERPARTY RISK — IT IS THE ONLY MAJOR ASSET THAT IS SIMULTANEOUSLY BEARER AND DIGITAL", body: "Bonds depend on governments. Stocks depend on companies. Property depends on legal systems. Bitcoin depends on mathematics alone." },
  { tag: "REASON #67", headline: "THE BITCOIN NETWORK CONSUMES LESS ENERGY THAN CLOTHES DRYERS IN THE US AND LESS THAN GOLD MINING GLOBALLY", body: "The narrative that Bitcoin wastes energy is propaganda. It uses 0.1% of global energy and incentivizes more renewable generation than any ESG initiative." },
  { tag: "REASON #68", headline: "THERE ARE MORE BITCOIN WALLET ADDRESSES THAN THERE ARE BANK ACCOUNTS IN AFRICA, SOUTH AMERICA AND SOUTHEAST ASIA COMBINED", body: "Financial inclusion isn't a slogan for Bitcoin — it's a measurable reality. The unbanked are banking themselves, on their own terms." },
  { tag: "REASON #69", headline: "'YOU NEVER CHANGE THINGS BY FIGHTING THE EXISTING REALITY. TO CHANGE SOMETHING, BUILD A NEW MODEL THAT MAKES THE EXISTING MODEL OBSOLETE.'", body: "Buckminster Fuller. Bitcoin doesn't petition banks for reform. It replaces them with something better." },
  { tag: "REASON #70", headline: "BITCOIN'S HASH RATE HAS INCREASED EVERY SINGLE YEAR SINCE INCEPTION — EVEN DURING 80%+ DRAWDOWNS", body: "Miners don't stop building during bear markets. The infrastructure grows relentlessly regardless of price. Security only goes up." },
  { tag: "REASON #71", headline: "A SINGLE BITCOIN TRANSACTION CAN SETTLE BILLIONS OF DOLLARS IN UNDER 10 MINUTES FOR LESS THAN $1", body: "Try moving $1 billion through the banking system. It takes days, costs tens of thousands, and requires dozens of intermediaries. Bitcoin: one transaction, one fee, final settlement." },
  { tag: "REASON #72", headline: "'BITCOIN IS A REMARKABLE CRYPTOGRAPHIC ACHIEVEMENT AND THE ABILITY TO CREATE SOMETHING NOT DUPLICABLE IN THE DIGITAL WORLD HAS ENORMOUS VALUE.'", body: "Eric Schmidt, former CEO of Google. The man who built the internet's search engine recognises that Bitcoin solved digital scarcity." },
  { tag: "REASON #73", headline: "BITCOIN RUNS ON THE SAME ENERGY MIX AS THE GRID IT CONNECTS TO — AND INCREASINGLY THAT GRID IS RENEWABLE", body: "58% of Bitcoin mining now uses renewable energy sources. It's the cleanest industrial-scale compute network on the planet and getting cleaner every year." },
  { tag: "REASON #74", headline: "THE LIGHTNING NETWORK CAN PROCESS 25 MILLION TRANSACTIONS PER SECOND — MORE THAN VISA AND MASTERCARD COMBINED", body: "Layer 1 is for settlement. Layer 2 is for speed. Bitcoin scales in layers, just like the internet scaled from TCP/IP to HTTP to apps." },
  { tag: "REASON #75", headline: "'I THINK BITCOIN IS ON THE VERGE OF GETTING BROAD ACCEPTANCE BY CONVENTIONAL FINANCE PEOPLE.'", body: "Ray Dalio, founder of Bridgewater Associates — the world's largest hedge fund. When the $150B fund manager says 'broad acceptance', the floodgates are opening." },
  { tag: "REASON #76", headline: "BITCOIN HAS RETURNED 7,000,000%+ SINCE 2010 — NO OTHER ASSET IN HUMAN HISTORY HAS COME CLOSE", body: "$1 invested in Bitcoin in 2010 would be worth over $70,000 today. Not stocks, not real estate, not gold, not venture capital. Nothing else." },
  { tag: "REASON #77", headline: "EVERY 10 MINUTES, A NEW BLOCK IS ADDED — BITCOIN HAS NEVER MISSED A HEARTBEAT IN 15 YEARS", body: "99.98% uptime since January 3, 2009. No maintenance windows, no server reboots, no scheduled downtime. The most reliable financial network ever built." },
  { tag: "REASON #78", headline: "YOU CAN SEND $1 OR $1 BILLION ACROSS THE WORLD ON A SUNDAY AT 3AM WITH NO PERMISSION FROM ANYONE", body: "Banks close. Borders close. Governments sleep. Bitcoin never does. 24/7/365 settlement with no gatekeepers, no holidays, no restrictions." },
  { tag: "REASON #79", headline: "'BITCOIN IS DIGITAL GOLD — HARDER, STRONGER, FASTER, AND SMARTER THAN ANY MONEY THAT HAS PRECEDED IT.'", body: "Michael Saylor, Chairman of Strategy Inc. The man who put $40B+ of corporate treasury into Bitcoin. Not words — conviction backed by capital." },
  { tag: "REASON #80", headline: "THE AVERAGE HOLDING PERIOD FOR BITCOIN IS NOW OVER 3 YEARS — LONGER THAN THE AVERAGE STOCK HOLDING PERIOD", body: "Bitcoiners don't trade. They accumulate. The average HODLer has stronger conviction than the average equity investor. Diamond hands are real." },
  { tag: "REASON #81", headline: "NO BITCOIN HAS EVER BEEN DOUBLE-SPENT IN 15 YEARS OF OPERATION — THE BYZANTINE GENERALS PROBLEM IS SOLVED", body: "Computer scientists said it was impossible. Satoshi proved them wrong. A trustless consensus mechanism that works perfectly, every time." },
  { tag: "REASON #82", headline: "'DO I THINK BITCOIN IS ON THE VERGE OF GETTING BROAD ACCEPTANCE BY CONVENTIONAL FINANCE PEOPLE? YES.'", body: "Ray Dalio changed from skeptic to allocator. The trajectory of every serious investor is the same: dismissal, curiosity, understanding, conviction." },
  { tag: "REASON #83", headline: "OVER 70 PUBLICLY TRADED COMPANIES NOW HOLD BITCOIN ON THEIR BALANCE SHEETS — UP FROM ZERO IN 2019", body: "Strategy, Tesla, Block, Marathon, Riot, Metaplanet and dozens more. Corporate treasury adoption is accelerating. This is not a retail phenomenon anymore." },
  { tag: "REASON #84", headline: "THE ENTIRE BITCOIN CODEBASE IS OPEN SOURCE — ANYONE CAN READ, AUDIT, AND VERIFY EVERY LINE", body: "No black boxes. No proprietary algorithms. No hidden backdoors. The most transparent financial system ever created, maintained by thousands of developers worldwide." },
  { tag: "REASON #85", headline: "'I DO THINK BITCOIN IS THE FIRST ENCRYPTED MONEY THAT HAS THE POTENTIAL TO DO SOMETHING LIKE CHANGE THE WORLD.'", body: "Peter Thiel, co-founder of PayPal. The man who built digital payments recognises that Bitcoin is the next evolution." },
  { tag: "REASON #86", headline: "BITCOIN MINING TURNS METHANE — A GREENHOUSE GAS 80X WORSE THAN CO2 — INTO ECONOMIC VALUE AND CLEANER EMISSIONS", body: "Landfills, oil wells, and farms vent methane into the atmosphere. Bitcoin miners capture it and convert it to CO2 (80x less harmful) while generating revenue." },
  { tag: "REASON #87", headline: "THERE ARE ONLY 21 MILLION BITCOIN BUT 56 MILLION MILLIONAIRES — THERE ISN'T ENOUGH FOR EACH ONE TO OWN A SINGLE COIN", body: "If every millionaire on Earth wanted just one Bitcoin, there wouldn't be enough. Factor in lost coins and the actual available supply is closer to 15 million." },
  { tag: "REASON #88", headline: "BITCOIN IS THE FIRST ASSET IN HISTORY WHERE INCREASED DEMAND CANNOT INCREASE SUPPLY", body: "Gold miners dig faster when prices rise. Oil companies drill more. Central banks print more. Bitcoin's issuance schedule is immovable. Demand can only affect price." },
  { tag: "REASON #89", headline: "'WE HAVE ELECTED TO PUT OUR MONEY AND FAITH IN A MATHEMATICAL FRAMEWORK THAT IS FREE OF POLITICS AND HUMAN ERROR.'", body: "Tyler Winklevoss, co-founder of Gemini. Bitcoin's monetary policy isn't decided in boardrooms or parliaments. It's enforced by code." },
  { tag: "REASON #90", headline: "BITCOIN HAS SURVIVED CHINA BANNING IT 11 TIMES, DOZENS OF 'OBITUARIES', AND EVERY CRISIS THROWN AT IT", body: "Covid crash, exchange collapses, regulatory crackdowns, hash rate migrations. Every attack has made the network stronger. Antifragile by nature." },
  { tag: "REASON #91", headline: "THE COST TO ATTACK THE BITCOIN NETWORK (51% ATTACK) EXCEEDS $20 BILLION — AND RISING EVERY DAY", body: "You would need more computing power than all of Google, Amazon, and Microsoft combined. And even then, you could only disrupt — not destroy." },
  { tag: "REASON #92", headline: "'THE GOVERNMENTS OF THE WORLD HAVE SPENT TRILLIONS BAILING OUT A DECAYING SYSTEM. BITCOIN IS THE EXIT.'", body: "Raoul Pal, CEO of Real Vision. The macro strategist who sees Bitcoin not as speculation but as the escape hatch from a broken monetary system." },
  { tag: "REASON #93", headline: "BITCOIN'S DIFFICULTY ADJUSTMENT IS THE MOST ELEGANT ECONOMIC MECHANISM EVER DESIGNED", body: "Every 2,016 blocks, the network automatically adjusts mining difficulty. Too many miners? Harder. Too few? Easier. Self-regulating, self-balancing. No committee needed." },
  { tag: "REASON #94", headline: "SOVEREIGN WEALTH FUNDS IN NORWAY, ABU DHABI, AND SINGAPORE HAVE INDIRECT BITCOIN EXPOSURE THROUGH EQUITY HOLDINGS", body: "The biggest pools of capital on Earth are already exposed. They can't ignore a $1.3 trillion asset class. Direct allocation is next." },
  { tag: "REASON #95", headline: "'AT ITS CORE, BITCOIN IS A SMART CURRENCY DESIGNED BY VERY FORWARD-THINKING ENGINEERS.'", body: "Peter Diamandis, founder of XPRIZE. The man who incentivizes moonshots recognises Bitcoin as one of the most consequential engineering achievements of our time." },
  { tag: "REASON #96", headline: "THE BITCOIN WHITEPAPER IS 9 PAGES LONG — THE ENTIRE MONETARY REVOLUTION FITS ON A NAPKIN", body: "Satoshi didn't need 10,000 pages of regulation. Nine pages of elegant mathematics. Open source. Peer reviewed. Launched. Never stopped." },
  { tag: "REASON #97", headline: "EVERY FOUR YEARS, BITCOIN'S NEW SUPPLY IS CUT IN HALF — THE NEXT HALVING IS ~2028 AND WILL REDUCE ISSUANCE TO 1.5625 BTC PER BLOCK", body: "Supply shock is mathematically programmed. Every halving has preceded a massive bull run. 2012, 2016, 2020, 2024. The pattern repeats." },
  { tag: "REASON #98", headline: "BITCOIN SETTLES MORE VALUE ANNUALLY THAN PAYPAL, VENMO, AND WESTERN UNION COMBINED", body: "Over $8 trillion in annual settlement value. It's not a toy. It's not a speculation. It's the largest payment settlement network outside of traditional banking." },
  { tag: "REASON #99", headline: "'BITCOIN IS A SWARM OF CYBER HORNETS SERVING THE GODDESS OF WISDOM, FEEDING ON THE FIRE OF TRUTH.'", body: "Michael Saylor. Poetic, but accurate. A decentralized army of economically incentivized participants protecting an immutable truth." },
  { tag: "REASON #100", headline: "YOU ARE STILL EARLY — BITCOIN ADOPTION IS AT ROUGHLY 3% OF THE GLOBAL POPULATION", body: "The internet had 3% adoption in 1995. Smartphones had 3% in 2007. Every network technology that crossed this threshold went on to reach billions." },
  { tag: "REASON #101", headline: "BITCOIN IS LEGAL TENDER IN EL SALVADOR AND THE CENTRAL AFRICAN REPUBLIC — NATION-STATE ADOPTION HAS BEGUN", body: "The first two dominoes have fallen. Strategic reserves are being established worldwide. The game theory is playing out exactly as predicted." },
  { tag: "REASON #102", headline: "'THE FUTURE OF MONEY IS DIGITAL CURRENCY.'", body: "Bill Gates, co-founder of Microsoft. The man who put a computer on every desk sees digital money on every phone. The only question is which one. Bitcoin got there first." },
  { tag: "REASON #103", headline: "BITCOIN'S VOLATILITY DECREASES WITH EVERY CYCLE — IT IS MATURING INTO A STABLE STORE OF VALUE", body: "2011: 175% annualized volatility. 2015: 85%. 2019: 65%. 2024: 45%. The arc is clear. As market cap grows, volatility compresses. Stability is earned." },
  { tag: "REASON #104", headline: "THE BITCOIN NETWORK HAS PROCESSED OVER 1 BILLION TRANSACTIONS WITHOUT A SINGLE CHARGEBACK", body: "No fraud disputes. No reversals. No 'we'll get back to you in 5-7 business days.' Finality is a feature, not a bug." },
  { tag: "REASON #105", headline: "'EVERY INFORMED PERSON NEEDS TO KNOW ABOUT BITCOIN BECAUSE IT MIGHT BE ONE OF THE WORLD'S MOST IMPORTANT DEVELOPMENTS.'", body: "Leon Luow, Nobel Peace Prize nominee. Not a tech bro. Not a speculator. A human rights advocate who sees Bitcoin as a tool for freedom." },
  { tag: "REASON #106", headline: "BITCOIN MINERS ARE BECOMING THE LARGEST BUYERS OF RENEWABLE ENERGY IN THE WORLD", body: "They go where energy is cheapest. Cheapest energy is increasingly solar, wind, and hydro. Bitcoin is funding the green transition faster than any subsidy programme." },
  { tag: "REASON #107", headline: "THE US DOLLAR HAS LOST 97% OF ITS PURCHASING POWER SINCE THE FEDERAL RESERVE WAS CREATED IN 1913", body: "Every fiat currency in history has gone to zero. Bitcoin is the first money designed to do the opposite — gain purchasing power over time through deflation." },
  { tag: "REASON #108", headline: "'STAY HUMBLE. STACK SATS.'", body: "The Bitcoin community mantra. Don't try to time it. Don't trade it. Just accumulate steadily and let mathematics and time do the rest." },
  { tag: "REASON #109", headline: "THERE IS NO CEO OF BITCOIN. NO BOARD. NO HEADQUARTERS. NO SINGLE POINT OF FAILURE OR CORRUPTION", body: "You can't subpoena Bitcoin. You can't lobby it. You can't bribe it. You can't threaten it. The protocol doesn't care about power — it only responds to proof of work." },
  { tag: "REASON #110", headline: "BITCOIN'S STOCK-TO-FLOW RATIO WILL EXCEED GOLD'S AFTER THE NEXT HALVING", body: "Stock-to-flow measures scarcity: existing supply divided by new production. After 2028, Bitcoin will be mathematically scarcer than the scarcest precious metal on Earth." },
  { tag: "REASON #111", headline: "'BITCOIN IS THE CURRENCY OF THE FUTURE OF ENERGY. IT'S FUNDAMENTALLY AN ENERGY CURRENCY.'", body: "Elon Musk, CEO of Tesla & SpaceX. The man building the future of energy and space recognises that Bitcoin is fundamentally about energy conversion." },
  { tag: "REASON #112", headline: "CENTRAL BANKS HOLD GOLD AS A RESERVE ASSET BECAUSE IT CANNOT BE PRINTED — BITCOIN IS GOLD WITH A TELEPORTER", body: "Everything gold does, Bitcoin does better. Except you can't send gold through the internet in 10 minutes. Bitcoin is a strict upgrade." },
  { tag: "REASON #113", headline: "'BITCOIN IS AN ASSET CLASS AS A LEGITIMATE FINANCIAL INSTRUMENT.'", body: "Larry Fink, CEO of BlackRock — the world's largest asset manager with $10+ trillion under management. When he speaks, trillions of dollars listen." },
  { tag: "REASON #114", headline: "THE BITCOIN MEMPOOL CLEARS EVERY SINGLE DAY — THE NETWORK HAS NEVER HAD A PERMANENT BACKLOG", body: "Transactions may queue temporarily during peak demand, but the system always clears. Self-regulating fee markets ensure efficiency without central planning." },
  { tag: "REASON #115", headline: "OVER $500 BILLION IN BITCOIN IS HELD BY ENTITIES THAT HAVE NEVER SOLD A SINGLE SATOSHI", body: "Diamond hands aren't a meme — they're measurable on-chain data. A growing percentage of supply is permanently removed from circulation by conviction holders." },
  { tag: "REASON #116", headline: "'BITCOIN'S STRUCTURE IS VERY INGENIOUS. THE PAPER CURRENCY IS BEING ELIMINATED AND CRYPTO IS WHAT WILL REPLACE IT.'", body: "Elon Musk. The transition from paper to digital money is inevitable. The only question is whether it's controlled by governments or by mathematics." },
  { tag: "REASON #117", headline: "BITCOIN CAN BE TRANSMITTED VIA SATELLITE, RADIO WAVES, MESH NETWORKS, AND EVEN SOUND WAVES", body: "Blockstream satellites broadcast the blockchain globally for free. No internet required. The network is designed to survive anything short of the end of civilization." },
  { tag: "REASON #118", headline: "THE AVERAGE COST OF A BITCOIN TRANSACTION IS LESS THAN A WIRE TRANSFER FEE — BUT SETTLES IN MINUTES, NOT DAYS", body: "International wire: $25-50, 3-5 business days. Bitcoin: $1-3, 10 minutes, final settlement. The banking system charges more for a worse service." },
  { tag: "REASON #119", headline: "'I THINK THE INTERNET IS GOING TO BE ONE OF THE MAJOR FORCES FOR REDUCING THE ROLE OF GOVERNMENT. THE ONE THING MISSING IS RELIABLE E-CASH.'", body: "Milton Friedman, Nobel Laureate in Economics. He predicted Bitcoin in 1999 — a decade before Satoshi made it real." },
  { tag: "REASON #120", headline: "IF YOU DON'T OWN BITCOIN, YOU ARE BETTING AGAINST IT WITH EVERYTHING YOU DO OWN", body: "Every dollar, euro, or pound you hold is a position — a bet that fiat will outperform the hardest, scarcest, most secure asset ever created. A 7,000,000% return over 15 years. Are you sure you want to be on the other side of that trade?" },
  { tag: "REASON #121", headline: "560 MILLION PEOPLE NOW HOLD CRYPTOCURRENCY WORLDWIDE — AND BITCOIN LEADS WITH 68% OF ALL WALLETS", body: "That's 1 in 10 internet users globally. India alone has 90 million holders. The US has 70 million. This isn't a niche hobby. It's a global movement." },
  { tag: "REASON #122", headline: "BITCOIN HAS NEVER BEEN HACKED, NEVER BEEN DOWN, AND NEVER MISSED A BLOCK IN OVER 800,000 CONSECUTIVE BLOCKS", body: "99.98% uptime since January 3, 2009. No system in the history of computing — not Google, not AWS, not Visa — has this track record." },
  { tag: "REASON #123", headline: "74% OF FAMILY OFFICES ARE NOW EXPLORING OR ACTIVELY INVESTED IN CRYPTO — UP 21 PERCENTAGE POINTS SINCE 2024", body: "The smart money isn't debating whether to buy Bitcoin. They're debating how much. Family offices manage generational wealth — they think in decades, not days." },
  { tag: "REASON #124", headline: "BITCOIN IS ACCEPTED AT OVER 39,000 MERCHANTS IN JAPAN ALONE — INCLUDING MAJOR CONVENIENCE STORES AND TECH RETAILERS", body: "This isn't theoretical adoption. People are buying coffee, electronics, and groceries with Bitcoin in the world's third-largest economy. Every day." },
  { tag: "REASON #125", headline: "IN EL SALVADOR, 82% OF SURVEYED VENDORS ACCEPT BITCOIN — HIGHER THAN CREDIT CARD ACCEPTANCE IN MOST DEVELOPING NATIONS", body: "The first Bitcoin nation is proving the model works. Tourism revenue is up. Financial inclusion has expanded. The experiment is succeeding." },
  { tag: "REASON #126", headline: "THERE ARE NOW OVER 40,000 BITCOIN ATMS WORLDWIDE — THE US ALONE HOSTS 85% OF THEM", body: "In Los Angeles, Miami, and New York, you're never more than a few blocks from a Bitcoin ATM. The physical infrastructure is already built." },
  { tag: "REASON #127", headline: "ARGENTINA AND TURKEY SAW 60% INCREASES IN CRYPTO ADOPTION — DRIVEN BY CITIZENS PROTECTING THEMSELVES FROM INFLATION", body: "When your currency loses 50% in a year, Bitcoin isn't speculation — it's survival. The people who need sound money the most are adopting it the fastest." },
  { tag: "REASON #128", headline: "85% OF US BANKS ARE EITHER PLANNING OR ACTIVELY INTEGRATING BLOCKCHAIN SOLUTIONS INTO THEIR PAYMENT SYSTEMS", body: "The banks aren't fighting Bitcoin anymore. They're building on it. The rails are being laid inside the very institutions that once tried to stop it." },
  { tag: "REASON #129", headline: "NIGERIA LEADS GLOBAL PEER-TO-PEER CRYPTO TRADING WITH 45% OF ALL AFRICAN TRANSACTIONS", body: "In a country where 60% of adults are unbanked, Bitcoin isn't a luxury — it's the banking system. P2P adoption is solving real problems for real people." },
  { tag: "REASON #130", headline: "THE US GOVERNMENT IS THE LARGEST SOVEREIGN HOLDER OF BITCOIN — 207,189 BTC ACQUIRED THROUGH ASSET SEIZURES", body: "The irony is extraordinary. The government that once tried to kill Bitcoin now holds more of it than any other nation on Earth. You can't ban what you hoard." },
  { tag: "REASON #131", headline: "SPOT BITCOIN ETFS NOW HOLD 5.2% OF ALL CIRCULATING BITCOIN — AND THAT PERCENTAGE IS GROWING EVERY MONTH", body: "Wall Street is absorbing supply faster than miners can produce it. When demand is institutional and supply is mathematically fixed, there's only one direction for price." },
  { tag: "REASON #132", headline: "COINBASE NOW SERVES OVER 56 MILLION USERS — MORE ACCOUNTS THAN CHARLES SCHWAB, ONE OF AMERICA'S LARGEST BROKERAGES", body: "A crypto exchange is now bigger than a 50-year-old Wall Street institution. The financial system isn't being disrupted. It's being replaced." },
  { tag: "REASON #133", headline: "21% OF ALL AMERICAN ADULTS NOW OWN CRYPTOCURRENCY — THAT'S MORE THAN OWN INDIVIDUAL STOCKS", body: "Bitcoin has crossed the mainstream threshold in the world's largest economy. One in five Americans. This is no longer early adopter territory." },
  { tag: "REASON #134", headline: "BITCOIN PROCESSES OVER $8 TRILLION IN ANNUAL SETTLEMENT VALUE — MORE THAN PAYPAL, VENMO AND WESTERN UNION COMBINED", body: "It's not a toy, a meme, or a gamble. It's the largest non-bank payment settlement network on Earth. And it runs without a single employee." },
  { tag: "REASON #135", headline: "THERE ARE 56 MILLION MILLIONAIRES ON EARTH BUT ONLY 21 MILLION BITCOIN — EVEN IF NONE WERE LOST, THERE ISN'T ENOUGH", body: "Factor in the estimated 4 million permanently lost coins and the math gets even more extreme. Scarcity isn't a narrative. It's arithmetic." },
  { tag: "REASON #136", headline: "THE CRYPTO MARKET IS PROJECTED TO REACH $7.98 TRILLION BY 2030 — AND BITCOIN DOMINATES WITH 60%+ MARKET SHARE", body: "That implies a Bitcoin market cap of nearly $5 trillion within 4 years. At 21 million coins, that's ~$240K per BTC. And that's a conservative estimate." },
  { tag: "REASON #137", headline: "61% OF CURRENT CRYPTO OWNERS PLAN TO INCREASE THEIR HOLDINGS IN 2026 — CONVICTION IS GROWING, NOT SHRINKING", body: "Bear markets don't destroy belief — they concentrate it. The people who understand Bitcoin are buying more. The people who don't are selling." },
  { tag: "REASON #138", headline: "SOUTH ASIA IS THE FASTEST GROWING REGION FOR CRYPTO — 80% INCREASE IN ADOPTION IN THE FIRST HALF OF 2025", body: "India, Pakistan, Philippines, Vietnam. Billions of people discovering financial sovereignty for the first time. The next billion users won't come from Wall Street." },
  { tag: "REASON #139", headline: "BITCOIN OVER $1.2 TRILLION IN FIAT ON-RAMP VOLUME IN 2025 — 70% MORE THAN ETHEREUM, ITS NEAREST COMPETITOR", body: "When people convert fiat to crypto, they overwhelmingly choose Bitcoin first. It is the gateway, the anchor, and the foundation of the entire ecosystem." },
  { tag: "REASON #140", headline: "VISA AND MASTERCARD NOW SUPPORT DIRECT CRYPTO PAYMENTS IN 43 COUNTRIES", body: "The world's largest payment networks have integrated crypto. They didn't do this because they like Bitcoin. They did it because their customers demanded it." },
  { tag: "REASON #141", headline: "EVERY FIAT CURRENCY IN HISTORY HAS EVENTUALLY GONE TO ZERO. EVERY SINGLE ONE. BITCOIN IS DESIGNED TO DO THE OPPOSITE.", body: "The Roman denarius. The Weimar mark. The Zimbabwe dollar. The Venezuelan bolivar. 100% failure rate over millennia. Bitcoin's monetary policy cannot be changed by any human." },
  { tag: "REASON #142", headline: "A NIGERIAN FARMER AND A SWISS BANKER USE THE SAME NETWORK, THE SAME RULES, AND THE SAME MONEY — FOR THE FIRST TIME IN HISTORY", body: "No other financial system treats all participants equally regardless of nationality, wealth, status, or geography. Bitcoin doesn't know who you are. It only knows math." },
  { tag: "REASON #143", headline: "BITCOIN'S ANNUAL ENERGY CONSUMPTION IS LESS THAN GAMING, LESS THAN CHRISTMAS LIGHTS, LESS THAN GOLD MINING", body: "The 'energy waste' narrative is a lie told by people who benefit from the current system. Bitcoin uses 0.1% of global energy to secure $1.3 trillion of value." },
  { tag: "REASON #144", headline: "THE LIGHTNING NETWORK SETTLED MORE TRANSACTIONS IN 2025 THAN THE ENTIRE BITCOIN NETWORK DID IN ITS FIRST 8 YEARS", body: "Layer 2 scaling is working. Micropayments, instant settlement, near-zero fees. Bitcoin scales in layers, just like the internet did." },
  { tag: "REASON #145", headline: "BITCOIN HAS OUTPERFORMED EVERY ASSET CLASS OVER ANY 4-YEAR ROLLING PERIOD IN ITS ENTIRE HISTORY", body: "Stocks, bonds, real estate, gold, commodities. Pick any 4-year window. Bitcoin wins. Every time. There is no comparable track record in financial history." },
  { tag: "REASON #146", headline: "THE BITCOIN NETWORK IS SECURED BY MORE COMPUTING POWER THAN ALL OF GOOGLE, AMAZON, AND MICROSOFT COMBINED", body: "1,190 exahashes per second. The most powerful computational network ever assembled by humanity, all pointed at one purpose: securing the ledger." },
  { tag: "REASON #147", headline: "YOU CAN RUN A FULL BITCOIN NODE ON A $300 RASPBERRY PI — ANYONE CAN VERIFY THE ENTIRE MONETARY SYSTEM", body: "No other financial system allows any citizen to independently audit the entire ledger. Total transparency. Total verifiability. For $300." },
  { tag: "REASON #148", headline: "SATOSHI NAKAMOTO OWNS ~1 MILLION BTC AND HAS NEVER MOVED A SINGLE COIN IN 15 YEARS", body: "The creator walked away. No spending, no selling, no influence. The most valuable act of restraint in financial history. The protocol belongs to everyone." },
  { tag: "REASON #149", headline: "BLACKROCK'S DIGITAL ASSET DIVISION LAUNCHED 3 TOKENIZED ETF PRODUCTS IN 2025 — ACCESSIBLE TO RETAIL USERS IN 7 COUNTRIES", body: "The world's largest asset manager is not just buying Bitcoin — they're building the infrastructure for everyone else to buy it too." },
  { tag: "REASON #150", headline: "WHEN YOU HOLD BITCOIN, YOU OWN A PIECE OF THE MOST SECURE NETWORK, THE HARDEST MONEY, AND THE MOST ALIGNED COMMUNITY ON EARTH", body: "It's not just an investment. It's a statement. A protest. A savings account. A pension. A transfer system. A philosophy. All in 12 words." },
  { tag: "REASON #151", headline: "BITCOIN GIVES WOMEN IN OPPRESSIVE REGIMES FINANCIAL INDEPENDENCE FOR THE FIRST TIME — NO MALE GUARDIAN REQUIRED", body: "In countries where women cannot open bank accounts without male permission, Bitcoin requires no permission from anyone. Economic freedom is human freedom." },
  { tag: "REASON #152", headline: "THE TOKENIZATION OF REAL WORLD ASSETS HIT $20 BILLION IN EARLY 2026 — A 300% INCREASE FROM 2024", body: "Real estate, bonds, commodities — all being tokenized on blockchain. Bitcoin is the foundation layer of this transformation. The base money of the tokenized future." },
  { tag: "REASON #153", headline: "IN 2025, 26,758 NEW BITCOIN MILLIONAIRES WERE CREATED IN THE FIRST HALF OF THE YEAR ALONE", body: "Even in a volatile market, Bitcoin continues to generate life-changing wealth for those with conviction. The asymmetry of the opportunity remains extraordinary." },
  { tag: "REASON #154", headline: "BITCOIN DOESN'T CARE ABOUT YOUR POLITICS, YOUR RELIGION, YOUR RACE, OR YOUR PASSPORT. IT ONLY CARES ABOUT YOUR KEYS.", body: "The most egalitarian financial system ever designed. No discrimination. No bias. No exclusion. Access for all 8 billion humans, equally." },
  { tag: "REASON #155", headline: "STABLECOINS NOW PROCESS $4+ TRILLION ANNUALLY — AND THEY ALL NEED BLOCKCHAIN INFRASTRUCTURE THAT BITCOIN PIONEERED", body: "Every stablecoin transaction validates the technology Bitcoin invented. The entire crypto ecosystem, including CBDCs, stands on Satoshi's shoulders." },
  { tag: "REASON #156", headline: "GEN Z IS THE FASTEST-ADOPTING DEMOGRAPHIC FOR BITCOIN — THE GENERATION THAT WILL INHERIT THE WORLD IS CHOOSING BTC", body: "They've watched their parents' savings erode to inflation. They've seen banks fail. They don't trust institutions. They trust code. And they're right." },
  { tag: "REASON #157", headline: "BITCOIN'S DIFFICULTY ADJUSTMENT MEANS IT CANNOT BE 'OVERPRODUCED' — THE SUPPLY SCHEDULE IS IMMUNE TO DEMAND PRESSURE", body: "When gold prices rise, miners dig faster and increase supply. When Bitcoin prices rise, the network gets more secure — but supply stays exactly the same." },
  { tag: "REASON #158", headline: "UKRAINE RECEIVED OVER $100 MILLION IN BITCOIN DONATIONS IN THE FIRST WEEKS OF THE 2022 INVASION — FASTER THAN ANY GOVERNMENT AID", body: "When the banking system was disrupted by war, Bitcoin worked. Borderless, instant, uncensorable donations reached those in need within minutes." },
  { tag: "REASON #159", headline: "THERE IS NO 'BITCOIN COMPANY' THAT CAN GO BANKRUPT, NO CEO WHO CAN COMMIT FRAUD, NO BOARD THAT CAN MAKE BAD DECISIONS", body: "Every other financial system has a human point of failure. Bitcoin's monetary policy is enforced by consensus, not by people. Code doesn't lie. Code doesn't steal." },
  { tag: "REASON #160", headline: "BITCOIN'S MARKET CAP WENT FROM $0 TO $1.3 TRILLION WITH ZERO MARKETING BUDGET, ZERO EMPLOYEES, AND ZERO HEADQUARTERS", body: "No advertising. No sales team. No office. No PR department. Pure organic adoption driven by the strength of the idea alone. Nothing else in history has done this." },
  { tag: "REASON #161", headline: "35% OF EL SALVADOR'S ENTIRE POPULATION NOW USES CRYPTO WALLETS — HIGHER THAN TRADITIONAL BANKING PENETRATION WAS BEFORE BITCOIN", body: "Bitcoin didn't just compete with the banking system in El Salvador. It leapfrogged it entirely. Financial inclusion delivered by technology, not charity." },
  { tag: "REASON #162", headline: "AFRICA IS SEEING A 60% SURGE IN BLOCKCHAIN ADOPTION — DRIVEN BY THE NEED FOR AFFORDABLE REMITTANCES", body: "African workers send $95 billion home annually, losing 8-12% to fees. Bitcoin reduces that to near zero. The savings go directly to families who need it most." },
  { tag: "REASON #163", headline: "EVERY 10 MINUTES, BITCOIN SETTLES TRANSACTIONS WORTH MORE THAN THE GDP OF SOME SMALL NATIONS", body: "A network with no CEO, no office, and no employees processes more value per hour than entire economies produce in a year. That is the power of decentralization." },
  { tag: "REASON #164", headline: "YOUR BANK CAN FREEZE YOUR ACCOUNT. YOUR GOVERNMENT CAN SEIZE YOUR PROPERTY. NO ONE CAN TOUCH YOUR BITCOIN.", body: "In Canada, during the trucker protests, bank accounts were frozen without trial. In China, accounts are frozen for political speech. Bitcoin is immune to all of this." },
  { tag: "REASON #165", headline: "BITCOIN IS THE ONLY ASSET WHERE EVERY HOLDER'S INCENTIVES ARE PERFECTLY ALIGNED — MY SUCCESS IS YOUR SUCCESS", body: "In stocks, insiders dump on retail. In real estate, your gain is your neighbour's loss. In Bitcoin, every holder benefits from every other holder's conviction." },
  { tag: "REASON #166", headline: "THE INTERNET GAVE US FREEDOM OF INFORMATION. BITCOIN GIVES US FREEDOM OF VALUE. THE REVOLUTION ISN'T COMING — IT'S HERE.", body: "Email disrupted postal services. Streaming disrupted media. Bitcoin disrupts money itself. The most fundamental layer of human coordination." },
  { tag: "REASON #167", headline: "BITCOIN MINING IS TURNING LANDFILL METHANE INTO REVENUE AND REDUCING GREENHOUSE GAS EMISSIONS SIMULTANEOUSLY", body: "Landfills emit methane 80x more harmful than CO2. Bitcoin miners capture it, burn it for energy, reduce emissions, and get paid. Environmental good + profit." },
  { tag: "REASON #168", headline: "US SPOT BITCOIN ETFS ATTRACTED $15 BILLION IN NET INFLOWS IN THE FIRST HALF OF 2025 — INSTITUTIONAL DEMAND IS RELENTLESS", body: "This isn't retail speculation. These are pension funds, endowments, family offices, and sovereign wealth. The biggest pools of capital on Earth are entering." },
  { tag: "REASON #169", headline: "OVER 200 MILLION BITCOIN WALLETS HAVE BEEN CREATED — MORE THAN THE POPULATION OF BRAZIL", body: "Each wallet represents a person, a family, a business that chose to opt into a new financial system. Voluntarily. Without anyone's permission." },
  { tag: "REASON #170", headline: "BITCOIN HAS SURVIVED EVERY 'BITCOIN IS DEAD' HEADLINE — OVER 470 OBITUARIES AND COUNTING", body: "Declared dead by mainstream media 470+ times. Each time it came back stronger. The most resilient idea in the history of technology and finance." },
  { tag: "REASON #171", headline: "THERE ARE NOW 28 CRYPTO BILLIONAIRES AND 172,300 CRYPTO MILLIONAIRES GLOBALLY — A 95% INCREASE IN ONE YEAR", body: "Bitcoin isn't just preserving wealth — it's creating it. A new generation of financially sovereign individuals, built entirely on conviction and patience." },
  { tag: "REASON #172", headline: "BITCOIN WORKS EVEN WITHOUT THE INTERNET — BLOCKSTREAM SATELLITES BROADCAST THE BLOCKCHAIN FOR FREE, GLOBALLY, 24/7", body: "Even if the internet went down in your entire country, you could still receive and verify Bitcoin transactions via satellite. The network is designed to survive anything." },
  { tag: "REASON #173", headline: "THE UAE, SINGAPORE, AND SWITZERLAND ARE COMPETING TO BE THE WORLD'S CRYPTO HUB — CREATING A RACE TO ATTRACT BITCOIN WEALTH", body: "Jurisdictional competition is a one-way ratchet. Once one country offers 0% crypto tax, others must follow or lose their wealthiest citizens. Game theory in action." },
  { tag: "REASON #174", headline: "IN VENEZUELA, BITCOIN ISN'T AN INVESTMENT — IT'S HOW PEOPLE EAT. WHEN CURRENCY COLLAPSES, BTC BECOMES A LIFELINE.", body: "Hyperinflation destroyed the bolivar. Bitcoin let Venezuelans store value, receive remittances, and buy food. This isn't theory. This is survival." },
  { tag: "REASON #175", headline: "BITCOIN IS THE ONLY TECHNOLOGY THAT GETS MORE SECURE AS IT GETS MORE VALUABLE — SECURITY AND PRICE ARE DIRECTLY LINKED", body: "Higher price = more mining revenue = more hash rate = more security. A virtuous cycle unlike any other system. The bigger it gets, the harder it is to attack." },
  { tag: "REASON #176", headline: "OVER 1.4 BILLION ADULTS WORLDWIDE HAVE NO BANK ACCOUNT — BITCOIN ONLY REQUIRES A PHONE TO PROVIDE FULL FINANCIAL SERVICES", body: "No branch visits. No credit checks. No paperwork. No minimum balances. A $50 smartphone and an internet connection. That's the barrier to entry. It's almost nothing." },
  { tag: "REASON #177", headline: "THE FIRST EMAIL WAS SENT IN 1971 AND TOOK DECADES TO REACH MAINSTREAM. BITCOIN WAS BORN IN 2009 AND ALREADY HAS 560M USERS.", body: "Technology adoption is accelerating. What took the internet 20 years, Bitcoin is doing in 15. And we're still in the early majority phase of the S-curve." },
  { tag: "REASON #178", headline: "BITCOIN'S CODE HAS BEEN REVIEWED BY MORE PEOPLE THAN ANY SOFTWARE IN HISTORY — THOUSANDS OF DEVELOPERS, ZERO FATAL BUGS", body: "Open source means everyone can audit it. And everyone has. Governments, corporations, universities, hackers. All have looked. None have found a way to break it." },
  { tag: "REASON #179", headline: "WHEN THE BANKING SYSTEM FAILED IN GREECE IN 2015, CITIZENS WERE LIMITED TO €60/DAY FROM ATMS — BITCOIN USERS HAD NO LIMITS", body: "Capital controls happen in developed nations too. Your money in a bank isn't your money. It's the bank's money with a promise to give it back. Sometimes they don't." },
  { tag: "REASON #180", headline: "BITCOIN IS THE FIRST TECHNOLOGY THAT MAKES IT CHEAPER TO VERIFY THAN TO FALSIFY", body: "In every previous system, creating fake money was easier than detecting it. Bitcoin inverts this. Verifying a transaction costs almost nothing. Faking one costs everything." },
  { tag: "REASON #181", headline: "THE WORLD'S REMITTANCE MARKET IS $800 BILLION — MIGRANTS LOSE $48 BILLION TO FEES. BITCOIN REDUCES THAT TO NEAR ZERO.", body: "A Filipino worker in Dubai sending money home loses 8-12% to Western Union. Bitcoin Lightning: virtually free, instant, 24/7. That's $48B back in the pockets of families." },
  { tag: "REASON #182", headline: "BITCOIN ENFORCES PROPERTY RIGHTS THROUGH MATHEMATICS — NOT THROUGH COURTS, POLICE, OR GOVERNMENTS THAT CAN BE CORRUPTED", body: "In most of the world, property rights are only as strong as the institutions defending them. Bitcoin's property rights are defended by physics. They cannot be corrupted." },
  { tag: "REASON #183", headline: "THE HALVINGS ARE THE MOST PREDICTABLE SUPPLY SHOCKS IN ANY MARKET — AND THE MARKET STILL UNDERPRICES THEM EVERY TIME", body: "2012, 2016, 2020, 2024 — every halving preceded a massive price increase. The next is 2028. The supply shock is calculable. The opportunity is mathematical." },
  { tag: "REASON #184", headline: "BITCOIN COULD BECOME THE SETTLEMENT LAYER FOR ALL GLOBAL TRADE — NEUTRAL, BORDERLESS, AND TRUSTED BY ALL PARTIES", body: "No country trusts another's currency for settlement. But both parties can trust mathematics. Bitcoin is the neutral settlement layer the world has been waiting for." },
  { tag: "REASON #185", headline: "IF JUST 1% OF GLOBAL BOND MARKET CAPITAL MOVES TO BITCOIN, THAT'S $1.3 TRILLION IN NEW DEMAND — ROUGHLY EQUAL TO ITS ENTIRE CURRENT MARKET CAP", body: "The bond market is $130 trillion. A 1% rotation is a 100% increase in Bitcoin's market cap. And bonds are yielding less than inflation. The incentive is there." },
  { tag: "REASON #186", headline: "BITCOIN MINING HAS CREATED ECONOMIC OPPORTUNITY IN SOME OF THE POOREST AND MOST REMOTE COMMUNITIES ON EARTH", body: "From rural Texas to Congo to Paraguay to Iceland — communities with stranded energy now have a global buyer. Bitcoin turns geographic disadvantage into economic advantage." },
  { tag: "REASON #187", headline: "EVERY PERSON BORN TODAY ENTERS A WORLD WHERE THEY OWE $30,000+ IN NATIONAL DEBT THEY NEVER AGREED TO", body: "Governments spend. Citizens pay. Across generations. Without consent. Bitcoin is the first opt-out. A monetary system where no one can spend your future without your permission." },
  { tag: "REASON #188", headline: "THE BITCOIN PROTOCOL HAS BEEN RUNNING CONTINUOUSLY SINCE BLOCK #0 ON JANUARY 3, 2009 — THE LONGEST UNINTERRUPTED FINANCIAL SYSTEM IN THE DIGITAL AGE", body: "No maintenance. No downtime. No patches that required stopping. The genesis block is still part of the living chain. 15+ years of unbroken operation." },
  { tag: "REASON #189", headline: "IN 2009, ONE BITCOIN WAS WORTH LESS THAN A PENNY. TODAY IT SECURES A $1.3 TRILLION NETWORK. THE JOURNEY IS FAR FROM OVER.", body: "From cypherpunk experiment to global financial infrastructure in 15 years. The adoption curve isn't flattening. It's steepening. And you're still early." },
  { tag: "REASON #190", headline: "BITCOIN ALIGNS THE INCENTIVES OF SAVERS AND INVESTORS FOR THE FIRST TIME — WHAT'S GOOD FOR YOU IS GOOD FOR ME", body: "Inflation punishes savers to benefit borrowers. Bitcoin rewards savers equally. No insider advantage. No front-running. The most fair financial system ever created." },
  { tag: "REASON #191", headline: "MORE PEOPLE OWN CRYPTO THAN USE TWITTER, NETFLIX, OR SPOTIFY — BITCOIN IS ALREADY A MAINSTREAM TECHNOLOGY", body: "560 million crypto users vs. 368 million Twitter users, 260 million Netflix subscribers, 220 million Spotify users. The adoption battle is already won." },
  { tag: "REASON #192", headline: "GOLD TOOK 5,000 YEARS TO REACH $16 TRILLION IN MARKET CAP. BITCOIN REACHED $1.3 TRILLION IN 15 YEARS.", body: "At the current rate of adoption, Bitcoin doesn't need centuries. It needs decades. And the trajectory is accelerating, not slowing." },
  { tag: "REASON #193", headline: "BITCOIN TRANSACTIONS ARE PSEUDONYMOUS — YOU DON'T NEED TO REVEAL YOUR IDENTITY TO PARTICIPATE IN THE FINANCIAL SYSTEM", body: "Privacy isn't a crime. It's a right. Bitcoin lets you transact without surrendering your personal data to corporations and governments who monetize or surveil it." },
  { tag: "REASON #194", headline: "THE BITCOIN NETWORK CANNOT BE SHUT DOWN WITHOUT SIMULTANEOUSLY SHUTTING DOWN THE ENTIRE GLOBAL INTERNET", body: "And even then it would survive via satellite, radio, and mesh networks. There is no kill switch. There is no off button. The network is everywhere and nowhere." },
  { tag: "REASON #195", headline: "BITCOIN IS THE GREATEST TRANSFER OF WEALTH FROM THE IMPATIENT TO THE PATIENT IN HUMAN HISTORY", body: "Every crash shakes out the speculators and transfers their coins to the convicted. Time preference is the only filter that matters. Low time preference wins." },
  { tag: "REASON #196", headline: "CENTRAL BANKS PRINTED $25 TRILLION BETWEEN 2020 AND 2025. BITCOIN PRINTED EXACTLY WHAT ITS CODE SAID IT WOULD.", body: "One system makes up the rules as it goes. The other followed the same rules since day one. Predictability isn't boring. It's the foundation of trust." },
  { tag: "REASON #197", headline: "BITCOIN GIVES EVERY HUMAN BEING THE ABILITY TO SAVE IN AN ASSET THAT CANNOT BE DEBASED — FOR THE FIRST TIME IN HISTORY", body: "For 5,000 years, rulers have debased money. Gold was clipped. Coins were diluted. Currency was printed. Bitcoin ends this cycle. Permanently." },
  { tag: "REASON #198", headline: "THE MOST SUCCESSFUL INVESTORS OF OUR TIME — DRUCKENMILLER, TUDOR JONES, DALIO, FINK — ALL HOLD OR RECOMMEND BITCOIN", body: "This isn't a retail fad. The greatest investors alive have done their research and allocated capital. Follow the money. Follow the conviction." },
  { tag: "REASON #199", headline: "BITCOIN IS HOPE. FOR THE UNBANKED, THE OPPRESSED, THE INFLATED, AND THE FORGOTTEN. HOPE ENCODED IN MATHEMATICS.", body: "It's not just technology. It's not just money. It's the first system that gives every human being on Earth equal access to financial freedom. And no one can take it away." },
  { tag: "REASON #200", headline: "THE QUESTION ISN'T 'WHY BITCOIN?' THE QUESTION IS 'WHY NOT?' — AND NOBODY HAS EVER HAD A GOOD ANSWER.", body: "Every objection has been answered. Every attack has failed. Every obituary has been wrong. 15 years. $1.3 trillion. 560 million users. Zero downtime. The case is closed." },
  { tag: "REASON #201", headline: "TURKEY'S CRYPTO EXCHANGE PARIBU IS A TOP 5 FINANCE APP WITH 7.6 MILLION USERS — IN A COUNTRY WITH 83% INFLATION", body: "When your government destroys your currency, you find an alternative. 25.6% of Turkey's internet population now holds crypto. Necessity is the mother of adoption." },
  { tag: "REASON #202", headline: "BITCOIN IS THE ONLY ASSET THAT CAN BE SELF-CUSTODIED, INSTANTLY VERIFIED, AND GLOBALLY TRANSFERRED — ALL AT ONCE", body: "Gold can be self-custodied but not transferred digitally. Stocks can be transferred but not self-custodied. Cash can be held but not verified. Bitcoin does all three." },
  { tag: "REASON #203", headline: "THE BITCOIN WHITEPAPER HAS BEEN TRANSLATED INTO OVER 40 LANGUAGES — THE IDEA BELONGS TO EVERYONE", body: "No copyright. No patent. No intellectual property restrictions. Anyone can read it, build on it, improve it. The most important open-source document since Wikipedia." },
  { tag: "REASON #204", headline: "EVERY FOUR YEARS, THE BITCOIN COMMUNITY PROVES THAT A DECENTRALIZED NETWORK CAN COORDINATE WITHOUT A LEADER", body: "Halvings, soft forks, protocol upgrades — all achieved through voluntary consensus. No CEO. No vote. No coercion. Just aligned incentives and rough consensus." },
  { tag: "REASON #205", headline: "IN KENYA, 5.9 MILLION CITIZENS USE BITCOIN-ENABLED WALLETS — PRIMARILY FOR REMITTANCES AND MICROTRANSACTIONS", body: "Not for speculation. For survival. For sending money to family. For buying goods. Bitcoin in Africa is the most practical, least speculative adoption on Earth." },
  { tag: "REASON #206", headline: "THE BITCOIN NETWORK SETTLES IN MINUTES WHAT TAKES THE TRADITIONAL BANKING SYSTEM DAYS — WITH NO BUSINESS HOURS", body: "SWIFT takes 3-5 days. ACH takes 2-3 days. Both require banks to be open. Bitcoin settles final in ~10 minutes. Saturday at 2am. Christmas Day. Always." },
  { tag: "REASON #207", headline: "PUBLIC COMPANIES IN THE US COLLECTIVELY HOLD 688,000 BITCOIN — THAT'S 3.3% OF ALL SUPPLY LOCKED IN CORPORATE TREASURIES", body: "Strategy, Marathon, Riot, Tesla, Block, and dozens more. Bitcoin is becoming standard corporate treasury practice. This supply will never hit the open market." },
  { tag: "REASON #208", headline: "BITCOIN DOESN'T NEED YOU TO BELIEVE IN IT. IT WORKS WHETHER YOU BELIEVE IN IT OR NOT. JUST LIKE GRAVITY.", body: "The protocol doesn't care about sentiment, opinion, or narrative. Blocks are mined. Transactions settle. Supply decreases. The math doesn't negotiate." },
  { tag: "REASON #209", headline: "IN BRAZIL, 92,000 CRYPTO-ENABLED POINT-OF-SALE TERMINALS WERE INSTALLED IN 2025 — A 22.7% INCREASE IN ONE YEAR", body: "The 9th largest economy in the world is building Bitcoin payment infrastructure at the merchant level. This isn't top-down adoption. It's bottom-up demand." },
  { tag: "REASON #210", headline: "BITCOIN HAS CREATED MORE MILLIONAIRES PER UNIT OF TIME THAN ANY ASSET IN HISTORY — AND THE OPPORTUNITY ISN'T OVER", body: "There are still only 1 million wallets holding a full Bitcoin. Global adoption is at ~10%. The S-curve hasn't peaked. The best asymmetric bet in the world is still open." },
  { tag: "REASON #211", headline: "WHEN YOU UNDERSTAND BITCOIN, YOU DON'T NEED CONVINCING. WHEN YOU DON'T UNDERSTAND IT, NO AMOUNT OF CONVINCING WORKS.", body: "The orange pill isn't a sales pitch. It's an invitation to learn. Every Bitcoiner started as a skeptic. The journey from doubt to conviction is always the same." },
  { tag: "REASON #212", headline: "83% OF CURRENT CRYPTO OWNERS EXPECT THE MARKET TO GROW — THE PEOPLE CLOSEST TO THE TECHNOLOGY ARE THE MOST BULLISH", body: "Only 3% expect a decline. The more you understand Bitcoin, the more bullish you become. That's not delusion — that's education." },
  { tag: "REASON #213", headline: "BITCOIN GIVES EVERY PERSON ON EARTH A SWISS BANK ACCOUNT IN THEIR POCKET — BUT BETTER, BECAUSE NO ONE CAN FREEZE IT", body: "Switzerland built its reputation on financial privacy and security. Bitcoin offers the same properties — but without borders, without gatekeepers, and without $500K minimums." },
  { tag: "REASON #214", headline: "THERE WILL COME A DAY WHEN PEOPLE LOOK BACK AND SAY 'I CAN'T BELIEVE BITCOIN WAS AVAILABLE FOR UNDER $100,000'", body: "They said it at $1. At $100. At $1,000. At $10,000. At $60,000. Every level felt expensive at the time. Every level now looks like a gift." },
  { tag: "REASON #215", headline: "BITCOIN ISN'T JUST AN INVESTMENT. IT'S A SAVINGS TECHNOLOGY. THE DIFFERENCE IS EVERYTHING.", body: "Investments can fail. Technologies that solve fundamental problems persist. The telephone didn't fail. The internet didn't fail. Bitcoin solves money. It won't fail." },
  { tag: "REASON #216", headline: "59% OF PEOPLE PLANNING TO BUY CRYPTO IN 2026 PLAN TO BUY BITCOIN — IT REMAINS THE OVERWHELMINGLY PREFERRED ENTRY POINT", body: "Not altcoins. Not memecoins. Bitcoin. When new capital enters the ecosystem, it enters through BTC. The gravitational centre of the entire crypto universe." },
  { tag: "REASON #217", headline: "THE AVERAGE BITCOIN TRANSACTION USES LESS ENERGY THAN A GOOGLE SEARCH WHEN AMORTIZED ACROSS THE NETWORK'S TOTAL VALUE SECURED", body: "Per dollar of value secured, Bitcoin is extraordinarily energy-efficient. The narrative that it 'wastes' energy ignores the $1.3 trillion of value it protects." },
  { tag: "REASON #218", headline: "BITCOIN IS THE GREATEST PEACEFUL REVOLUTION IN HUMAN HISTORY — NO VIOLENCE, NO COERCION, JUST OPT-IN MATHEMATICS", body: "Every other monetary revolution required war, bloodshed, or political upheaval. Bitcoin asks for nothing except your voluntary participation. And 560 million have said yes." },
  { tag: "REASON #219", headline: "YOU DON'T NEED TO BUY A WHOLE BITCOIN. 10,000 SATOSHIS COSTS ABOUT $7. EVERYONE CAN START.", body: "The 'Bitcoin is too expensive' myth dies when you understand divisibility. You don't buy a whole gold bar either. Start small. Stack consistently. Time does the rest." },
  { tag: "REASON #220", headline: "BITCOIN IS THE EXIT. FROM INFLATION. FROM SURVEILLANCE. FROM CONTROL. FROM A SYSTEM THAT WASN'T BUILT FOR YOU.", body: "You don't have to fight the system. You don't have to protest. You just have to leave. Bitcoin is the door. And it's open to everyone." },
  { tag: "REASON #221", headline: "BY 2030 THERE WILL BE BILLIONS OF AI AGENTS OPERATING AUTONOMOUSLY — EVERY ONE OF THEM WILL NEED A WALLET. BITCOIN IS THE ONLY ANSWER.", body: "AI agents can't open bank accounts. They can't sign contracts. They can't wait 3 business days for a wire. They need programmable, permissionless, instant money. That's Bitcoin." },
  { tag: "REASON #222", headline: "MACHINES WILL TRADE WITH MACHINES. ROBOTS WILL PAY ROBOTS. THE ECONOMY OF THE FUTURE RUNS ON MACHINE-READABLE MONEY.", body: "When your self-driving car pays a toll, your robot orders parts, or your AI assistant subscribes to a service — they won't use a credit card. They'll use satoshis." },
  { tag: "REASON #223", headline: "AI CAN GENERATE INFINITE CONTENT, INFINITE CODE, INFINITE FAKES — BITCOIN IS ONE OF THE FEW THINGS AI CANNOT COUNTERFEIT", body: "In a world where everything digital can be faked, proof-of-work is proof of reality. Bitcoin is the unforgeable anchor in an age of synthetic everything." },
  { tag: "REASON #224", headline: "SPACEX IS BUILDING A MULTI-PLANETARY CIVILISATION — A MARS COLONY CANNOT USE EARTH'S BANKING SYSTEM WITH 22-MINUTE SIGNAL DELAYS", body: "You can't call your bank on Mars. SWIFT doesn't work at lightspeed delay. But Bitcoin's protocol doesn't care about distance. It only cares about blocks." },
  { tag: "REASON #225", headline: "STARLINK IS BRINGING INTERNET TO EVERY CORNER OF EARTH — AND WITH IT, BITCOIN ACCESS TO THE 1.4 BILLION STILL UNBANKED", body: "Satellite internet + Bitcoin = financial inclusion for every human with a phone. No bank branch needed. No government permission needed. Just a signal from space." },
  { tag: "REASON #226", headline: "THE MACHINE-TO-MACHINE ECONOMY IS PROJECTED TO BE WORTH $15 TRILLION BY 2030 — AND IT NEEDS A NATIVE CURRENCY", body: "IoT devices, autonomous vehicles, smart grids, robotic supply chains. Trillions of microtransactions per day between machines. Only Bitcoin Lightning can handle this at scale." },
  { tag: "REASON #227", headline: "HUMANOID ROBOTS WILL ENTER THE WORKFORCE THIS DECADE — THEY WILL NEED TO EARN, SAVE, AND SPEND. BITCOIN IS THEIR MONEY.", body: "Tesla Optimus, Figure, Boston Dynamics. When robots do labour, who holds their earnings? They can't have bank accounts. They need self-custodied digital bearer assets." },
  { tag: "REASON #228", headline: "AI + BITCOIN CREATES THE FIRST AUTONOMOUS ECONOMIC AGENTS — SOFTWARE THAT CAN OWN ASSETS, PAY FOR SERVICES, AND EARN REVENUE", body: "For the first time in history, non-human entities can be economically sovereign. AI agents with Bitcoin wallets can operate businesses without any human involvement." },
  { tag: "REASON #229", headline: "QUANTUM COMPUTING THREATENS TRADITIONAL ENCRYPTION — BUT BITCOIN'S CRYPTOGRAPHY CAN BE UPGRADED. THE PROTOCOL IS DESIGNED TO EVOLVE.", body: "Bitcoin uses SHA-256 and ECDSA today. If quantum computing advances, the network can soft-fork to quantum-resistant algorithms. The threat is anticipated. The solution is planned." },
  { tag: "REASON #230", headline: "IN THE AGE OF DEEPFAKES, SYNTHETIC MEDIA, AND AI-GENERATED REALITY, BITCOIN'S BLOCKCHAIN IS AN IMMUTABLE RECORD OF TRUTH", body: "When you can no longer trust your eyes or ears, you can still trust the ledger. Timestamped, cryptographically sealed, impossible to alter. Truth in a post-truth world." },
  { tag: "REASON #231", headline: "ASTEROID MINING COULD FLOOD EARTH WITH GOLD AND RARE METALS — DESTROYING THEIR SCARCITY. BITCOIN'S SCARCITY IS IMMUNE TO SPACE RESOURCES.", body: "NASA estimates asteroid 16 Psyche contains $10 quintillion in metals. When space mining makes gold abundant, only Bitcoin's mathematically enforced cap holds. 21 million. Forever." },
  { tag: "REASON #232", headline: "AUTONOMOUS DRONES DELIVERING PACKAGES WILL NEED TO PAY FOR AIRSPACE, CHARGING, AND MAINTENANCE — IN REAL TIME, WITH NO HUMAN.", body: "Amazon and Wing drones don't queue at banks. They need micropayment rails that settle instantly between machines. Lightning Network was built for exactly this." },
  { tag: "REASON #233", headline: "SMART GRIDS AND ENERGY MARKETS ARE MOVING TO REAL-TIME, PEER-TO-PEER SETTLEMENT — YOUR SOLAR PANEL WILL SELL EXCESS ENERGY FOR SATS", body: "Your home produces solar energy. Your neighbour's EV needs charging. Bitcoin enables direct, automated, instant settlement between the two. No utility company in the middle." },
  { tag: "REASON #234", headline: "3D PRINTING IS DECENTRALISING MANUFACTURING — BITCOIN IS DECENTRALISING MONEY. TOGETHER THEY CREATE A TRULY PEER-TO-PEER ECONOMY.", body: "Design a product anywhere. Print it anywhere. Pay for it with Bitcoin. No factories, no banks, no borders. The entire supply chain — from idea to payment — decentralised." },
  { tag: "REASON #235", headline: "SELF-DRIVING CARS WILL EARN MONEY AS ROBOTAXIS, PAY FOR FUEL, INSURANCE, AND TOLLS — ALL AUTONOMOUSLY, ALL IN BITCOIN", body: "A Tesla with no human driver earns revenue, pays its own costs, and accumulates savings. The car is its own economic agent. It needs money that doesn't require a human signer." },
  { tag: "REASON #236", headline: "AI DATA MARKETS WILL NEED TRUSTLESS PAYMENT SYSTEMS — MODELS WILL PAY FOR TRAINING DATA IN SATOSHIS, MICROPAYMENT BY MICROPAYMENT", body: "AI needs data. Data owners need compensation. Bitcoin Lightning enables pay-per-query, pay-per-token, pay-per-byte. Micropayments at a scale that credit cards cannot touch." },
  { tag: "REASON #237", headline: "THE METAVERSE, VIRTUAL WORLDS, AND DIGITAL ECONOMIES ALL NEED A NATIVE, BORDERLESS, UNCENSORABLE CURRENCY — BITCOIN WINS BY DEFAULT", body: "Virtual worlds don't respect national borders. Their economies can't run on dollars or euros. They need money that is as native to the internet as they are. That's Bitcoin." },
  { tag: "REASON #238", headline: "BRAIN-COMPUTER INTERFACES WILL LET YOU SEND BITCOIN WITH A THOUGHT — THE ULTIMATE FRICTIONLESS PAYMENT", body: "Neuralink and others are building direct neural interfaces. When thought-to-action latency approaches zero, Bitcoin becomes the first money you can spend at the speed of thought." },
  { tag: "REASON #284", headline: "EVERY MAJOR TECHNOLOGICAL REVOLUTION HAS REQUIRED A NEW FORM OF MONEY — AGRICULTURE GOT COINS. INDUSTRY GOT BANKS. THE DIGITAL AGE GETS BITCOIN.", body: "Money evolves with civilisation. Shells, metals, paper, digits. Each era demands money native to its technology. AI, space, and robotics demand money native to the internet. Bitcoin." },
  { tag: "REASON #304", headline: "THE CONVERGENCE OF AI, ROBOTICS, SPACE, AND BITCOIN ISN'T SCIENCE FICTION — IT'S THE NEXT 10 YEARS. AND BITCOIN IS THE ECONOMIC FOUNDATION FOR ALL OF IT.", body: "Every emerging technology needs a settlement layer. Permissionless. Borderless. Instant. Trustless. Scarce. There is only one candidate. There has only ever been one." },
];

POSTS.forEach((p, i) => { p.scheme = i % 4; });

const YEARLY_LOWS = [
  { y: "2012", v: 4 },{ y: "2013", v: 65 },{ y: "2014", v: 275 },{ y: "2015", v: 172 },
  { y: "2016", v: 365 },{ y: "2017", v: 780 },{ y: "2018", v: 3200 },{ y: "2019", v: 3400 },
  { y: "2020", v: 3850 },{ y: "2021", v: 28700 },{ y: "2022", v: 15480 },{ y: "2023", v: 16500 },
  { y: "2024", v: 38500 },{ y: "2025", v: 74522 },{ y: "2026", v: 60062, current: true },
];

const LINKS = [
  { label: "Power Law", url: "https://charts.bitbo.io/long-term-power-law/", icon: "📈" },
  { label: "Realized Price", url: "https://charts.bitbo.io/realized-price/", icon: "💰" },
  { label: "On-Chain", url: "https://charts.checkonchain.com/", icon: "⛓" },
  { label: "CryptoQuant", url: "https://cryptoquant.com/asset/btc/chart/market-indicator", icon: "📊" },
  { label: "Yearly Lows", url: "https://www.bitcoinmagazinepro.com/charts/bitcoin-yearly-lows/", icon: "📉" },
  { label: "Porkopolis", url: "https://www.porkopolis.io/thechart/", icon: "🐷" },
];

const FUNDAMENTALS = [
  {
    title: "ENERGY MONETIZATION",
    subtitle: "Capture. Transfer. Store.",
    body: "Bitcoin converts stranded energy — flared gas, remote hydro, volcanic geothermal, excess solar — into transferable value. A shipping container of miners and a satellite link. That's the entire infrastructure needed to monetize energy anywhere on Earth.",
    icon: "⚡",
  },
  {
    title: "ENERGY TELEPORTATION",
    subtitle: "Move value at the speed of light.",
    body: "Once energy is encoded as BTC, it can be transmitted anywhere on the planet in minutes. No wires, no pipelines, no shipping routes, no intermediaries. You are teleporting stored energy value from a volcano in El Salvador to a buyer in Tokyo.",
    icon: "🌍",
  },
  {
    title: "INCORRUPTIBLE STORAGE",
    subtitle: "Energy that doesn't leak, expire, or decay.",
    body: "Unlike batteries that degrade, BTC holds energy value indefinitely. It doesn't corrode, evaporate, or lose charge. The energy you captured today is retrievable in 50 years with zero loss. The hardest money ever created.",
    icon: "🔋",
  },
  {
    title: "UNHACKABLE & SECURE",
    subtitle: "15 years. Zero breaches. $1.3T bounty.",
    body: "Every nation-state, every hacker collective, every intelligence agency has had 15 years and a multi-trillion dollar incentive to break Bitcoin. None have succeeded. The protocol is secured by mathematics, not institutions.",
    icon: "🔒",
  },
  {
    title: "PEER TO PEER",
    subtitle: "No middlemen. No permission. No delay.",
    body: "Two people, anywhere on Earth, can exchange value directly — no bank, no payment processor, no government approval. Settlement in minutes, not days. 24/7/365. The first truly peer-to-peer monetary system.",
    icon: "🤝",
  },
  {
    title: "PROPERTY RIGHTS FOR 8 BILLION",
    subtitle: "No minimum balance. No application. No denial.",
    body: "1.4 billion adults have no bank account. Bitcoin requires only a phone. No credit check, no ID, no minimum deposit, no account fees. True financial inclusion — not as charity, but as a fundamental right enforced by code.",
    icon: "🏛",
  },
  {
    title: "UNSEIZABLE",
    subtitle: "12 words. Infinite sovereignty.",
    body: "No government, no court, no army can confiscate Bitcoin held in self-custody. 12 words in your head and you cross any border with your entire wealth intact. No other asset in human history has offered this property.",
    icon: "🛡",
  },
  {
    title: "LARGEST DECENTRALISED NETWORK",
    subtitle: "Mission-aligned. Globally coordinated. Unstoppable.",
    body: "Hundreds of thousands of nodes across every continent, secured by more computing power than any system ever built. All participants — miners, developers, holders — are aligned by the same incentive: protect the network.",
    icon: "🌐",
  },
  {
    title: "OPEN SOURCE ALIGNMENT",
    subtitle: "My win is your win. Your win is my win.",
    body: "Bitcoin is the only asset where all holders benefit from every other holder's success. A collaborative, open-source marketplace where even competitors are allies. Aligned capital — the more people who hold it, the stronger it gets for everyone.",
    icon: "🤲",
  },
  {
    title: "PERFECTLY DIVISIBLE",
    subtitle: "100,000,000 satoshis per Bitcoin.",
    body: "Each Bitcoin splits into 100 million units. You can buy $1 worth or $1 billion worth. No other hard asset offers this granularity. Gold can't be shaved to the microgram. Cash stops at the penny. Bitcoin goes 6 orders of magnitude deeper.",
    icon: "🔬",
  },
  {
    title: "INSTANTLY VERIFIABLE",
    subtitle: "Trust no one. Verify everything.",
    body: "Any person can run a node and independently verify every transaction in Bitcoin's entire history. No auditor needed. No trust required. The ledger is open, immutable, and transparent to all 8 billion people on Earth.",
    icon: "✓",
  },
  {
    title: "ABSOLUTELY SCARCE",
    subtitle: "21,000,000. Forever. No exceptions.",
    body: "No CEO can issue more. No government can inflate it. No emergency can change the cap. For the first time in human history, we have an asset with mathematically enforced absolute scarcity. Not even gold can claim this.",
    icon: "💎",
  },
  {
    title: "CENSORSHIP RESISTANT",
    subtitle: "No transaction can be blocked or reversed.",
    body: "No entity can prevent you from sending or receiving Bitcoin. No freeze orders, no sanctions lists, no bank holidays. If you have an internet connection — or even a radio — you can transact. Financial free speech.",
    icon: "📡",
  },
  {
    title: "BORDERLESS",
    subtitle: "One network. Every nation. Zero friction.",
    body: "Bitcoin doesn't recognise borders, jurisdictions, or time zones. A farmer in Nigeria and a fund manager in Zurich use the same network, the same rules, the same money. No exchange rates. No correspondent banks. No delay.",
    icon: "✈",
  },
  {
    title: "IMMUTABLE",
    subtitle: "What is written cannot be unwritten.",
    body: "Every transaction ever made is permanently recorded. No government can rewrite history. No corporation can alter the books. The ledger is final, transparent, and eternal. Truth encoded in mathematics.",
    icon: "📜",
  },
  {
    title: "PERMISSIONLESS",
    subtitle: "No gatekeeper. No application. No approval.",
    body: "Anyone can build on Bitcoin. Anyone can hold it. Anyone can send it. No terms of service, no account application, no KYC for self-custody. The only global financial network with zero barriers to entry.",
    icon: "🚪",
  },
];

function ValueTile() {
  const [vi, setVi] = useState(0);
  const [vFade, setVFade] = useState(true);
  const [vReset, setVReset] = useState(0);
  const go = useCallback((n) => {
    setVFade(false);
    setTimeout(() => { setVi(n); setVFade(true); }, 200);
  }, []);
  useEffect(() => {
    const t = setInterval(() => go((vi + 1) % FUNDAMENTALS.length), 13000);
    return () => clearInterval(t);
  }, [vi, go, vReset]);
  const f = FUNDAMENTALS[vi];
  return (
    <div
      onClick={() => { go((vi + 1) % FUNDAMENTALS.length); setVReset((k) => k + 1); }}
      style={{
        background: D2, padding: "clamp(10px, 2%, 18px)",
        overflow: "hidden", cursor: "pointer", userSelect: "none",
        display: "flex", flexDirection: "column", width: "100%", height: "100%",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <TileLabel text="Fundamental Value" accent={O} />
        <span style={{ fontSize: "clamp(7px, 0.65vw, 9px)", color: G2, fontFamily: "var(--mono)" }}>{vi + 1}/{FUNDAMENTALS.length}</span>
      </div>
      <div style={{ opacity: vFade ? 1 : 0, transition: "opacity 0.2s ease", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "clamp(6px, 1.5%, 14px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(6px, 1%, 10px)" }}>
          <span style={{ fontSize: "clamp(18px, 2.5vw, 32px)" }}>{f.icon}</span>
          <div>
            <div style={{ fontSize: "clamp(13px, 1.6vw, 20px)", fontWeight: 900, color: W, fontFamily: "var(--sans)", lineHeight: 1.1 }}>{f.title}</div>
            <div style={{ fontSize: "clamp(8px, 0.85vw, 11px)", color: O, fontFamily: "var(--mono)", fontWeight: 700, marginTop: 2 }}>{f.subtitle}</div>
          </div>
        </div>
        <p style={{
          fontSize: "clamp(9px, 1.05vw, 13px)", lineHeight: 1.5, color: G4,
          fontFamily: "var(--sans)", fontWeight: 400, margin: 0,
        }}>{f.body}</p>
      </div>
      <div style={{ height: 3, background: D3, borderRadius: 2, overflow: "hidden", marginTop: "auto" }}>
        <div style={{ width: `${((vi + 1) / FUNDAMENTALS.length) * 100}%`, height: "100%", background: O, borderRadius: 2, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

const METRICS = [
  {
    label: "TMMP", value: "$81.5K", subtitle: "True Market Mean Price",
    desc: "Average on-chain cost basis for active investors using Cointime Economics.",
    rows: [{ l: "AVIV Ratio", v: "0.8–0.9", a: E }, { l: "Realized Price", v: "~$40K", a: G4 }, { l: "Signal", v: "MID-CYCLE STRESS", a: O }],
    accent: E, source: "checkonchain.com",
  },
  {
    label: "MVRV", value: "1.10", subtitle: "Market Value to Realized Value",
    desc: "Approaching undervalued zone. Below 1.0 = historically the best buying opportunities. Currently near lowest since Oct 2023.",
    rows: [{ l: "Overvalued", v: "> 3.7", a: G3 }, { l: "Undervalued", v: "< 1.0", a: E }, { l: "Current", v: "1.10 — NEAR FLOOR", a: O }],
    accent: O, source: "CryptoQuant",
  },
  {
    label: "NUPL", value: "0.08", subtitle: "Net Unrealized Profit/Loss",
    desc: "Measures the overall profit or loss of all BTC holders. Near zero = capitulation zone where cycles historically bottom.",
    rows: [{ l: "Euphoria", v: "> 0.75", a: G3 }, { l: "Capitulation", v: "< 0.0", a: E }, { l: "Current", v: "NEAR CAPITULATION", a: O }],
    accent: E, source: "checkonchain.com",
  },
  {
    label: "SOPR", value: "0.97", subtitle: "Spent Output Profit Ratio",
    desc: "Ratio of price sold vs price paid. Below 1.0 = holders selling at a loss. Historically signals seller exhaustion near bottoms.",
    rows: [{ l: "Profit Taking", v: "> 1.05", a: G3 }, { l: "Loss Selling", v: "< 1.0", a: E }, { l: "Current", v: "SELLERS EXHAUSTING", a: O }],
    accent: O, source: "checkonchain.com",
  },
  {
    label: "MVRV Z", value: "0.45", subtitle: "MVRV Z-Score",
    desc: "Standard deviation of MVRV from mean. Green zone (< 0.5) has historically marked generational buying opportunities.",
    rows: [{ l: "Overheated", v: "> 7.0 (red)", a: G3 }, { l: "Opportunity", v: "< 0.5 (green)", a: E }, { l: "Current", v: "GREEN ZONE", a: O }],
    accent: E, source: "bitcoinmagazinepro.com",
  },
  {
    label: "STH-MVRV", value: "0.78", subtitle: "Short-Term Holder MVRV",
    desc: "Cost basis of recent buyers (< 155 days). Below 1.0 means new investors are underwater — a classic accumulation signal.",
    rows: [{ l: "STH Cost Basis", v: "~$89K", a: G4 }, { l: "Current Price", v: "~$70K", a: O }, { l: "STH P/L", v: "-22% UNDERWATER", a: E }],
    accent: O, source: "checkonchain.com",
  },
];

function MetricsTile() {
  const [mi, setMi] = useState(0);
  const [mFade, setMFade] = useState(true);
  const go = useCallback((n) => {
    setMFade(false);
    setTimeout(() => { setMi(n); setMFade(true); }, 200);
  }, []);
  useEffect(() => {
    const t = setInterval(() => go((mi + 1) % METRICS.length), 10000);
    return () => clearInterval(t);
  }, [mi, go]);
  const m = METRICS[mi];
  return (
    <div
      onClick={() => go((mi + 1) % METRICS.length)}
      style={{ background: D2, padding: 10, overflow: "hidden", cursor: "pointer", userSelect: "none", display: "flex", flexDirection: "column", width: "100%", height: "100%" }}
    >
      <div style={{ opacity: mFade ? 1 : 0, transition: "opacity 0.2s ease", flex: 1, display: "flex", flexDirection: "column" }}>
        <TileLabel text={m.label} accent={m.accent} />
        <div style={{ textAlign: "center", padding: "2px 0" }}>
          <div style={{ fontSize: "clamp(16px, 2.2vw, 22px)", fontWeight: 800, color: O, fontFamily: "var(--mono)" }}>{m.value}</div>
          <div style={{ fontSize: "clamp(6px, 0.65vw, 8px)", color: G4, fontFamily: "var(--mono)", marginTop: 1 }}>{m.subtitle}</div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {m.rows.map((r) => (
            <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "2px 0", borderBottom: `1px solid ${D3}` }}>
              <span style={{ color: G3, fontSize: "clamp(7px, 0.7vw, 9px)", fontFamily: "var(--mono)" }}>{r.l}</span>
              <span style={{ color: r.a, fontSize: "clamp(7px, 0.7vw, 9px)", fontWeight: 600, fontFamily: "var(--mono)" }}>{r.v}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: "clamp(6px, 0.55vw, 7px)", color: G2, fontFamily: "var(--mono)", marginTop: 2 }}>{m.source}</div>
      </div>
    </div>
  );
}

const QUOTES = [
  { text: "If you can't crack that at all, if the government can't get in, then everybody is walking around with a Swiss bank account in their pocket.", author: "Barack Obama", role: "44th President, United States" },
  { text: "If everybody adopted that conversation — should we have a 2% or 5% allocation — it would be $500,000, $600,000, $700,000 for Bitcoin.", author: "Larry Fink", role: "CEO, BlackRock ($11.5T AUM)" },
  { text: "I am a big believer in Bitcoin. If you're frightened of the debasement of your currency, you can have an international instrument called Bitcoin to overcome those fears.", author: "Larry Fink", role: "CEO, BlackRock" },
  { text: "Bitcoin is a remarkable cryptographic achievement and the ability to create something that is not duplicable in the digital world has enormous value.", author: "Eric Schmidt", role: "Former CEO, Google" },
  { text: "I think Bitcoin is on the verge of getting broad acceptance by conventional finance people.", author: "Ray Dalio", role: "Founder, Bridgewater Associates" },
  { text: "Bitcoin is a technological tour de force.", author: "Bill Gates", role: "Co-founder, Microsoft" },
  { text: "Bitcoin is digital gold — harder, stronger, faster, and smarter than any money that has preceded it.", author: "Michael Saylor", role: "Chairman, Strategy Inc." },
  { text: "The Bitcoin whitepaper is one of the most seminal works of computer science in the last several decades. It reads like poetry.", author: "Jack Dorsey", role: "Co-founder, Twitter & Block" },
  { text: "I'm a big believer in Bitcoin. I think it's going to be the future currency of the world.", author: "Jack Dorsey", role: "Co-founder, Twitter & Block" },
  { text: "Bitcoin's structure is very ingenious. The paper currency is being eliminated and crypto is what will replace it.", author: "Elon Musk", role: "CEO, Tesla & SpaceX" },
  { text: "You never change things by fighting the existing reality. To change something, build a new model that makes the existing model obsolete.", author: "Buckminster Fuller", role: "Architect, Systems Theorist" },
  { text: "Bitcoin is the currency of the future of energy. It's fundamentally an energy currency.", author: "Elon Musk", role: "CEO, Tesla & SpaceX" },
  { text: "Bitcoin is overwhelmingly the number one priority, driven by its scarcity and decentralized nature.", author: "Robert Mitchnick", role: "Head of Digital Assets, BlackRock" },
  { text: "I'd advise putting 15% in either Bitcoin or gold to protect against debt crisis and currency devaluation.", author: "Ray Dalio", role: "Founder, Bridgewater Associates" },
  { text: "Only Bitcoin is digital gold. Everything else is just trying to be.", author: "Steve Wozniak", role: "Co-founder, Apple" },
  { text: "Bitcoin is the one thing that can't be stopped. It's like the early internet — it will just keep growing.", author: "Steve Wozniak", role: "Co-founder, Apple" },
  { text: "I do think Bitcoin is the first encrypted money that has the potential to do something like change the world.", author: "Peter Thiel", role: "Co-founder, PayPal" },
  { text: "The governments of the world have spent hundreds of trillions bailing out a decaying system just to kick the can down the road. Bitcoin is the exit.", author: "Raoul Pal", role: "CEO, Real Vision" },
  { text: "Bitcoin is a swarm of cyber hornets serving the goddess of wisdom, feeding on the fire of truth.", author: "Michael Saylor", role: "Chairman, Strategy Inc." },
  { text: "I think the internet is going to be one of the major forces for reducing the role of government. The one thing that's missing is a reliable e-cash.", author: "Milton Friedman", role: "Nobel Laureate, Economics (1999)" },
  { text: "Every informed person needs to know about Bitcoin because it might be one of the world's most important developments.", author: "Leon Luow", role: "Nobel Peace Prize Nominee" },
  { text: "We have elected to put our money and faith in a mathematical framework that is free of politics and human error.", author: "Tyler Winklevoss", role: "Co-founder, Gemini" },
  { text: "At its core, Bitcoin is a smart currency designed by very forward-thinking engineers.", author: "Peter Diamandis", role: "Founder, XPRIZE" },
  { text: "You can't stop things like Bitcoin. It's like trying to stop gunpowder. It will be everywhere and the world will have to readjust.", author: "John McAfee", role: "Founder, McAfee" },
  { text: "Bitcoin may be the TCP/IP of money.", author: "Paul Buchheit", role: "Creator of Gmail" },
  { text: "Virgin Galactic is a bold entrepreneurial technology. It's driving a revolution. And Bitcoin is doing just the same when it comes to inventing a new currency.", author: "Richard Branson", role: "Founder, Virgin Group" },
  { text: "Stay humble. Stack sats.", author: "Matt Odell", role: "Bitcoin Advocate" },
];

function QuoteTile() {
  const [qi, setQi] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const [qFade, setQFade] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setQFade(false);
      setTimeout(() => { setQi(Math.floor(Math.random() * QUOTES.length)); setQFade(true); }, 200);
    }, 12000);
    return () => clearInterval(t);
  }, []);
  const q = QUOTES[qi];
  return (
    <div
      onClick={() => { setQFade(false); setTimeout(() => { setQi((qi + 1) % QUOTES.length); setQFade(true); }, 200); }}
      style={{ background: D2, padding: 10, overflow: "hidden", cursor: "pointer", userSelect: "none", display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%" }}
    >
      <div style={{ opacity: qFade ? 1 : 0, transition: "opacity 0.2s ease" }}>
        <div style={{ fontSize: "clamp(10px, 1.2vw, 15px)", color: W2, fontFamily: "var(--sans)", fontStyle: "italic", lineHeight: 1.4, marginBottom: 6, fontWeight: 600 }}>
          "{q.text}"
        </div>
        <div style={{ fontSize: "clamp(10px, 1.1vw, 14px)", color: O, fontFamily: "var(--mono)", fontWeight: 800 }}>{q.author}</div>
        <div style={{ fontSize: "clamp(8px, 0.85vw, 11px)", color: G3, fontFamily: "var(--mono)", fontWeight: 500 }}>{q.role}</div>
      </div>
    </div>
  );
}

/* ─── SQUARE POST TILE ─── */
function PostTile() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * POSTS.length));
  const [fade, setFade] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  const goTo = useCallback((newIdx) => {
    setFade(false);
    setTimeout(() => { setIdx(newIdx); setFade(true); }, 200);
  }, []);

  const cycle = useCallback(() => {
    let next;
    do { next = Math.floor(Math.random() * POSTS.length); } while (next === idx && POSTS.length > 1);
    goTo(next);
    setResetKey((k) => k + 1);
  }, [idx, goTo]);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo(Math.floor(Math.random() * POSTS.length));
    }, 15000);
    return () => clearInterval(timer);
  }, [goTo, resetKey]);

  const p = POSTS[idx];
  const s = SCHEMES[p.scheme];

  return (
    <div
      onClick={cycle}
      style={{
        width: "100%", aspectRatio: "1 / 1", background: s.bg,
        padding: "clamp(20px, 5.5%, 44px)",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        cursor: "pointer", userSelect: "none", overflow: "hidden",
        transition: "background 0.3s ease",
      }}
    >
      {/* TOP: Tag */}
      <div style={{ opacity: fade ? 1 : 0, transition: "opacity 0.2s ease" }}>
        <div style={{
          display: "inline-block", padding: "6px 14px", background: s.tag, borderRadius: 2,
          fontSize: "clamp(14px, 1.8vw, 20px)", fontWeight: 800, letterSpacing: "0.12em",
          color: s.tagText, fontFamily: "var(--mono)",
        }}>{p.tag}</div>
      </div>

      {/* MIDDLE: Headline + Body stacked */}
      <div style={{
        opacity: fade ? 1 : 0, transition: "opacity 0.2s ease 0.02s",
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center",
        paddingTop: "clamp(10px, 3%, 24px)",
        paddingBottom: "clamp(10px, 3%, 24px)",
        gap: "clamp(12px, 3%, 28px)",
      }}>
        <h1 style={{
          fontSize: "clamp(16px, 2.8vw, 40px)", fontWeight: 900, lineHeight: 1.06,
          color: s.heading, letterSpacing: "-0.02em", margin: 0, fontFamily: "var(--sans)",
        }}>{p.headline}</h1>

        <p style={{
          fontSize: "clamp(11px, 1.5vw, 18px)", lineHeight: 1.5,
          color: s.body, margin: 0,
          fontFamily: "var(--sans)", fontWeight: 400, maxWidth: "94%",
        }}>{p.body}</p>
      </div>

      {/* BOTTOM: Nav */}
      <div style={{ opacity: fade ? 1 : 0, transition: "opacity 0.2s ease 0.04s" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "clamp(4px, 0.8%, 8px)" }}>
          <span style={{ color: s.meta, fontSize: "clamp(8px, 0.8vw, 10px)", fontFamily: "var(--mono)" }}>TAP FOR NEXT →</span>
        </div>
        <div style={{ height: 3, background: s.dotsOff, borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            width: `${((idx + 1) / POSTS.length) * 100}%`, height: "100%",
            background: s.dots, borderRadius: 2, transition: "width 0.4s ease",
          }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Helpers ─── */
function TileLabel({ text, accent = O }) {
  return (
    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: accent, marginBottom: 6, fontFamily: "var(--mono)", display: "flex", alignItems: "center", gap: 5 }}>
      <span style={{ width: 5, height: 5, background: accent, borderRadius: 1, display: "inline-block" }} />{text}
    </div>
  );
}
function MR({ label, value, accent }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: `1px solid ${D3}` }}>
      <span style={{ color: G3, fontSize: 10, fontFamily: "var(--mono)" }}>{label}</span>
      <span style={{ color: accent || W2, fontSize: 11, fontWeight: 600, fontFamily: "var(--mono)" }}>{value}</span>
    </div>
  );
}
function PowerLawSVG() {
  const w = 300, h = 120;
  const pts = [], upper = [], lower = [];
  for (let i = 0; i <= 100; i++) {
    const x = (i / 100) * w, t = i / 100;
    const base = h - Math.pow(t, 2.2) * h * 0.7 - 8;
    pts.push(`${x},${base}`);
    upper.push(`${x},${base - 4 - t * 16}`);
    lower.push(`${x},${base + 4 + t * 16}`);
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="bf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={O} stopOpacity="0.18" />
          <stop offset="100%" stopColor={O} stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="corr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={E} stopOpacity="0.08" />
          <stop offset="100%" stopColor={E} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Corridor fill */}
      <polygon points={[...upper, ...[...lower].reverse()].join(" ")} fill="url(#bf)" />
      {/* Upper band */}
      <polyline points={upper.join(" ")} fill="none" stroke={O} strokeWidth="0.6" opacity="0.35" strokeDasharray="3,2" />
      {/* Lower band */}
      <polyline points={lower.join(" ")} fill="none" stroke={O} strokeWidth="0.6" opacity="0.35" strokeDasharray="3,2" />
      {/* Fair value line */}
      <polyline points={pts.join(" ")} fill="none" stroke={O} strokeWidth="1.5" opacity="0.95" />
      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((y) => (
        <line key={y} x1="0" y1={h * y} x2={w} y2={h * y} stroke={G1} strokeWidth="0.3" opacity="0.3" />
      ))}
      {/* Current position — below the line */}
      <circle cx={w * 0.9} cy={h * 0.52} r="3.5" fill={E}>
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <line x1={w * 0.9} y1={h * 0.52} x2={w * 0.9} y2={h * 0.28} stroke={E} strokeWidth="0.5" opacity="0.4" strokeDasharray="2,2" />
      <text x={w * 0.9 + 6} y={h * 0.55} fill={E} fontSize="8" fontFamily="monospace" fontWeight="700">NOW</text>
      <text x={w * 0.9 + 6} y={h * 0.63} fill={G3} fontSize="6" fontFamily="monospace">-42% below fair value</text>
      {/* Labels */}
      <text x="4" y="14" fill={G2} fontSize="6" fontFamily="monospace">Giovanni Santostasi Power Law Corridor</text>
    </svg>
  );
}
function YearlyLowsBars() {
  const max = 80000;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {YEARLY_LOWS.map((d, i) => {
        const barW = Math.max(3, (d.v / max) * 100);
        const isCurrent = d.current; const is2025 = d.y === "2025"; const highlight = isCurrent || is2025;
        return (
          <div key={d.y} style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <span style={{ color: isCurrent ? O : is2025 ? G4 : G2, fontSize: 7, fontFamily: "var(--mono)", width: 26, textAlign: "right", fontWeight: highlight ? 700 : 400 }}>{d.y}</span>
            <div style={{ flex: 1, height: 8, background: D3, borderRadius: 1, overflow: "hidden" }}>
              <div style={{ width: `${barW}%`, height: "100%", borderRadius: 1, background: isCurrent ? O : is2025 ? G3 : G1 }} />
            </div>
            <span style={{ color: isCurrent ? O : is2025 ? G4 : G3, fontSize: 7, fontFamily: "var(--mono)", width: 44, textAlign: "right", fontWeight: highlight ? 700 : 400 }}>
              ${d.v >= 1000 ? (d.v / 1000).toFixed(1) + "K" : d.v}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function MainPortal() {
  const { price, prev } = useBTC();
  const up = price >= prev;
  return (
    <div style={{ minHeight: "100vh", background: D1, color: W2, fontFamily: "var(--sans)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&family=IBM+Plex+Sans:wght@300;400;500;600;700;800;900&display=swap');
        :root { --mono: 'JetBrains Mono', 'SF Mono', monospace; --sans: 'IBM Plex Sans', -apple-system, sans-serif; }
        * { box-sizing: border-box; margin: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: ${G1}; border-radius: 2px; }
        ::-webkit-scrollbar-track { background: transparent; }
        a { color: ${O}; text-decoration: none; }
        a:hover { color: ${W}; }

        @keyframes progressFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        /* ── DESKTOP (default) ── */
        .main-layout {
          display: flex;
          gap: 2px;
          padding: 2px;
          background: ${BK};
          overflow: hidden;
        }
        .post-col {
          flex-shrink: 0;
          width: min(calc(100vh - 90px), 50vw);
          height: min(calc(100vh - 90px), 50vw);
        }
        .right-grid {
          flex: 1;
          min-width: 0;
          display: grid;
          grid-template-columns: 38.2% 61.8%;
          grid-template-rows: 48% 32% 20%;
          grid-template-areas:
            "powerlaw powerlaw"
            "metrics  value"
            "quote    value";
          gap: 2px;
          height: min(calc(100vh - 90px), 50vw);
        }
        .tile-powerlaw { grid-area: powerlaw; }
        .tile-metrics  { grid-area: metrics; }
        .tile-value    { grid-area: value; }
        .tile-quote    { grid-area: quote; }

        .header-bar { display: flex; }
        .header-bar-mobile { display: none; }
        .ticker-bar { font-size: clamp(8px, 0.85vw, 11px); }
        .footer-links { display: flex; }

        /* ── TABLET (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .post-col {
            width: min(calc(100vh - 90px), 50vw);
            height: min(calc(100vh - 90px), 50vw);
          }
        }

        /* ── MOBILE (≤ 768px) ── */
        @media (max-width: 768px) {
          .main-layout {
            flex-direction: column;
            gap: 2px;
            padding: 2px;
            overflow: visible;
          }
          .post-col {
            width: 100%;
            height: auto;
          }
          .right-grid {
            display: flex;
            flex-direction: column;
            gap: 2px;
            height: auto;
          }
          /* Reorder: quotes first, fundamentals second, then power law, then metrics */
          .tile-quote    { order: 1; min-height: 180px; }
          .tile-value    { order: 2; min-height: 320px; }
          .tile-powerlaw { order: 3; min-height: 220px; }
          .tile-metrics  { order: 4; min-height: 240px; }

          .header-bar { display: none; }
          .header-bar-mobile { display: flex; }
          .ticker-bar { font-size: 9px; }
          .footer-links { flex-wrap: wrap; gap: 10px !important; }
        }

        /* ── SMALL MOBILE (≤ 480px) ── */
        @media (max-width: 480px) {
          .tile-powerlaw { min-height: 200px; }
          .tile-metrics  { min-height: 260px; }
          .tile-quote    { min-height: 180px; }
          .tile-value    { min-height: 340px; }
        }
      `}</style>
      {/* Top progress bar */}
      <div style={{ height: 2, background: D3, overflow: "hidden" }}>
        <div style={{ height: "100%", background: O, animation: "progressFill 15s linear infinite" }} />
      </div>

      {/* Desktop Header */}
      <div className="header-bar" style={{ justifyContent: "space-between", alignItems: "center", padding: "7px 14px", borderBottom: `1px solid ${D3}`, background: BK }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: O, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: BK, fontFamily: "var(--mono)" }}>₿</div>
          <span style={{ fontSize: 12, fontWeight: 700, color: W }}>21M REASONS</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 6 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: E }} />
            <span style={{ fontSize: 8, color: G3, fontFamily: "var(--mono)" }}>LIVE</span>
          </div>
        </div>
        <div style={{ fontFamily: "var(--mono)", fontSize: "clamp(15px, 2.2vw, 22px)", fontWeight: 800, color: up ? E : O, transition: "color 0.3s", letterSpacing: "-0.5px" }}>
          ${price.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          <span style={{ fontSize: 9, color: G3, marginLeft: 6, fontWeight: 400 }}>BTC/USD</span>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="header-bar-mobile" style={{ flexDirection: "column", borderBottom: `1px solid ${D3}`, background: BK }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: O, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: BK, fontFamily: "var(--mono)" }}>₿</div>
            <span style={{ fontSize: 13, fontWeight: 700, color: W }}>21M REASONS</span>
            <div style={{ display: "flex", alignItems: "center", gap: 3, marginLeft: 4 }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: E }} />
              <span style={{ fontSize: 7, color: G3, fontFamily: "var(--mono)" }}>LIVE</span>
            </div>
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 18, fontWeight: 800, color: up ? E : O, transition: "color 0.3s", letterSpacing: "-0.5px" }}>
            ${price.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            <span style={{ fontSize: 8, color: G3, marginLeft: 4, fontWeight: 400 }}>BTC/USD</span>
          </div>
        </div>
      </div>

      {/* Rolling Ticker Bar — pauses on hover, all links clickable */}
      <div className="ticker-bar" 
        style={{ overflow: "hidden", background: D2, borderBottom: `1px solid ${D3}`, padding: "5px 0", whiteSpace: "nowrap" }}
        onMouseEnter={(e) => { const el = e.currentTarget.querySelector('.ticker-track'); if (el) el.style.animationPlayState = 'paused'; }}
        onMouseLeave={(e) => { const el = e.currentTarget.querySelector('.ticker-track'); if (el) el.style.animationPlayState = 'running'; }}
      >
        <style>{`
          @keyframes tickerScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-track a { color: inherit; text-decoration: none; }
          .ticker-track a:hover { text-decoration: underline; color: ${O} !important; }
        `}</style>
        <div className="ticker-track" style={{ display: "inline-block", animation: "tickerScroll 120s linear infinite" }}>
          {[0, 1].map((copy) => (
            <span key={copy} style={{ fontSize: "clamp(8px, 0.85vw, 11px)", fontFamily: "var(--mono)", letterSpacing: "0.02em" }}>
              <span style={{ color: O, fontWeight: 700 }}>CHAMPIONS</span><span style={{ color: G1 }}> ░ </span>
              {[
                { n: "James Check", d: "Analyst, _checkonchain", u: "https://x.com/_checkonchain" },
                { n: "Saifedean Ammous", d: "Author, The Bitcoin Standard", u: "https://saifedean.com" },
                { n: "Jeff Booth", d: "Author, The Price of Tomorrow", u: "https://x.com/JeffBooth" },
                { n: "Lyn Alden", d: "Author, Broken Money", u: "https://x.com/LynAldenContact" },
                { n: "Mark Moss", d: "Macro Analyst & Educator", u: "https://x.com/1MarkMoss" },
                { n: "James Lavish", d: "Fund Manager, The Informationist", u: "https://x.com/jaborman" },
                { n: "Michael Saylor", d: "Chairman, Strategy Inc.", u: "https://x.com/saylor" },
                { n: "Jason Lowery", d: "Author, Softwar (MIT)", u: "https://x.com/JasonPLowery" },
                { n: "Tom Luongo", d: "Macro Geopolitics, Gold Goats 'n Guns", u: "https://x.com/TFL1728" },
                { n: "Luke Gromen", d: "Founder, FFTT", u: "https://x.com/LukeGromen" },
                { n: "Matt Odell", d: "Privacy Advocate, Citadel Dispatch", u: "https://x.com/ODELL" },
                { n: "Matthew Mezinskis", d: "Analyst, Porkopolis Economics", u: "https://x.com/MatthewMezinskis" },
                { n: "Mel Mattison", d: "Macro Strategist & Author", u: "https://x.com/MelMattison1" },
                { n: "Jordi Visser", d: "CIO & Macro Thinker", u: "https://x.com/JordiVisser" },
                { n: "Michael Howell", d: "CEO, CrossBorder Capital", u: "https://x.com/crossabordjcap" },
                { n: "Erik Cason", d: "Author, Cryptosovereignty", u: "https://x.com/Erikcason" },
                { n: "Larry Lepard", d: "Managing Partner, EMA", u: "https://x.com/LawrenceLepard" },
                { n: "Tim Draper", d: "Venture Capitalist, Draper Associates", u: "https://x.com/TimDraper" },
                { n: "Max Keiser", d: "Broadcaster & BTC Advisor to El Salvador", u: "https://x.com/maxkeiser" },
                { n: "Stacy Herbert", d: "Co-host, Keiser Report / BTC Advisor", u: "https://x.com/stabordi" },
                { n: "Hal Finney", d: "Pioneer, First BTC Recipient ✝", u: "https://en.wikipedia.org/wiki/Hal_Finney_(computer_scientist)" },
                { n: "Adam Back", d: "CEO, Blockstream / Hashcash Inventor", u: "https://x.com/adam3us" },
                { n: "Parker Lewis", d: "Author, Gradually Then Suddenly", u: "https://x.com/parkeralewis" },
                { n: "Robert Breedlove", d: "Host, What Is Money?", u: "https://x.com/Breedlove22" },
                { n: "Natalie Brunell", d: "Host, Coin Stories", u: "https://x.com/natabordi" },
                { n: "Preston Pysh", d: "Host, The Investor's Podcast", u: "https://x.com/PrestonPysh" },
                { n: "Greg Foss", d: "Credit Markets, Validus Power", u: "https://x.com/FossGregfoss" },
                { n: "Alex Gladstein", d: "CSO, Human Rights Foundation", u: "https://x.com/gladstein" },
                { n: "Giovanni Santostasi", d: "Creator, Power Law Model", u: "https://x.com/Giovann35084111" },
                { n: "Jack Mallers", d: "CEO, Strike", u: "https://x.com/jackmallers" },
                { n: "Andreas Antonopoulos", d: "Author, Mastering Bitcoin", u: "https://x.com/aantonop" },
              ].map((c, i) => (
                <span key={`c${copy}-${i}`}>
                  <a href={c.u} target="_blank" rel="noopener noreferrer" style={{ color: W2 }}>{c.n}</a>
                  <span style={{ color: G2 }}> — {c.d}</span><span style={{ color: G1 }}> ◆ </span>
                </span>
              ))}
              <span style={{ color: G1 }}> ░░░ </span>
              <span style={{ color: E, fontWeight: 700 }}>PRO-BITCOIN HEADS OF STATE</span><span style={{ color: G1 }}> ░ </span>
              {[
                { n: "President Donald Trump", d: "USA — Strategic Bitcoin Reserve, Executive Orders" },
                { n: "President Nayib Bukele", d: "El Salvador — First nation to adopt BTC as legal tender" },
                { n: "PM Shehbaz Sharif", d: "Pakistan — Announced Strategic Bitcoin Reserve 2026" },
                { n: "King Jigme Khesar", d: "Bhutan — State-linked hydroelectric BTC mining" },
                { n: "President Faustin-Archange Touadéra", d: "Central African Republic — BTC legal tender" },
                { n: "President Javier Milei", d: "Argentina — Pro-crypto deregulation" },
                { n: "VP Heng Swee Keat", d: "Singapore — Progressive crypto framework via MAS" },
                { n: "President Bola Tinubu", d: "Nigeria — National blockchain policy" },
                { n: "Diet Member Satoshi Hamada", d: "Japan — Proposed national Bitcoin reserve" },
              ].map((h, i) => (
                <span key={`h${copy}-${i}`}>
                  <span style={{ color: W2 }}>{h.n}</span>
                  <span style={{ color: G2 }}> — {h.d}</span><span style={{ color: G1 }}> ◆ </span>
                </span>
              ))}
              <span style={{ color: G1 }}> ░░░ </span>
              <span style={{ color: E, fontWeight: 700 }}>ESSENTIAL READING</span><span style={{ color: G1 }}> ░ </span>
              {[
                { t: "The Bitcoin Standard", a: "Saifedean Ammous", u: "https://www.audible.com/pd/The-Bitcoin-Standard-Audiobook/B07D7ZRKLJ" },
                { t: "The Fiat Standard", a: "Saifedean Ammous", u: "https://www.audible.com/pd/The-Fiat-Standard-Audiobook/B09MYXQGBV" },
                { t: "Principles of Economics", a: "Saifedean Ammous", u: "https://www.audible.com/pd/Principles-of-Economics-Audiobook/B0C6RCWYR3" },
                { t: "Broken Money", a: "Lyn Alden", u: "https://www.audible.com/pd/Broken-Money-Audiobook/B0CG1BNP9P" },
                { t: "The Price of Tomorrow", a: "Jeff Booth", u: "https://www.audible.com/pd/The-Price-of-Tomorrow-Audiobook/B083Z5WRBG" },
                { t: "Mastering Bitcoin", a: "Andreas Antonopoulos", u: "https://www.amazon.com/Mastering-Bitcoin-Programming-Open-Blockchain/dp/1098150090" },
                { t: "Layered Money", a: "Nik Bhatia", u: "https://www.audible.com/pd/Layered-Money-Audiobook/B08QDFM3RY" },
                { t: "The Bitcoin Standard Podcast", a: "Saifedean Ammous", u: "https://open.spotify.com/show/691nFDIWWmhFFAz7xp3wAr" },
                { t: "Thank God for Bitcoin", a: "Jimmy Song et al.", u: "https://www.audible.com/pd/Thank-God-for-Bitcoin-Audiobook/B08XWFD5HK" },
                { t: "Check Your Financial Privilege", a: "Alex Gladstein", u: "https://www.amazon.com/Check-Your-Financial-Privilege-Alex/dp/B0B48HKQ27" },
                { t: "Softwar", a: "Jason Lowery (MIT)", u: "https://www.amazon.com/Softwar-Thesis-Power-Projection-Cybersecurity/dp/B0BW35F1TJ" },
                { t: "The Sovereign Individual", a: "Davidson & Rees-Mogg", u: "https://www.audible.com/pd/The-Sovereign-Individual-Audiobook/B07TWNP9NB" },
                { t: "Inventing Bitcoin", a: "Yan Pritzker", u: "https://www.amazon.com/Inventing-Bitcoin-Technology-Decentralized-Explained/dp/B087C4BCJ2" },
                { t: "Bitcoin: Hard Money You Can't F*ck With", a: "Jason Williams", u: "https://www.audible.com/pd/Bitcoin-Hard-Money-You-Cant-Fck-With-Audiobook/B085FK7MLH" },
                { t: "The Internet of Money", a: "Andreas Antonopoulos", u: "https://www.audible.com/pd/The-Internet-of-Money-Audiobook/B071KGKJR6" },
                { t: "21 Lessons", a: "Gigi", u: "https://21lessons.com" },
                { t: "Gradually, Then Suddenly", a: "Parker Lewis", u: "https://www.amazon.com/Gradually-Then-Suddenly-Parker-Lewis/dp/B0CV3TP1MH" },
              ].map((b, i) => (
                <span key={`b${copy}-${i}`}>
                  <a href={b.u} target="_blank" rel="noopener noreferrer" style={{ color: O, fontWeight: 600 }}>{b.t}</a>
                  <span style={{ color: G2 }}> — {b.a}</span><span style={{ color: G1 }}> ◆ </span>
                </span>
              ))}
              <span style={{ color: G1 }}> ░░░ </span>
              <span style={{ color: E, fontWeight: 700 }}>RESOURCES</span><span style={{ color: G1 }}> ░ </span>
              {[
                { t: "checkonchain.com", d: "On-chain Analytics", u: "https://charts.checkonchain.com/" },
                { t: "bitcoinmagazinepro.com", d: "Charts & Data", u: "https://www.bitcoinmagazinepro.com/" },
                { t: "charts.bitbo.io", d: "Power Law & Pricing", u: "https://charts.bitbo.io/long-term-power-law/" },
                { t: "porkopolis.io", d: "Power Law Chart", u: "https://www.porkopolis.io/thechart/" },
                { t: "cryptoquant.com", d: "On-chain Intelligence", u: "https://cryptoquant.com/" },
                { t: "mempool.space", d: "Block Explorer", u: "https://mempool.space/" },
                { t: "wtfhappenedin1971.com", d: "The Fiat Experiment", u: "https://wtfhappenedin1971.com/" },
                { t: "hope.com", d: "Bitcoin for Beginners", u: "https://hope.com/" },
              ].map((r, i) => (
                <span key={`r${copy}-${i}`}>
                  <a href={r.u} target="_blank" rel="noopener noreferrer" style={{ color: O, fontWeight: 600 }}>{r.t}</a>
                  <span style={{ color: G2 }}> — {r.d}</span><span style={{ color: G1 }}> ◆ </span>
                </span>
              ))}
              <span style={{ color: G1 }}> ░░░░░░ </span>
            </span>
          ))}
        </div>
      </div>

      <div className="main-layout">
        <div className="post-col"><PostTile /></div>
        <div className="right-grid">
          <div className="tile-powerlaw" style={{ background: D2, padding: 12, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <TileLabel text="Power Law Model" />
            <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
              <PowerLawSVG />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, marginTop: 6 }}>
              {[
                { l: "Fair Value", v: "~$118K", a: O },
                { l: "Floor", v: "~$45K", a: G4 },
                { l: "Deviation", v: "-42%", a: E },
                { l: "Model", v: "P = a · t^b", a: G3 },
              ].map((d) => (
                <div key={d.l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "clamp(10px, 1.2vw, 15px)", fontWeight: 800, color: d.a, fontFamily: "var(--mono)" }}>{d.v}</div>
                  <div style={{ fontSize: "clamp(6px, 0.6vw, 8px)", color: G2, fontFamily: "var(--mono)", marginTop: 1 }}>{d.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="tile-metrics"><MetricsTile /></div>
          <div className="tile-value"><ValueTile /></div>
          <div className="tile-quote"><QuoteTile /></div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: BK, borderTop: `1px solid ${D3}`, padding: "10px 14px",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: O, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, color: BK, fontFamily: "var(--mono)" }}>₿</div>
          <span style={{ fontSize: "clamp(9px, 0.9vw, 11px)", color: G3, fontFamily: "var(--mono)" }}>
            21M REASONS — <span style={{ color: O, fontWeight: 700 }}>{POSTS.length} reasons</span> and counting
          </span>
        </div>
        <div className="footer-links" style={{ display: "flex", gap: 14, alignItems: "center" }}>
          {[
            { label: "checkonchain.com", url: "https://charts.checkonchain.com/" },
            { label: "bitbo.io", url: "https://charts.bitbo.io/long-term-power-law/" },
            { label: "porkopolis.io", url: "https://www.porkopolis.io/thechart/" },
            { label: "mempool.space", url: "https://mempool.space/" },
          ].map((l) => (
            <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "clamp(7px, 0.7vw, 9px)", fontFamily: "var(--mono)", color: G2, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = O)}
              onMouseLeave={(e) => (e.currentTarget.style.color = G2)}
            >{l.label}</a>
          ))}
        </div>
      </div>
    </div>
  );
}
