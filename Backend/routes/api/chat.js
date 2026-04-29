const express = require('express');
const { authentication, authorization } = require('../../middleware/auth.middleware');
const router = express.Router();
const uploadHelper = require("../../helper/upload.helper")
const ChatController = require('../../modules/chat/chatController');

router.get("/get-chat", ChatController.getAllChatList)
router.get("/get-chat-between", authentication, ChatController.getChatBetweenUsers)
router.get("/unread-count", authentication, ChatController.getUnreadCount)
router.post("/add-chat", authentication, authorization("Chat"), uploadHelper.uploadFiles('chats', 'chat_pic'), ChatController.AddChat)
router.delete("/remove-chat", authentication, authorization("Chat"), ChatController.DeleteChat)

module.exports = router