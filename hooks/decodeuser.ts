import { jwtDecode } from "jwt-decode";

export default function DecodeUser() {
    let email = "";
    let role = "";

    if (typeof localStorage !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken: any = jwtDecode(token);
            email = decodedToken.email;
            role = decodedToken.role;
        }
    }

    return { email, role };
}