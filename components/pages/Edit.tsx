"use client";
import { useProductById } from "@/hooks/loadproduct";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Edit_Component({params}:{params:{id:string}}){
    const navigate = useRouter();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    

    const { product } = useProductById({id:params.id});

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(()=>{
        if(product){
            setTitle(product.title);
            setDescription(product.description);
            setImage(product.image);
            setPrice(product.price.toString());
        }
    },[product])
    const handleClick = async (e: any) => {
        e.preventDefault()
        try{
            if (typeof window !== 'undefined' && window.localStorage){
                axios.put(`${BACKEND_URL}/products/${params.id}`, {
                    title: title,
                    description: description,
                    image: image,
                    price: price,
                }, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    }
                })
                navigate.push(`/manage_product`);
            }
        }catch(e){
            console.log(e);
        }
    }

    return <div>
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full px-4">
                <Input onChange={(e:any) => {
                    setTitle(e.target.value)
                }} type="text" value={title} />
                <div className="py-4">
                <Input onChange={(e:any) => {
                    setDescription(e.target.value)
                }} type="text" value={description} />
                <Input onChange={(e:any) => {
                    setImage(e.target.value)
                }} type="text" value={image} />
                <Input onChange={(e:any) => {
                    setPrice(e.target.value)
                }} type="text" value={price} />
                </div>
                <Button onClick={handleClick}>
                    Update Product
                </Button>
            </div>
        </div>
    </div>
}
