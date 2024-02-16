import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";

const authOption: AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        })
    ],
    secret: process.env.NEXTAUTH_SECRET
}

export const handler = NextAuth(authOption)

export { handler as GET, handler as POST }