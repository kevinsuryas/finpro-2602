import jsonwebtoken from "jsonwebtoken"

interface IJWT {
    id: string,
    role: string,
    email: string
}

export const jwtCreate = async ({ id, role, email }: IJWT) => {
    return jsonwebtoken.sign({ id, role, email }, "finpro-260202", {
        expiresIn: "3h"
    })
}

export const jwtVerify = async (token: string) => {
    return jsonwebtoken.verify(token, "finpro-260202")
}