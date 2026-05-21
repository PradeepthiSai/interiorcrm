import "./App.css";

function Home({ onContinue }) {
  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="home-badge">InteriorCRM</div>
        <h1>Luxury Studio CRM for Interior Design Teams</h1>
        <p>
          Welcome to your refined project command center. Organize leads, track notes,
          and manage client journeys with boutique precision.
        </p>
        <div className="home-actions">
          <button className="btn-primary" onClick={onContinue}>
            Enter Studio Workspace
          </button>
          <button className="btn-secondary" onClick={onContinue}>
            Login / Register
          </button>
        </div>
        
      </div>
      <div className="home-features">
        <div className="feature-card">
          <h3>Curated pipeline</h3>
          <p>Visualize each lead stage with elegant, high-end workflow cards.</p>
        </div>
        <div className="feature-card">
          <h3>Staff-ready notes</h3>
          <p>Keep every detail and follow-up note in one polished client timeline.</p>
        </div>
        <div className="feature-card">
          <h3>Premium alerts</h3>
          <p>Stay ahead of warm leads and never miss the 48-hour reply window.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
