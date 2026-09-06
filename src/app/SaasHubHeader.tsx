const SAAS_ITEMS = [
  {
    name: "GitHub",
    category: "Developer Tools",
    rating: "4.9/5 · 5.2K Reviews",
    logo: "https://cdn.simpleicons.org/github/181717",
  },
  {
    name: "Figma",
    category: "Design",
    rating: "4.8/5 · 4.1K Reviews",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  },
  {
    name: "Canva",
    category: "Design",
    rating: "4.7/5 · 6.3K Reviews",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg",
  },
  {
    name: "Notion",
    category: "Productivity",
    rating: "4.8/5 · 3.9K Reviews",
    logo: "https://cdn.simpleicons.org/notion/000000",
  },
  {
    name: "Slack",
    category: "Communication",
    rating: "4.6/5 · 7.8K Reviews",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg",
  },
  {
    name: "Webflow",
    category: "Website Builder",
    rating: "4.7/5 · 2.4K Reviews",
    logo: "https://cdn.simpleicons.org/webflow/146EF5",
  },
  {
    name: "Stripe",
    category: "Payments",
    rating: "4.9/5 · 9.1K Reviews",
    logo: "https://cdn.simpleicons.org/stripe/008CDD",
  },
];

const PATH =
  "M -2000 -227 L -787.71 250.02 Q 0 559.98 787.71 250.02 L 2000 -227";

const MENU_ITEMS = ["Categories", "Top SaaS", "Alternative", "Trending", "Support"];

