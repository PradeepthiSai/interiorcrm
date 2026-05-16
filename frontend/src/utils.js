// Utility functions for the CRM

export const API_URL = process.env.REACT_APP_API_URL?.replace(/\/+$/, "") || "";

export const getApiUrl = (endpoint) => `${API_URL}${endpoint}`;

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const isAwaitingAction = (lead) => {
  if (lead.status !== "New") return false;
  
  const now = new Date();
  const createdAt = new Date(lead.createdAt);
  const hoursDiff = (now - createdAt) / (1000 * 60 * 60);
  
  return hoursDiff > 48 && (!lead.notes || lead.notes.length === 0);
};

export const getLeadAgingTime = (lead) => {
  const now = new Date();
  const createdAt = new Date(lead.createdAt);
  const diff = now - createdAt;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getRoomIcon = (roomType) => {
  const icons = {
    Kitchen: "🍽️",
    "Living Room": "🛋️",
    Bedroom: "🛏️",
    Bathroom: "🚿",
    Office: "💼",
  };
  return icons[roomType] || "🏠";
};

export const getPriorityScore = (budget) => {
  if (!budget) return "Standard";
  if (budget >= 500000) return "VIP";
  if (budget >= 250000) return "Premium";
  return "Standard";
};

export const getDesignSuggestion = (roomType) => {
  const suggestions = {
    Kitchen: "Minimal Modern",
    "Living Room": "Warm Luxe",
    Bedroom: "Serene Retreat",
    Bathroom: "Spa Elegance",
    Office: "Contemporary Studio",
  };
  return suggestions[roomType] || "Premium Tailored Style";
};

export const getStatusColor = (status) => {
  const colors = {
    New: "var(--status-new)",
    Contacted: "var(--status-contacted)",
    Converted: "var(--status-converted)",
  };
  return colors[status] || "var(--gold)";
};
