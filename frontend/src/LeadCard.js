import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./LeadCard.css";
import {
  getRoomIcon,
  getPriorityScore,
  isAwaitingAction,
  getLeadAgingTime,
  formatDate,
  formatTime,
  getAuthHeader,
  getDesignSuggestion,
  getApiUrl,
} from "./utils";

function LeadCard({ lead, onStatusChange, onDelete, onRefresh, onDragStart }) {
  const [showNotes, setShowNotes] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState(lead.notes || []);
  const [statusUpdated, setStatusUpdated] = useState(false);
  const previousStatus = useRef(lead.status);

  useEffect(() => {
    setNotes(lead.notes || []);
  }, [lead.notes]);

  useEffect(() => {
    if (previousStatus.current && previousStatus.current !== lead.status) {
      setStatusUpdated(true);
      const timer = setTimeout(() => setStatusUpdated(false), 800);
      return () => clearTimeout(timer);
    }
    previousStatus.current = lead.status;
  }, [lead.status]);

  const handleAddNote = async () => {
    if (!noteText.trim()) return;

    try {
      const response = await axios.post(
        getApiUrl(`/api/leads/${lead._id}/notes`),
        { text: noteText },
        { headers: getAuthHeader() }
      );
      setNotes(response.data.notes);
      setNoteText("");
      onRefresh();
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  const priorityScore = getPriorityScore(lead.estimatedBudget);
  const awaiting = isAwaitingAction(lead);
  const agingTime = getLeadAgingTime(lead);
  const designSuggestion = getDesignSuggestion(lead.roomType);

  return (
    <div
      className={`lead-card ${statusUpdated ? "status-updated" : ""}`}
      draggable
      onDragStart={(e) => onDragStart?.(e, lead)}
    >
      <div className="card-header">
        <div className="lead-title">
          <div className="room-icon">{getRoomIcon(lead.roomType)}</div>
          <div className="title-content">
            <h3>{lead.clientName}</h3>
            <p className="room-type">{lead.roomType}</p>
          </div>
        </div>
        <button
          className="menu-btn"
          onClick={() => onDelete(lead._id)}
          title="Delete lead"
        >
          ✕
        </button>
      </div>

      <div className="card-badges">
        <span className={`badge badge-priority badge-${priorityScore}`}>
          {priorityScore}
        </span>
        <span className="badge badge-age">⏱️ {agingTime}</span>
      </div>
      <div className="suggestion-chip">
        <span>Suggested Style: {designSuggestion}</span>
      </div>

      {awaiting && (
        <div className="awaiting-action">
          <span className="alert-icon">🚨</span>
          <span>Awaiting Action - No contact in 48h</span>
        </div>
      )}

      <div className="card-details">
        <div className="detail-row">
          <span className="label label-email">Email:</span>
          <span className="value">{lead.email}</span>
        </div>
        {lead.phone && (
          <div className="detail-row">
            <span className="label label-phone">Phone:</span>
            <span className="value">{lead.phone}</span>
          </div>
        )}
        {lead.estimatedBudget && (
          <div className="detail-row">
            <span className="label label-budget">Budget:</span>
            <span className="value">₹{lead.estimatedBudget.toLocaleString()}</span>
          </div>
        )}
      </div>

      <div className="card-notes-preview">
        <button
          className="notes-btn"
          onClick={() => setShowNotes(!showNotes)}
        >
          📝 Notes ({notes.length})
        </button>
        {notes.length > 0 && (
          <div className="last-note">
            <small>Last: {notes[notes.length - 1].text.substring(0, 40)}...</small>
          </div>
        )}
      </div>

      <div className="card-status-actions">
        <select
          className="status-select"
          value={lead.status}
          onChange={(e) => onStatusChange(lead._id, e.target.value)}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Converted">Converted</option>
        </select>
      </div>

      {showNotes && (
        <div className="notes-modal-overlay">
          <div className="notes-modal">
            <div className="modal-header">
              <h4>Notes Timeline for {lead.clientName}</h4>
              <button
                className="close-btn"
                onClick={() => setShowNotes(false)}
              >
                ✕
              </button>
            </div>

            <div className="notes-timeline">
              {notes.length > 0 ? (
                notes.map((note, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <p className="note-text">{note.text}</p>
                      <small className="note-date">
                        {formatDate(note.createdAt)} · {formatTime(note.createdAt)}
                      </small>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-notes">
                  <p>No notes yet. Add one below!</p>
                </div>
              )}
            </div>

            <div className="note-input">
              <textarea
                placeholder="Add a follow-up note..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <button className="btn-add-note" onClick={handleAddNote}>
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeadCard;
