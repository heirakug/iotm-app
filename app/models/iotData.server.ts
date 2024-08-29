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

// 特定のIoTDataを取得する関数
export async function getIoTData(id: string) {
  return prisma.ioTData.findUnique({
    where: { id },
  });
}

// IoTDataを更新する関数
export async function updateIoTData({
  id,
  deviceId,
  data,
}: {
  id?: string;
  deviceId?: string;
  data?: string;
}) {
  return prisma.ioTData.update({
    where: { id },
    data: {
      ...(deviceId !== undefined && { deviceId }),
      ...(data !== undefined && { data }),
    },
  });
}

// IoTDataを削除する関数
export async function deleteIoTData(id: string) {
  return prisma.ioTData.delete({
    where: { id },
  });
}

// ユーザーに関連するIoTDataを取得する関数
export async function getIoTDataListByUserId(userId: string) {
  return prisma.ioTData.findMany({
    where: { userId },
    orderBy: {
      timestamp: 'desc',
    },
  });
}