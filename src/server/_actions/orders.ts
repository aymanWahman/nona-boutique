// server/actions/orders.ts
export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { status }
  });

  // إرسال إشعار للعميل (بريد أو تطبيق)
  await sendNotification(updatedOrder.userId, {
    title: `تحديث حالة الطلب #${orderId}`,
    body: `الحالة الجديدة: ${status}`
  });

  return updatedOrder;
}