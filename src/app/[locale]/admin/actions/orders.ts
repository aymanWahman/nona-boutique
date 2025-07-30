'use server';

import { db } from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';
// import NextAuth from "next-auth";
import { auth } from "@/auth";

export async function createOrder({
  phone,
  address,
  postalCode,
  city,
  country,
  items,
  totalAmount,
  subTotal,
  deliveryFee
}: {
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  subTotal: number;
  deliveryFee: number;
}) {
  const session = await auth();
   if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }
  

  return await db.$transaction(async (tx) => {
    // 1. إنشاء الطلب الأساسي
    const order = await tx.order.create({
      data: {
        userEmail: session.user.email, // هذا الحقل إلزامي
        phone,
        streetAddress: address,
        postalCode,
        city,
        country,
        subTotal,
        deliveryFee,
        totalPrice: totalAmount,
        status: OrderStatus.PENDING,
      }
    });

    // 2. إضافة المنتجات للطلب
    await tx.orderProduct.createMany({
      data: items.map(item => ({
        orderId: order.id,
        productId: item.id,
        quantity: item.quantity,
        userId: session.user?.id, // إضافة userId إذا كان موجودًا
      })),
    });

    return order;
  });
}