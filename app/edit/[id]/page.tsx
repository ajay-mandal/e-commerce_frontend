"use client";
import Edit_Component from "@/components/pages/Edit";
import useMiddleware from "@/hooks/middleware";
import { useParams } from "next/navigation";

export default function Manage_product() {
    useMiddleware();
    const _id  = useParams();
    return (
        <Edit_Component params={{ id: String(_id) }} />
    );
}
