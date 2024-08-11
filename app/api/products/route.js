import { google } from "googleapis";

export async function GET() {
const glAuth = await google.auth.getClient({
  projectId: process.env.PROJECT_ID,
  credentials: {
    private_key_id: process.env.CLIENT_ID,
    private_key:
    process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.CLIENT_EMAIL,
    universe_domain: "googleapis.com",
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const glSheets = google.sheets({ version: "v4", auth: glAuth });

const data = await glSheets.spreadsheets.values.get({
  spreadsheetId: process.env.DATABASE_ID,
  range: "Products",
});

 console.log(data.data.values)

 const [titles, ...Products] = data.data.values;
 const formattedItems = Products.map((row) => {
   const obj = {};
   row.forEach((field, idx) => (obj[titles[idx]] = field));
   return obj;
 });
 return Response.json({ data: formattedItems });
}
