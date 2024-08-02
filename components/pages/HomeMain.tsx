"use client";
import axios from "axios";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { Button } from "../ui/button";
import  { useCart } from "@/hooks/useCart";

export default function HomeMain() {

    const [products, setProducts] = useState([
        {
            id: "",
            title: "",
            image: "",
            price: 0,
            description: "",
        },
    ]);
    const { cartValue, updateCart } = useCart();
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`)
        .then((res) => {
            setProducts(res.data);
        })
    },[]);

    const addToCart = () => {
        updateCart(cartValue + 1);
      };
    return (
        <div className="w-full px-6">
            <div className="grid grid-cols-3 gap-10">
                {products.map((product, id) => (
                    <div key={id} className="bg-gray-200 p-10">
                        <h1 className="font-semibold text-2xl">{product.title}</h1>
                        <Image src={product.image} alt={product.title} width={200} height={200} />
                        <p className="text-lg">{product.description}</p>
                        <p className="font-bold">Rs.{product.price}</p>
                        <div className="flex justify-end">
                            <Button onClick={addToCart}>Add to Cart</Button>                      
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}