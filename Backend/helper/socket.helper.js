/**
 * Socket.IO Helper
 * Manages all socket connections and events for real-time chat
 */

const mongoose = require("mongoose");
const chatSchema = require("../schema/chatSchema");
const userSchema = require("../schema/userSchema");

// Store active users
const activeUsers = new Map();

const initializeSocket = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Middleware to authenticate socket connection
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    const userId = socket.handshake.auth.userId;

    if (!userId) {
      return next(new Error("Authentication required"));
    }

    socket.userId = userId;
    next();
  });

  // Handle socket connections
  io.on("connection", (socket) => {

    activeUsers.set(socket.userId, {
      socketId: socket.id,
      connectedAt: new Date(),
    });

    // Emit updated user list to all connected users
    emitActiveUsers(io);

    // ==================== USER EVENTS ====================

    /**
     * Get active users list
     */
    socket.on("get-active-users", async () => {
      try {
        const activeUsersList = await getActiveUsersWithDetails();
        socket.emit("active-users", activeUsersList);
      } catch (error) {
        console.error("Error getting active users:", error);
        socket.emit("error", { message: "Failed to get active users" });
      }
    });

    /**
     * Get all users (for contact list)
     */
    socket.on("get-all-users", async () => {
      try {
        const users = await userSchema.find({ _id: { $ne: socket.userId } }).select("_id name email user_pic").lean();
        // const messagedata = await chatSchema.find({
        //   $or: [
        //     { sender: socket.userId },
        //     { receiver: socket.userId }
        //   ]
        // }).populate("sender receiver", "_id name email").lean();
        socket.emit("all-users", users);
      } catch (error) {
        console.error("Error getting all users:", error);
        socket.emit("error", { message: "Failed to get users" });
      }
    });

    // ==================== CHAT EVENTS ====================

    /**
     * Send message
     */
    socket.on("send-message", async (data) => {
      try {
        const { receiverId, message, type = "personal", message_type = "text" } = data;

        if (!receiverId || !message) {
          socket.emit("error", { message: "Receiver and message are required" });
          return;
        }

        // Save message to database
        const newChat = new chatSchema({
          sender: socket.userId,
          receiver: receiverId,
          message: message,
          type: type || "personal",
          message_type: message_type || "text",
          sent_at: new Date(),
          created_by: socket.userId,
        });

        const savedChat = await newChat.save();
        await savedChat.populate("sender receiver", "_id name email");

        // Emit to sender
        socket.emit("message-sent", {
          messageId: savedChat._id,
          message: savedChat,
        });

        // Emit to receiver if online
        const receiverSocket = activeUsers.get(receiverId);
        if (receiverSocket) {
          io.to(receiverSocket.socketId).emit("receive-message", {
            messageId: savedChat._id,
            message: savedChat,
          });
        }

        // Emit notification to receiver
        io.to(receiverSocket?.socketId).emit("new-message-notification", {
          senderId: socket.userId,
          messagePreview: message.substring(0, 50),
          timestamp: new Date(),
        });
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    /**
     * Get chat history between two users
     */
    socket.on("get-chat-history", async (data) => {
      try {
        const { otherUserId, page = 1, limit = 50 } = data;

        if (!otherUserId) {
          socket.emit("error", { message: "Other user ID is required" });
          return;
        }

        const skip = (page - 1) * limit;
        const currentUserObjectId = mongoose.Types.ObjectId(socket.userId);
        const otherUserObjectId = mongoose.Types.ObjectId(otherUserId);

        const chatHistory = await chatSchema
          .find({
            $or: [
              { sender: currentUserObjectId, receiver: otherUserObjectId },
              { sender: otherUserObjectId, receiver: currentUserObjectId },
            ],
          })
          .populate("sender receiver", "_id name email")
          .sort({ sent_at: -1 })
          .skip(skip)
          .limit(limit)
          .lean();

        const totalCount = await chatSchema.countDocuments({
          $or: [
            { sender: currentUserObjectId, receiver: otherUserObjectId },
            { sender: otherUserObjectId, receiver: currentUserObjectId },
          ],
        });

        socket.emit("chat-history", {
          messages: chatHistory.reverse(),
          totalCount: totalCount,
          page: page,
          limit: limit,
        });
      } catch (error) {
        console.error("Error getting chat history:", error);
        socket.emit("error", { message: "Failed to get chat history" });
      }
    });

    /**
     * Mark messages as read
     */
    socket.on("mark-as-read", async (data) => {
      try {
        const { senderId } = data;
        const currentUserObjectId = mongoose.Types.ObjectId(socket.userId);
        const senderObjectId = mongoose.Types.ObjectId(senderId);

        await chatSchema.updateMany(
          {
            sender: senderObjectId,
            receiver: currentUserObjectId,
            unread_count: { $gt: 0 },
          },
          { unread_count: 0 }
        );

        socket.emit("messages-marked-read", { senderId });
      } catch (error) {
        console.error("Error marking messages as read:", error);
        socket.emit("error", { message: "Failed to mark messages as read" });
      }
    });

    /**
     * Typing indicator
     */
    socket.on("typing", (data) => {
      try {
        const { receiverId, isTyping } = data;

        const receiverSocket = activeUsers.get(receiverId);
        if (receiverSocket) {
          io.to(receiverSocket.socketId).emit("user-typing", {
            senderId: socket.userId,
            isTyping: isTyping,
          });
        }
      } catch (error) {
        console.error("Error handling typing indicator:", error);
      }
    });

    /**
     * Delete message
     */
    socket.on("delete-message", async (data) => {
      try {
        const { messageId } = data;

        const message = await chatSchema.findByIdAndDelete(messageId);

        if (message) {
          const receiverSocket = activeUsers.get(message.receiver);

          socket.emit("message-deleted", { messageId });

          if (receiverSocket) {
            io.to(receiverSocket.socketId).emit("message-deleted", {
              messageId,
            });
          }
        }
      } catch (error) {
        console.error("Error deleting message:", error);
        socket.emit("error", { message: "Failed to delete message" });
      }
    });

    /**
     * Edit message
     */
    socket.on("edit-message", async (data) => {
      try {
        const { messageId, newMessage } = data;

        const updatedMessage = await chatSchema
          .findByIdAndUpdate(
            messageId,
            { message: newMessage, updated_at: new Date() },
            { new: true }
          )
          .populate("sender receiver", "_id name email");

        if (updatedMessage) {
          const receiverSocket = activeUsers.get(updatedMessage.receiver);

          socket.emit("message-edited", { message: updatedMessage });

          if (receiverSocket) {
            io.to(receiverSocket.socketId).emit("message-edited", {
              message: updatedMessage,
            });
          }
        }
      } catch (error) {
        console.error("Error editing message:", error);
        socket.emit("error", { message: "Failed to edit message" });
      }
    });

    // ==================== CONVERSATION LIST ====================

    /**
     * Get conversation list (last message from each user)
     */
    socket.on("get-conversations", async () => {
      try {
        const currentUserObjectId = mongoose.Types.ObjectId(socket.userId);
        const conversations = await chatSchema.aggregate([
          {
            $match: {
              $or: [
                { sender: currentUserObjectId },
                { receiver: currentUserObjectId },
              ],
            },
          },
          {
            $sort: { sent_at: -1 },
          },
          {
            $project: {
              sender: 1,
              receiver: 1,
              message: 1,
              sent_at: 1,
              unread_count: 1,
              partnerId: {
                $cond: [
                  { $eq: ["$sender", currentUserObjectId] },
                  "$receiver",
                  "$sender",
                ],
              },
              isUnreadForMe: {
                $and: [
                  { $eq: ["$receiver", currentUserObjectId] },
                  { $gt: ["$unread_count", 0] },
                ],
              },
            },
          },
          {
            $group: {
              _id: "$partnerId",
              lastMessage: { $first: "$$ROOT" },
              unreadCount: {
                $sum: {
                  $cond: ["$isUnreadForMe", "$unread_count", 0],
                },
              },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          {
            $unwind: "$userDetails",
          },
          {
            $project: {
              _id: 1,
              "userDetails._id": 1,
              "userDetails.name": 1,
              "userDetails.email": 1,
              "userDetails.user_pic": 1,
              lastMessage: "$lastMessage.message",
              lastMessageTime: "$lastMessage.sent_at",
              unreadCount: 1,
            },
          },
          {
            $sort: { lastMessageTime: -1 },
          },
        ]);

        socket.emit("conversations", conversations);
      } catch (error) {
        console.error("Error getting conversations:", error);
        socket.emit("error", { message: "Failed to get conversations" });
      }
    });

    // ==================== DISCONNECT ====================

    socket.on("disconnect", () => {
      activeUsers.delete(socket.userId);
      emitActiveUsers(io);
    });
  });

  return io;
};

/**
 * Get active users with their details
 */
const getActiveUsersWithDetails = async () => {
  try {
    const userIds = Array.from(activeUsers.keys());
    const users = await userSchema
      .find({ _id: { $in: userIds } })
      .select("_id name email")
      .lean();

    return users.map((user) => ({
      ...user,
      isOnline: true,
    }));
  } catch (error) {
    console.error("Error getting active users details:", error);
    return [];
  }
};

/**
 * Emit active users to all connected clients
 */
const emitActiveUsers = async (io) => {
  try {
    const activeUsersList = await getActiveUsersWithDetails();
    io.emit("active-users-updated", activeUsersList);
  } catch (error) {
    console.error("Error emitting active users:", error);
  }
};

module.exports = {
  initializeSocket,
  activeUsers,
};
