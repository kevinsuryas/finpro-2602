import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github"

const authOption = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT as string,
            clientSecret: process.env.GITHUB_SECRET as string
        })
    ],
    secret: process.env.NEXTAUTH_SECRET
}

export const handler = NextAuth(authOption)

export { handler as GET, handler as POST }