import Event from "@/db/event.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const contentType = req.headers.get("content-type");

    let eventData: any;

    if (contentType?.includes("multipart/form-data")) {
      const formData = await req.formData();
      eventData = Object.fromEntries(formData.entries());
    }
    else if (contentType?.includes("application/json")) {
      eventData = await req.json();
    } else {
      return NextResponse.json(
        { error: "Unsupported content type" },
        { status: 400 }
      );
    }

    if (!eventData.title || !eventData.date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const createdEvent = await Event.create(eventData);

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: createdEvent,
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error creating event:", error);

    return NextResponse.json(
      {
        error: "Event creation failed",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
