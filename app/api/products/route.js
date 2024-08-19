export async function GET() {
  const productUrl = `${process.env.NEXT_PUBLIC_WEB_APP_URL}?sheetName=Products`
  try {
    const response = await fetch(productUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();

    return Response.json({data: json})
  } catch (error) {
    console.error(error.message);
  }
}
