"use client";

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
import { useAppSelector } from "@/redux/hooks";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { createOrder } from "@/app/[locale]/admin/actions/orders";

// الحل: تغيير التصدير إلى تصدير افتراضي
export default function CheckoutForm() {
  const router = useRouter();
  const { toast } = useToast();
  const cartItems = useAppSelector(selectCartItems);
  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryFee = subTotal > 100 ? 0 : 10;
  const totalAmount = subTotal + deliveryFee;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    try {
      const orderItems = cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const order = await createOrder({
        phone: formData.get("phone") as string,
        address: formData.get("address") as string,
        postalCode: formData.get("postal-code") as string,
        city: formData.get("city") as string,
        country: formData.get("country") as string,
        items: orderItems,
        totalAmount,
        subTotal,
        deliveryFee,
      });

      toast({
        title: "Order Created",
        description: `Your order #${order.id.slice(0, 8)} has been placed`,
      });

      router.push(`/orders/${order.id}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="grid gap-6 bg-gray-100 rounded-md p-4">
        <h2 className="text-2xl text-black font-semibold">
          Your cart is empty
        </h2>
      </div>
    );
  }

  return (
    <div className="grid gap-6 bg-gray-100 rounded-md p-4">
      <h2 className="text-2xl text-black font-semibold">Checkout</h2>
      <form onSubmit={handleSubmit}>{/* ... باقي الكود بدون تغيير ... */}</form>
    </div>
  );
}
