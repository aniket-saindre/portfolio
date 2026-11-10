import "dotenv/config";
import app from "./api/index.js";
app.listen(5000, () => console.log("API running on http://localhost:5000"));
