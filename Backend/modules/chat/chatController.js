const chatSchema = require("../../schema/chatSchema");
const otherHelper = require("../../helper/others.helper");
const httpStatus = require("http-status");

const chatController = {};

/**
 * Get all chat messages with pagination
 */
chatController.getAllChatList = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10);

    // Get specific chat by ID
    if (req.query.id) {
      const chat = await chatSchema.findById(req.query.id);
      return otherHelper.sendResponse(res, httpStatus.OK, true, chat, null, 'Chat data found', null);
    }

    // Search in chats
    if (req.query.search && req.query.search !== 'null') {
      const searchResults = await chatSchema.find({
        $or: [{ message: { $regex: req.query.search, $options: 'i' } }],
      });
      if (searchResults.length === 0)
        return otherHelper.sendResponse(res, httpStatus.OK, true, null, [], 'Data not found', null);
      return otherHelper.paginationSendResponse(res, httpStatus.OK, true, searchResults, ' Search data found', page, size, searchResults.length);
    }

    const pulledData = await otherHelper.getQuerySendResponse(
      chatSchema,
      page,
      size,
      sortQuery,
      searchQuery,
      selectQuery,
      next,
      populate
    );

    return otherHelper.paginationSendResponse(
      res,
      httpStatus.OK,
      true,
      pulledData.data,
      'Chat data get successfully',
      page,
      size,
      pulledData.totalData
    );
  } catch (err) {
    next(err);
  }
};

/**
 * Get chat messages between two users
 */
chatController.getChatBetweenUsers = async (req, res, next) => {
  try {
    const { userId1, userId2, page = 1, limit = 50 } = req.query;

    if (!userId1 || !userId2) {
      return otherHelper.sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        false,
        null,
        'User IDs are required',
        null,
        null
      );
    }

    const skip = (page - 1) * limit;

    const messages = await chatSchema
      .find({
        $or: [
          { sender: userId1, receiver: userId2 },
          { sender: userId2, receiver: userId1 },
        ],
      })
      .populate('sender receiver', '_id name email')
      .sort({ sent_at: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const totalCount = await chatSchema.countDocuments({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    });

    return otherHelper.paginationSendResponse(
      res,
      httpStatus.OK,
      true,
      messages.reverse(),
      'Chat history retrieved successfully',
      page,
      limit,
      totalCount
    );
  } catch (err) {
    next(err);
  }
};

/**
 * Add message (REST API fallback)
 */
chatController.AddChat = async (req, res, next) => {
  try {
    const { receiver, message } = req.body;
    const sender = req.user.id;

    if (!receiver || !message) {
      return otherHelper.sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        false,
        null,
        'Receiver and message are required',
        null,
        null
      );
    }

    const newChat = new chatSchema({
      sender: sender,
      receiver: receiver,
      message: message,
      sent_at: new Date(),
      created_by: sender,
    });

    const savedChat = await newChat.save();
    await savedChat.populate('sender receiver', '_id name email');

    // Emit via Socket.IO if available
    const io = req.app.get('io');
    if (io) {
      const receiverSockets = io.sockets.sockets;
      for (let socket of receiverSockets.values()) {
        if (socket.userId === receiver) {
          io.to(socket.id).emit('receive-message', {
            messageId: savedChat._id,
            message: savedChat,
          });
        }
      }
    }

    return otherHelper.sendResponse(
      res,
      httpStatus.CREATED,
      true,
      savedChat,
      null,
      'Message sent successfully',
      null
    );
  } catch (err) {
    next(err);
  }
};

/**
 * Delete chat message
 */
chatController.DeleteChat = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      return otherHelper.sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        false,
        null,
        'Chat ID is required',
        null,
        null
      );
    }

    const deletedChat = await chatSchema.findByIdAndDelete(id);

    if (!deletedChat) {
      return otherHelper.sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        null,
        'Chat not found',
        null,
        null
      );
    }

    return otherHelper.sendResponse(
      res,
      httpStatus.OK,
      true,
      deletedChat,
      null,
      'Chat deleted successfully',
      null
    );
  } catch (err) {
    next(err);
  }
};

/**
 * Get unread message count
 */
chatController.getUnreadCount = async (req, res, next) => {
  try {
    const receiverId = req.user.id;

    const unreadCount = await chatSchema.aggregate([
      {
        $match: {
          receiver: receiverId,
          unread_count: { $gt: 0 },
        },
      },
      {
        $group: {
          _id: '$sender',
          count: { $sum: '$unread_count' },
        },
      },
    ]);

    return otherHelper.sendResponse(
      res,
      httpStatus.OK,
      true,
      unreadCount,
      null,
      'Unread count retrieved successfully',
      null
    );
  } catch (err) {
    next(err);
  }
};

module.exports = chatController;