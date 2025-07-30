// app/[locale]/cart/actions.ts
'use server';

import { db } from '@/lib/prisma';
import { auth } from "@/auth";

type CreateOrderParams = {
  userEmail: string;
  phone: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  subTotal: number;
  deliveryFee: number;
  totalPrice: number;
  products: Array<{
    productId: string;
    quantity: number;
    size?: string;
    color?: string;
  }>;
};

export async function createOrder(orderData: CreateOrderParams) {
  const session = await auth();
  
  if (!session?.user) {
    throw new Error('يجب تسجيل الدخول أولاً');
  }

  return await db.$transaction(async (tx) => {
    // 1. إنشاء الطلب
    const order = await tx.order.create({
      data: {
        userEmail: orderData.userEmail,
        phone: orderData.phone,
        streetAddress: orderData.streetAddress,
        postalCode: orderData.postalCode,
        city: orderData.city,
        country: orderData.country,
        subTotal: orderData.subTotal,
        deliveryFee: orderData.deliveryFee,
        totalPrice: orderData.totalPrice,
        status: 'PENDING',
      },
    });

    // 2. إضافة المنتجات للطلب
    await tx.orderProduct.createMany({
      data: orderData.products.map(product => ({
        orderId: order.id,
        productId: product.productId,
        quantity: product.quantity,
        userId: session.user.id,
      })),
    });

    return order;
  });
}