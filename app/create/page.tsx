"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useMiddleware from "@/hooks/middleware";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Create(){
    useMiddleware();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const navigate = useRouter();
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const onClick = async () => {
        if (typeof window !== 'undefined' && window.localStorage){
            console.log(title, description, image, price)
            await axios.post(`${BACKEND_URL}/products`, {
                title,
                description,
                image,
                price
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
        navigate.push(`/manage_product`)
        }
    }

    return <div>
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full px-4">
                <Input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" placeholder="Title"/>
                <div className="py-4">
                <Input onChange={(e) => {
                    setDescription(e.target.value)
                }}
                placeholder="Description"/>
                </div>
                <div className="py-4">
                <Input onChange={(e) => {
                    setImage(e.target.value)
                }}
                placeholder="Image"/>
                </div>
                <div className="py-4">
                <Input onChange={(e) => {
                    setPrice(parseFloat(e.target.value))
                }}
                placeholder="Price"/>
                </div>
                <Button onClick={onClick}>
                    Add Product
                </Button>
            </div>
        </div>
    </div>
}