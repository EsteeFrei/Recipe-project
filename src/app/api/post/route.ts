import { connectToDB, disconnectFromDB } from "@/app/DB/connection/conDB";
import Recipe from "@/app/DB/models/recipeModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        
        // Read and parse the request body
        const  body = await req.json();
        if (!body) throw new Error("Missing body");

        const newRecipe = new Recipe(body);
        console.log("in create recipe in server", body);
        
        await newRecipe.save();
        console.log("created", newRecipe);

        await disconnectFromDB();
        
        return NextResponse.json(
            { status: 201, message: "recipe created successfully", recipe:newRecipe },
            { status: 201 } // Set the HTTP status to 201 for success
        );
    } catch (err) {
        console.error("Error creating recipe:", err);
        
        return NextResponse.json(
            { status: 500, message: "Server error creating recipe", error: err },
            { status: 500 } 
        );
    }
}
