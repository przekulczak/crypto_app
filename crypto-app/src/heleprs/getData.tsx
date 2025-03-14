const searchParams = new URLSearchParams("symbol=BTCUSDC");
const url = `https://api.binance.com/api/v3/trades?${searchParams}`;

export async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error: any) {
    throw new Error(`error: ${error}`);
  }
}
