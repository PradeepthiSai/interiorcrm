const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const leadRoutes = require("./routes/leadRoutes");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/auth");
const Lead = require("./models/Lead");
const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());

// Public routes
app.use("/api/auth", authRoutes);

// Protected routes
app.use("/api/leads", authMiddleware, leadRoutes);

// Add note to a lead
app.post("/api/leads/:id/notes", authMiddleware, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    lead.notes.push({ text: req.body.text });
    lead.lastNoteAddedAt = Date.now();
    await lead.save();

    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function seedSampleData() {
  let defaultUser = await User.findOne({ email: "admin@atelier.test" });
  if (!defaultUser) {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      defaultUser = new User({
        name: "Maison Atelier",
        email: "admin@atelier.test",
        password: "Luxury123!",
        role: "admin",
      });
      await defaultUser.save();
      console.log("Created default admin user: admin@atelier.test / Luxury123!");
    } else {
      defaultUser = await User.findOne();
    }
  }

  const leadCount = await Lead.countDocuments();
  if (leadCount === 0 && defaultUser) {
    const now = new Date();
    const sampleLeads = [
      {
        clientName: "Sofia Grant",
        email: "sofia.grant@example.com",
        phone: "+91 98765 43210",
        roomType: "Bedroom",
        estimatedBudget: 420000,
        status: "New",
        notes: [
          { text: "Initial inquiry for a luxury bedroom suite." },
        ],
        lastNoteAddedAt: new Date(now.getTime() - 1000 * 60 * 60 * 48),
        createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 72),
      },
      {
        clientName: "Aria Mills",
        email: "aria.mills@example.com",
        phone: "+91 91234 56789",
        roomType: "Living Room",
        estimatedBudget: 310000,
        status: "Contacted",
        notes: [
          { text: "Discussed warm luxe palette and furniture plan." },
          { text: "Follow-up scheduled for concept presentation." },
        ],
        lastNoteAddedAt: new Date(now.getTime() - 1000 * 60 * 60 * 4),
        createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 96),
      },
      {
        clientName: "Nina Chen",
        email: "nina.chen@example.com",
        phone: "+91 90123 45678",
        roomType: "Kitchen",
        estimatedBudget: 560000,
        status: "Converted",
        notes: [
          { text: "Approved final layout and premium materials." },
          { text: "Project kickoff scheduled for next week." },
        ],
        lastNoteAddedAt: new Date(now.getTime() - 1000 * 60 * 60 * 2),
        createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 120),
      },
    ];
    await Lead.insertMany(sampleLeads.map((lead) => ({ ...lead, userId: defaultUser._id })));
    console.log("Created sample leads for the dashboard.");
  }
}

app.get("/", (req, res) => {
  res.send("🏡 Interior Design CRM Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");
    await seedSampleData();
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
