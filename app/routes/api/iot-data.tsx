import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createIoTData } from "~/models/iotData.server";

export const action: ActionFunction = async ({ request }) => {
  const { deviceId, data } = await request.json();

  if (typeof deviceId !== "string" || typeof data !== "string") {
    return json({ error: "Invalid input" }, { status: 400 });
  }

  await createIoTData({ deviceId, data });

  return json({ success: true });
};
