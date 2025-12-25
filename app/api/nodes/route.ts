import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import Node from "@/models/Node";

// Helper to get user from token
function getUserFromToken(request: Request) {
  const token = request.headers.get("authorization")?.split(" ")[1];
  if (!token) throw new Error("Not authenticated");

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    userId: string;
  };
  return decoded.userId;
}

// GET all nodes for user
export async function GET(request: Request) {
  try {
    const userId = getUserFromToken(request);
    await connectDB();

    const nodes = await Node.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      nodes: nodes.map((n) => ({
        id: n.nodeId,
        type: n.type,
        x: n.x,
        y: n.y,
        width: n.width,
        height: n.height,
        content: n.content,
        color: n.color,
        topicId: n.topicId,
        completed: n.completed,
      })),
    });
  } catch (error: any) {
    console.error("Get nodes error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch nodes" },
      { status: error.message === "Not authenticated" ? 401 : 500 }
    );
  }
}

// POST create new node
export async function POST(request: Request) {
  try {
    const userId = getUserFromToken(request);
    const body = await request.json();

    await connectDB();

    const node = await Node.create({
      userId,
      nodeId: body.id,
      type: body.type,
      x: body.x,
      y: body.y,
      width: body.width,
      height: body.height,
      content: body.content || "",
      color: body.color,
      topicId: body.topicId,
      completed: body.completed || false,
    });

    return NextResponse.json({
      success: true,
      node: {
        id: node.nodeId,
        type: node.type,
        x: node.x,
        y: node.y,
        width: node.width,
        height: node.height,
        content: node.content,
        color: node.color,
        topicId: node.topicId,
        completed: node.completed,
      },
    });
  } catch (error: any) {
    console.error("Create node error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create node" },
      { status: error.message === "Not authenticated" ? 401 : 500 }
    );
  }
}

// PUT update nodes (batch update)
export async function PUT(request: Request) {
  try {
    const userId = getUserFromToken(request);
    const { nodes } = await request.json();

    await connectDB();

    // Delete all existing nodes for user
    await Node.deleteMany({ userId });

    // Create new nodes
    const nodeDocs = nodes.map((n: any) => ({
      userId,
      nodeId: n.id,
      type: n.type,
      x: n.x,
      y: n.y,
      width: n.width,
      height: n.height,
      content: n.content || "",
      color: n.color,
      topicId: n.topicId,
      completed: n.completed || false,
    }));

    if (nodeDocs.length > 0) {
      await Node.insertMany(nodeDocs);
    }

    return NextResponse.json({
      success: true,
      message: "Nodes updated successfully",
    });
  } catch (error: any) {
    console.error("Update nodes error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update nodes" },
      { status: error.message === "Not authenticated" ? 401 : 500 }
    );
  }
}

// DELETE node
export async function DELETE(request: Request) {
  try {
    const userId = getUserFromToken(request);
    const { searchParams } = new URL(request.url);
    const nodeId = searchParams.get("id");

    if (!nodeId) {
      return NextResponse.json({ error: "Node ID required" }, { status: 400 });
    }

    await connectDB();

    await Node.deleteOne({ userId, nodeId });

    return NextResponse.json({
      success: true,
      message: "Node deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete node error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete node" },
      { status: error.message === "Not authenticated" ? 401 : 500 }
    );
  }
}
