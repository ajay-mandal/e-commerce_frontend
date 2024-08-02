"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface Product{
    "title":string;
    "description":string;
    "price":number;
    "image":string;
    "_id":string;
}
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

export function useProductById({id}:{id:string}) {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<Product>();

    useEffect(()=>{
        if (typeof window !== 'undefined' && window.localStorage){
            axios.get(`${BACKEND}/products/${id}`,{
                headers:{
                    Authorization: localStorage.getItem("token")
                }
            })
            .then((response)=>{
                setProduct(response.data);
                setLoading(false);
            })
        }
    }, [id])
    return {
        loading,
        product
    }
}

export function useProductBulk(){
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product>();

    useEffect(()=>{
        if (typeof window !== 'undefined' && window.localStorage){
            axios.get(`${BACKEND}/products`)
            .then((response)=>{
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error)=>{
                toast(`Error while fetching data: ${error}`);
                setLoading(false);
            })
        }

    },[])
    return{
        loading,
        products
    }
}