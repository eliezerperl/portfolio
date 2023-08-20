import { NextResponse } from "next/server"
import connect from '@/utils/db'
import Post from "@/models/Post";
import { limiter } from "../config/limiter";

export const GET = async (request) => {

    const origin = request.headers.get('origin')

    const remaining = await limiter.removeTokens(1);
    console.log(remaining)

    if (remaining < 0) {
        return new NextResponse(null, {
            status: 429,
            statusText: "Too Many Requests",
            headers: {
                'Access-Control-Allow-Origin': origin || '*',
                'Content-Type': 'text/plain'
            }
        })
    }

    const url = new URL(request.url);

    const username = url.searchParams.get("username");

    try {
        await connect();

        const posts = await Post.find(username && {username});
        return new NextResponse(JSON.stringify(posts), { 
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': origin || '*',
                'Content-Type': 'application/json'
            }
         });

    } catch (error) {
        return new NextResponse('Database error', { status: 500 });
    }

}




export const POST = async (request) => {

    const body = await request.json();

    const newPost = new Post(body);

    try {
        await connect();

        await newPost.save()
        return new NextResponse("Post has been created", { status: 201 });

    } catch (error) {
        return new NextResponse('Database error', { status: 500 });
    }

}