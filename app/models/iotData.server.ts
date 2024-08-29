import { prisma } from "~/db.server";

export type { IoTData } from "@prisma/client";

export async function createIoTData({
    deviceId,
    data,
    userId,
  }: {
    deviceId: string;
    data: string;
    userId: string;
  }) {
    return prisma.ioTData.create({
      data: {
        deviceId,
        data,
        userId,
      },
    });
  }

export async function getIoTDataList() {
    return prisma.ioTData.findMany({
      orderBy: {
        timestamp: 'desc',
      },
    });
  }