export default function SaasHubHeader() {
  const cards = Array.from({ length: 16 }, (_, i) => SAAS_ITEMS[i % SAAS_ITEMS.length]);

  return (
    <section className="saashub-header-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Hubot+Sans:ital,wght@0,200..900;1,200..900&display=swap');

        .saashub-header-section {
          position: relative;
          width: 100%;
          min-height: max(100vh, 850px);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Inter Tight', sans-serif;
          background: radial-gradient(156.25% 100% at 50% 0%, #D8EDFB 0%, rgba(251,251,252,0) 100%), #FEFEFE;
          background-image: radial-gradient(156.25% 100% at 50% 0%, #D8EDFB 0%, rgba(251,251,252,0) 100%), radial-gradient(#d5d5d5 1px, transparent 1px);
          background-size: 100% 100%, 20px 20px;
        }

        .saashub-header-section .navbar {
          position: absolute;
          width: 900px;
          height: 56px;
          left: calc(50% - 450px);
          top: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          gap: 83px;
          border-radius: 16px;
          z-index: 50;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(4.99974px);
          box-shadow: 0px 0px 1.99999px rgba(95,74,46,0.08), 0px 1.99999px 2.99998px rgba(95,74,46,0.04), 0px 3.99998px 5.99997px rgba(95,74,46,0.04), 0px 19.9999px 31.9998px -11.9999px rgba(95,74,46,0.12);
        }
        .saashub-header-section .navbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .saashub-header-section .logomark {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #020203;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 2px rgba(0,0,0,0.4);
        }
        .saashub-header-section .navbar-divider {
          width: 1px;
          height: 20px;
          background: #EBE6E0;
        }
        .saashub-header-section .menu {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .saashub-header-section .menu a {
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: #555455;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .saashub-header-section .menu a:hover {
          color: #000;
        }
        .saashub-header-section .navbar-right {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .saashub-header-section .search-link {
          color: #555455;
          font-weight: 500;
          font-size: 14px;
          padding: 6px 12px;
          height: 32px;
          display: flex;
          align-items: center;
          text-decoration: none;
        }
        .saashub-header-section .list-product-btn,
        .saashub-header-section .btn-secondary,
        .saashub-header-section .btn-primary {
          transition: all 0.3s ease;
          perspective: 1000px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .saashub-header-section .list-product-btn {
          background: #020203;
          color: #fff;
          border-radius: 8px;
          height: 32px;
          padding: 6px 12px;
          font-size: 14px;
          font-weight: 500;
        }
        .saashub-header-section .list-product-btn:hover,
        .saashub-header-section .btn-secondary:hover,
        .saashub-header-section .btn-primary:hover {
          background: linear-gradient(177.72deg, #74C3D8 1.92%, #B9E264 124.43%);
          color: #fff;
        }
        .saashub-header-section .btn-text-flip {
          display: inline-block;
          transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        .saashub-header-section button:hover .btn-text-flip,
        .saashub-header-section a:hover .btn-text-flip {
          transform: rotateX(360deg);
        }
        .saashub-header-section .mobile-menu-icon {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
        }
        .saashub-header-section .mobile-menu-icon span {
          width: 20px;
          height: 2px;
          background: #222;
          display: block;
        }

        .saashub-header-section .hero-content {
          position: absolute;
          width: 1000px;
          left: calc(50% - 500px);
          top: 132px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
        }
        .saashub-header-section .hero-title {
          font-family: 'Hubot Sans', sans-serif;
          font-weight: 500;
          font-size: 90px;
          line-height: 94px;
          letter-spacing: -1px;
          color: #222;
          text-align: center;
          width: 800px;
          margin: 0;
        }
        .saashub-header-section .hero-subtitle {
          font-family: 'Inter Tight', sans-serif;
          font-weight: 500;
          font-size: 20px;
          line-height: 26px;
          color: #454444;
          width: 407px;
          text-align: center;
          margin: 0;
        }
        .saashub-header-section .hero-buttons {
          display: flex;
          gap: 12px;
          height: 42px;
        }
        .saashub-header-section .btn-secondary {
          background: #fff;
          color: #4A4341;
          border-radius: 10px;
          padding: 9px 20px;
          font-size: 16px;
          font-weight: 500;
          box-shadow: 0px 0px 1.99999px rgba(95,74,46,0.08), 0px 1.99999px 2.99998px rgba(95,74,46,0.04), 0px 3.99998px 5.99997px rgba(95,74,46,0.04);
        }
        .saashub-header-section .btn-primary {
          background: #020203;
          color: #fff;
          border-radius: 10px;
          padding: 9px 20px;
          font-size: 16px;
          font-weight: 500;
        }

        .saashub-header-section .cards-layer {
          position: absolute;
          width: 100%;
          height: 800px;
          top: 126px;
          left: 0;
          pointer-events: none;
        }
        .saashub-header-section .string-vector {
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
          overflow: visible;
        }
        .saashub-header-section .cards-motion-origin {
          position: absolute;
          left: 50%;
          top: 0;
        }
        .saashub-header-section .saas-card-wrapper {
          position: absolute;
          width: 249px;
          height: 288px;
          pointer-events: auto;
          offset-path: path('${PATH}');
          offset-anchor: 50% 11.5px;
          offset-rotate: auto;
          animation: slideAlongPath 100s linear infinite, sway 4s ease-in-out infinite;
        }
        @keyframes slideAlongPath {
          0% { offset-distance: 100%; }
          100% { offset-distance: 0%; }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        .saashub-header-section .card-pin {
          position: relative;
          width: 23px;
          height: 32px;
          margin: 0 auto;
          border-radius: 2px;
          background: linear-gradient(177.72deg, #74C3D8 1.92%, #B9E264 124.43%);
        }
        .saashub-header-section .card-pin-hole {
          position: absolute;
          top: 6px;
          left: 6px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          border: 3px solid #fff;
        }
        .saashub-header-section .saas-card {
          position: absolute;
          top: 27px;
          width: 249px;
          height: 261px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0px 8px 24px rgba(0,0,0,0.06);
          padding: 10px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .saashub-header-section .card-image-well {
          width: 229px;
          height: 128px;
          background: #FBFBFA;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .saashub-header-section .card-image-well img {
          width: 64px;
          height: 64px;
          object-fit: contain;
        }
        .saashub-header-section .card-title {
          font-family: 'Hubot Sans', sans-serif;
          font-size: 22px;
          font-weight: 500;
          color: #222;
          margin: 0;
          padding: 0 4px;
        }
        .saashub-header-section .card-category {
          font-size: 14px;
          color: #555;
          margin: 0;
          padding: 0 4px;
        }
        .saashub-header-section .card-rating {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 4px;
          font-size: 13px;
          color: #454444;
        }

        @media (max-width: 1024px) {
          .saashub-header-section .navbar {
            width: calc(100% - 40px);
            left: 20px;
            gap: 20px;
          }
          .saashub-header-section .menu,
          .saashub-header-section .navbar-right {
            display: none !important;
          }
          .saashub-header-section .mobile-menu-icon {
            display: flex;
          }
          .saashub-header-section .hero-content {
            width: 100%;
            left: 0;
            padding: 0 20px;
            top: 100px;
            box-sizing: border-box;
          }
          .saashub-header-section .hero-title {
            font-size: 50px;
            line-height: 54px;
            width: 100%;
          }
          .saashub-header-section .hero-subtitle {
            width: 100%;
            font-size: 16px;
          }
          .saashub-header-section .saas-card-wrapper {
            transform: scale(0.6);
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-left">
          <div className="logomark" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22h20L12 2z" />
            </svg>
          </div>
          <div className="navbar-divider" aria-hidden="true" />
          <div className="menu">
            {MENU_ITEMS.map((item) => (
              <a key={item} href="#">{item}</a>
            ))}
          </div>
        </div>
        <div className="navbar-right">
          <a href="#" className="search-link">Search</a>
          <a href="#" className="list-product-btn">
            <span className="btn-text-flip">List a Product</span>
          </a>
        </div>
        <div className="mobile-menu-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </nav>

      <div className="cards-layer">
        <svg
          className="string-vector"
          width="4000"
          height="800"
          viewBox="-2000 -300 4000 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={PATH} stroke="#A3E5C6" strokeWidth="2" fill="none" />
        </svg>
        <div className="cards-motion-origin">
          {cards.map((item, i) => (
            <div
              key={i}
              className="saas-card-wrapper"
              style={
                {
                  "--index": i,
                  animationDelay: `calc(${i} * -6.25s), calc(${i} * -0.7s)`,
                } as React.CSSProperties
              }
            >
              <div className="card-pin">
                <span className="card-pin-hole" />
              </div>
              <div className="saas-card">
                <div className="card-image-well">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.logo} alt={item.name} />
                </div>
                <p className="card-title">{item.name}</p>
                <p className="card-category">{item.category}</p>
                <div className="card-rating">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#00B67B" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 6.9L12 17.3 5.7 20.8l1.7-6.9L2 9.2l7.1-.6L12 2z" />
                  </svg>
                  <span>{item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          Discover the Best
          <br />
          SaaS Product
        </h1>
        <p className="hero-subtitle">
          Explore, compare, and find the right SaaS tools to grow your business faster.
        </p>
        <div className="hero-buttons">
          <a href="#" className="btn-secondary">
            <span className="btn-text-flip">Talk to Add</span>
          </a>
          <a href="#" className="btn-primary">
            <span className="btn-text-flip">Browse all Products</span>
          </a>
        </div>
      </div>
    </section>
  );
}
