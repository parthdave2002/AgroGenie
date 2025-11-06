const express = require('express');
const router = express.Router();
const noticeBoardController = require('../../modules/noticeBoard/noticeBoardController');
const { authentication, authorization } = require('../../middleware/auth.middleware');
const uploaderHelper = require('../../helper/upload.helper');

router.get('/get-notice-board',authentication,authorization("NoticeBoard"), noticeBoardController.getAllNotice);
router.post('/add-notice-board',authentication,authorization("NoticeBoard"),uploaderHelper.uploadFiles('notice', 'document_pics'), noticeBoardController.addNotice);
router.delete('/delete-notice-board',authentication,authorization("NoticeBoard"), noticeBoardController.deleteNotice);

module.exports = router;