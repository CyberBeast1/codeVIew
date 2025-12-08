import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";

export async function createSession(req, res) {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    if (!problem || !difficulty) {
      return res.status(400).json({
        msg: "Problem and difficulty are required to create a session",
      });
    }

    const callId = `session_${new Date().now()}_${Math.random()
      .toString(36)
      .substr(7)}`;

    const session = new Session({
      problem,
      difficulty,
      host: userId,
      callId,
    });

    await streamClient.video.call("default", callId),
      getOrCreate({
        data: {
          created_by: clerkId,
          custom: {
            problem,
            difficulty,
            sessionId: session._id.toString(),
          },
        },
      });

    const channel = chatClient.channel("messaging", callId, {
      name: `${problem} Session`,
      created_by: clerkId,
      members: [clerkId],
    });

    res
      .status(201)
      .json({ msg: "session and chat created successfully", session, channel });
  } catch (error) {
    console.error("Error creating session:", error);
    res
      .status(500)
      .json({ msg: "Internal Server Error - Failed to create session" });
  }
}

export async function getActiveSessions(_, res) {
  try {
    const sessions = await Session.find({ status: "active" })
      .populate("host", "name email clerkId profileImage")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ sessions });
  } catch (error) {
    error("Error fetching active sessions:", error);
    res
      .status(500)
      .json({ msg: "Internal Server Error - Failed to fetch active sessions" });
  }
}

export async function getRecentSessions(req, res) {
  try {
    const userId = req.user._id;
    const sessions = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { participants: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ sessions });
  } catch (error) {
    error("Error fetching recent sessions:", error);
    res
      .status(500)
      .json({ msg: "Internal Server Error - Failed to fetch recent sessions" });
  }
}

export async function getSessionById(req, res) {
  try {
    const { id } = req.params;

    const session = await Session.findById(id)
      .populate("host", "name email clerkId profileImage")
      .populate("participant", "name email clerkId profileImage");

    if (!session) return res.status(404).json({ msg: "Session not found" });

    res.status(200).json({ session });
  } catch (error) {
    error("Error fetching session by ID:", error);
    res
      .status(500)
      .json({ msg: "Internal Server Error - Failed to fetch session" });
  }
}

export async function joinSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ msg: "Session not found" });

    if (session.host.toString() === userId)
      return res.status(409).json({ msg: "Host cannot join as participant" });
    if (session.status !== "active")
      return res.status(409).json({ msg: "Cannot join a completed session" });
    if (session.participant)
      return res.status(409).json({ msg: "Session already has a participant" });

    session.participant = userId;
    await session.save();

    const channel = chatClient.channel("messaging", session.callId);
    await channel.addMembers([clerkId]);
    res
      .status(200)
      .json({ msg: "Joined session successfully", session, channel });
  } catch (error) {
    error("Error joining session:", error);
    res
      .status(500)
      .json({ msg: "Internal Server Error - Failed to join session" });
  }
}

export async function endSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const session = await Session.findById(id);

    if (!session) return res.status(404).json({ msg: "Session not found" });

    if (session.host.toString() !== userId)
      return res.status(403).json({ msg: "Only host can end the session." });

    if (session.status === "completed")
      return res.status(400).json({ msg: "session is already completed." });

    const call = streamClient.video.Call("default", session.callId);
    await call.delete({ hard: true });

    const channel = chatClient.channel("messaging", session.callId);
    await channel.delete();

    session.status = "completed";
    await session.save();
    res.status(200).json({ msg: "Session ended successfully", session });
  } catch (error) {
    error("Error ending session:", error);
    res
      .status(500)
      .json({ msg: "Internal Server Error - Failed to end session" });
  }
}
