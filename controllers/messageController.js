const pool = require("../db/db"); // Import the database connection pool

// Get all messages and render the index page
exports.getMessages = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages ORDER BY added DESC");
    res.render("index", { title: "Mini Messageboard", messages: result.rows });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Render the new message form
exports.newMessageForm = (req, res) => {
  res.render("form", { title: "New Message" });
};

// Add a new message to the database
exports.addMessage = async (req, res) => {
  const { messageUser, messageText } = req.body;
  try {
    await pool.query(
      "INSERT INTO messages (text, username, added) VALUES ($1, $2, $3)",
      [messageText, messageUser, new Date()]
    );
    res.redirect("/");
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get message details by ID and render the details page
exports.getMessageDetails = async (req, res) => {
  const messageId = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM messages WHERE id = $1", [messageId]);
    if (result.rows.length > 0) {
      res.render("message", { title: "Message Details", message: result.rows[0] });
    } else {
      res.status(404).send("Message not found");
    }
  } catch (error) {
    console.error("Error fetching message details:", error);
    res.status(500).send("Internal Server Error");
  }
};
