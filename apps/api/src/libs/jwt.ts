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

// Untuk mendoced token supaya terbaca 
export const jwtVerify = async (token: string) => {
    return jsonwebtoken.verify(token, "finpro-260202")
}

export const accessTokenJwt = async ({ id, role, email }: IJWT) => {
    return jsonwebtoken.sign({ id, role, email }, "finpro-260202", {
        expiresIn: "1d"
    })
}

export const refreshTokenJwt = async ({ id, role, email }: IJWT) => {
    return jsonwebtoken.sign({ id, role, email }, "finpro-260202", {
        expiresIn: "7d"
    })
}
 
export const createVerificationToken = async (id:string) => {
    return jsonwebtoken.sign({ id, type:'verification' }, "finpro-260202", {
        
    })
}
