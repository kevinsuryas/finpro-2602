import jsonwebtoken from "jsonwebtoken"

interface IJWT {
    id: string,
    role: string
}

export const jwtCreate = async ({ id, role }: IJWT) => {
    return jsonwebtoken.sign({ id, role }, "finpro-260202", {
        expiresIn: "3h"
    })
}

export const jwtVerify = async (token: string) => {
    return jsonwebtoken.verify(token, "finpro-260202")
}