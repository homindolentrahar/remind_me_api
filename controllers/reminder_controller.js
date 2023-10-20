const postgre = require("../database");
const reminderController = {
  getAllReminders: async (req, res) => {
    try {
      const { rows } = await postgre.query("SELECT * FROM reminder");

      res.json({
        status: 200,
        message: "",
        data: rows,
      });
    } catch (error) {
      res.json({
        status: error.status,
        message: error.message,
      });
    }
  },
  getReminder: async (req, res) => {
    try {
      const { rows } = await postgre.query(
        "SELECT * FROM reminder WHERE id=$1",
        [req.params.id]
      );

      if (rows[0]) {
        return res.json({
          status: 200,
          message: "",
          data: rows[0],
        });
      }

      res.json({
        status: 404,
        message: "Reminder not found",
      });
    } catch (error) {
      res.json({
        status: error.status,
        message: error.message,
      });
    }
  },
  enableReminder: async (req, res) => {
    try {
      const { name, enabled } = req.body;
      const query =
        "INSERT INTO reminder(name, enabled) VALUES($1, $2) RETURNING *";
      const { rows } = await postgre.query(query, [name, enabled]);

      res.json({
        status: 201,
        message: "Reminder enabled",
        data: rows[0],
      });
    } catch (error) {
      res.json({
        status: error.status,
        message: error.message,
      });
    }
  },
  toggleReminder: async (req, res) => {
    try {
      const { enabled } = req.body;
      const query =
        "UPDATE reminder SET enabled = $1 WHERE id = $2 RETURNING *";
      const { rows } = await postgre.query(query, [enabled, req.params.id]);

      if (rows[0]) {
        return res.json({
          status: 200,
          message: "Reminder toggled",
          data: rows[0],
        });
      }

      res.json({
        status: 404,
        message: "Reminder not found",
      });
    } catch (error) {
      res.json({
        status: error.status,
        message: error.message,
      });
    }
  },
};

module.exports = reminderController;
