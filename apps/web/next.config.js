/** @type {import('next').NextConfig} */
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'http', 
                hostname: 'localhost', 
                pathname: '/public/**'
                
            },
        ],
        domains: [
            'www.yonex.com','upload.wikimedia.org','randomuser.me', 'wp.eventhub.net','flowbite.s3.amazonaws.com',
            'images.unsplash.com', 'lh3.googleusercontent.com'
        ], 
    },
}

