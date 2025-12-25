import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import Widget from "@/models/Widget";

// Helper to get user from token
function getUserFromToken(request: Request) {
  const token = request.headers.get("authorization")?.split(" ")[1];
  if (!token) throw new Error("Not authenticated");

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    userId: string;
  };
  return decoded.userId;
}

// GET all widgets for user
export async function GET(request: Request) {
  try {
    const userId = getUserFromToken(request);
    await connectDB();

    const widgets = await Widget.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      widgets: widgets.map((w) => ({
        id: w.widgetId,
        type: w.type,
        title: w.title,
        x: w.x,
        y: w.y,
        width: w.width,
        height: w.height,
        data: w.data,
      })),
    });
  } catch (error: any) {
    console.error("Get widgets error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch widgets" },
      { status: error.message === "Not authenticated" ? 401 : 500 }
    );
  }
}

// POST create new widget
export async function POST(request: Request) {
  try {
    const userId = getUserFromToken(request);
    const body = await request.json();

    await connectDB();

    const widget = await Widget.create({
      userId,
      widgetId: body.id,
      type: body.type,
      title: body.title,
      x: body.x,
      y: body.y,
      width: body.width,
      height: body.height,
      data: body.data,
    });

    return NextResponse.json({
      success: true,
      widget: {
        id: widget.widgetId,
        type: widget.type,
        title: widget.title,
        x: widget.x,
        y: widget.y,
        width: widget.width,
        height: widget.height,
        data: widget.data,
      },
    });
  } catch (error: any) {
    console.error("Create widget error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create widget" },
      { status: error.message === "Not authenticated" ? 401 : 500 }
    );
  }
}

// PUT update widgets (batch update)
export async function PUT(request: Request) {
  try {
    const userId = getUserFromToken(request);
    const { widgets } = await request.json();

    await connectDB();

    // Delete all existing widgets for user
    await Widget.deleteMany({ userId });

    // Create new widgets
    const widgetDocs = widgets.map((w: any) => ({
      userId,
      widgetId: w.id,
      type: w.type,
      title: w.title,
      x: w.x,
      y: w.y,
      width: w.width,
      height: w.height,
      data: w.data,
    }));

    await Widget.insertMany(widgetDocs);

    return NextResponse.json({
      success: true,
      message: "Widgets updated successfully",
    });
  } catch (error: any) {
    console.error("Update widgets error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update widgets" },
      { status: error.message === "Not authenticated" ? 401 : 500 }
    );
  }
}

// DELETE widget
export async function DELETE(request: Request) {
  try {
    const userId = getUserFromToken(request);
    const { searchParams } = new URL(request.url);
    const widgetId = searchParams.get("id");

    if (!widgetId) {
      return NextResponse.json(
        { error: "Widget ID required" },
        { status: 400 }
      );
    }

    await connectDB();

    await Widget.deleteOne({ userId, widgetId });

    return NextResponse.json({
      success: true,
      message: "Widget deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete widget error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete widget" },
      { status: error.message === "Not authenticated" ? 401 : 500 }
    );
  }
}
