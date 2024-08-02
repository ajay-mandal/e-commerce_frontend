"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "axios";
import useMiddleware from "@/hooks/middleware";
import Image from "next/image";

export default function CartPage() {
  useMiddleware();
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    console.log("Shipping Address:", shippingAddress);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/checkout`, {
        shippingAddress: {
          ...shippingAddress
        }
      });
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="flex justify-between">
        <div className="">
          <h1 className="font-bold text-xl">Your Items</h1>
          <div>
            {cartItems.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <Image src={item.image} alt={item.title} width={64} height={64} className="object-cover" />
                  <div className="ml-4">
                    <h1 className="font-bold">{item.title}</h1>
                    <p>{item.price}</p>
                  </div>
                </div>
                <div>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Card className="mt-8 w-1/3">
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="street">Street</Label>
                <Input id="street" name="street" onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input id="zipCode" name="zipCode" onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" onChange={handleInputChange} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-end">
        <Button className="mt-4" onClick={handleCheckout}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
