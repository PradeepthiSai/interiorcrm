import { useState, useEffect } from "react";
import axios from "axios";
import LeadCard from "./LeadCard";
import "./Dashboard.css";
import { getAuthHeader, getApiUrl } from "./utils";

function Dashboard({ user, onLogout }) {
  const [leads, setLeads] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newLead, setNewLead] = useState({
    clientName: "",
    email: "",
    phone: "",
    roomType: "",
    estimatedBudget: "",
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [dropStatus, setDropStatus] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setErrorMessage("");
      const response = await axios.get(getApiUrl("/api/leads"), {
        headers: getAuthHeader(),
      });
      setLeads(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching leads:", err);
      setErrorMessage(
        "Unable to load leads. Please make sure the backend is running and try again."
      );
      setLoading(false);
    }
  };

  const handleAddLead = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage("");
      const response = await axios.post(
        getApiUrl("/api/leads"),
        newLead,
        { headers: getAuthHeader() }
      );
      setLeads([response.data, ...leads]);
      setNewLead({
        clientName: "",
        email: "",
        phone: "",
        roomType: "",
        estimatedBudget: "",
      });
      setShowForm(false);
    } catch (err) {
      console.error("Error adding lead:", err);
      setErrorMessage("Could not add lead. Please try again.");
    }
  };

  const handleUpdateStatus = async (leadId, newStatus) => {
    try {
      setErrorMessage("");
      const response = await axios.put(
        getApiUrl(`/api/leads/${leadId}`),
        { status: newStatus },
        { headers: getAuthHeader() }
      );
      setLeads(
        leads.map((lead) => (lead._id === leadId ? response.data : lead))
      );
    } catch (err) {
      console.error("Error updating lead:", err);
      setErrorMessage("Could not update lead status. Please try again.");
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (window.confirm("Delete this lead?")) {
      try {
        setErrorMessage("");
        await axios.delete(getApiUrl(`/api/leads/${leadId}`), {
          headers: getAuthHeader(),
        });
        setLeads(leads.filter((lead) => lead._id !== leadId));
      } catch (err) {
        console.error("Error deleting lead:", err);
        setErrorMessage("Could not delete lead. Please try again.");
      }
    }
  };

  const handleDragStart = (e, lead) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ leadId: lead._id, status: lead.status })
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (status) => {
    setDropStatus(status);
  };

  const handleDragLeave = () => {
    setDropStatus(null);
  };

  const handleDrop = async (e, targetStatus) => {
    e.preventDefault();
    setDropStatus(null);
    const data = e.dataTransfer.getData("application/json");
    if (!data) return;
    const { leadId, status } = JSON.parse(data);
    if (status !== targetStatus) {
      await handleUpdateStatus(leadId, targetStatus);
    }
  };

  const newLeads = leads.filter((l) => l.status === "New");
  const contactedLeads = leads.filter((l) => l.status === "Contacted");
  const convertedLeads = leads.filter((l) => l.status === "Converted");

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="brand-crest">
            <span className="brand-mark">LA</span>
            <div className="brand-copy">
              <p className="brand-title">Maison Atelier</p>
              <p className="brand-subtitle">Bespoke Interior Studio CRM</p>
            </div>
          </div>
          <h1>Pipeline Management</h1>
          <p className="header-subtitle">
            Welcome back, {user?.name || "Studio Lead"} — curate every inquiry
            with luxurious precision.
          </p>
        </div>
        <div className="header-controls">
          <button className="btn-add-lead" onClick={() => setShowForm(true)}>
            + New Lead
          </button>
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="alert-banner">
          <strong>Heads up:</strong> {errorMessage}
        </div>
      )}
      <div className="inspiration-panel">
        <div className="panel-header">
          <div className="panel-label">Design Inspiration</div>
          <h2>Curated studio concepts for your next lead</h2>
        </div>
        <div className="mood-grid">
          <div className="mood-card mood-modern">
            <div className="mood-chip">Minimal Luxe</div>
            <p>Soft linen, marble textures, warm gold accents.</p>
          </div>
          <div className="mood-card mood-forest">
            <div className="mood-chip">Serene Living</div>
            <p>Natural oak, muted greens and tactile materials.</p>
          </div>
          <div className="mood-card mood-sculpted">
            <div className="mood-chip">Curated Retreat</div>
            <p>Architectural silhouettes, layered neutrals, boutique calm.</p>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
            <h2>Add New Lead</h2>
            <form onSubmit={handleAddLead}>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Client Name"
                  value={newLead.clientName}
                  onChange={(e) =>
                    setNewLead({ ...newLead, clientName: e.target.value })
                  }
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newLead.email}
                  onChange={(e) =>
                    setNewLead({ ...newLead, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-row">
                <input
                  type="tel"
                  placeholder="Phone"
                  value={newLead.phone}
                  onChange={(e) =>
                    setNewLead({ ...newLead, phone: e.target.value })
                  }
                />
                <select
                  value={newLead.roomType}
                  onChange={(e) =>
                    setNewLead({ ...newLead, roomType: e.target.value })
                  }
                  required
                >
                  <option value="">Select Room Type</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Living Room">Living Room</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Bathroom">Bathroom</option>
                  <option value="Office">Office</option>
                </select>
              </div>
              <input
                type="number"
                placeholder="Estimated Budget (₹)"
                value={newLead.estimatedBudget}
                onChange={(e) =>
                  setNewLead({
                    ...newLead,
                    estimatedBudget: e.target.value,
                  })
                }
              />
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading leads...</div>
      ) : (
        <div className="pipeline-container">
          <div
            className={`pipeline-column ${dropStatus === "New" ? "drag-over" : ""}`}
            onDragOver={handleDragOver}
            onDragEnter={() => handleDragEnter("New")}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "New")}
          >
            <div className="column-header">
              <h2>New <span className="status-pill status-new">{newLeads.length}</span></h2>
              <span className="column-badge">Fresh Inquiries</span>
            </div>
            <div className="leads-list">
              {newLeads.length > 0 ? (
                newLeads.map((lead) => (
                  <LeadCard
                    key={lead._id}
                    lead={lead}
                    onStatusChange={handleUpdateStatus}
                    onDelete={handleDeleteLead}
                    onRefresh={fetchLeads}
                    onDragStart={handleDragStart}
                  />
                ))
              ) : (
                <div className="empty-state">
                  <p>No new leads at the moment</p>
                </div>
              )}
            </div>
          </div>

          <div
            className={`pipeline-column ${dropStatus === "Contacted" ? "drag-over" : ""}`}
            onDragOver={handleDragOver}
            onDragEnter={() => handleDragEnter("Contacted")}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "Contacted")}
          >
            <div className="column-header">
              <h2>Contacted <span className="status-pill status-contacted">{contactedLeads.length}</span></h2>
              <span className="column-badge">In Discussion</span>
            </div>
            <div className="leads-list">
              {contactedLeads.length > 0 ? (
                contactedLeads.map((lead) => (
                  <LeadCard
                    key={lead._id}
                    lead={lead}
                    onStatusChange={handleUpdateStatus}
                    onDelete={handleDeleteLead}
                    onRefresh={fetchLeads}
                    onDragStart={handleDragStart}
                  />
                ))
              ) : (
                <div className="empty-state">
                  <p>No leads in discussion yet</p>
                </div>
              )}
            </div>
          </div>

          <div
            className={`pipeline-column ${dropStatus === "Converted" ? "drag-over" : ""}`}
            onDragOver={handleDragOver}
            onDragEnter={() => handleDragEnter("Converted")}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "Converted")}
          >
            <div className="column-header">
              <h2>Converted <span className="status-pill status-converted">{convertedLeads.length}</span></h2>
              <span className="column-badge">Active Projects</span>
            </div>
            <div className="leads-list">
              {convertedLeads.length > 0 ? (
                convertedLeads.map((lead) => (
                  <LeadCard
                    key={lead._id}
                    lead={lead}
                    onStatusChange={handleUpdateStatus}
                    onDelete={handleDeleteLead}
                    onRefresh={fetchLeads}
                    onDragStart={handleDragStart}
                  />
                ))
              ) : (
                <div className="empty-state">
                  <p>No active projects yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
