"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useMiddleware from "@/hooks/middleware";
import Link from "next/link";

export default function Manage_product() {
    useMiddleware();

    const [products, setProducts] = useState([
        {
            title: "",
            image: "",
            price: 0,
            description: "",
        },
    ]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`)
        .then((res) => {
            setProducts(res.data);
        })
    },[]);
    return (
        <div className="w-full px-6">
            <div className="flex justify-end py-10">
                <Link href="/create">
                    <Button size="lg">Create a new product</Button>
                </Link>
            </div>
            <div className="grid grid-cols-3 gap-10">
                {products.map((product, id) => (
                    <div key={id} className="bg-gray-200 p-10">
                        <h1 className="font-semibold text-2xl">{product.title}</h1>
                        <Image src={product.image} alt={product.title} width={200} height={200} />
                        <p className="text-lg">{product.description}</p>
                        <p className="font-bold">Rs.{product.price}</p>
                        <div className="flex justify-end">
                        <Link href={`/edit/${id}`}>
{                        <Button size="sm">Edit the product</Button>
}                        </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}