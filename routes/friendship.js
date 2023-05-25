const express = require("express");
const router = express.Router();

const friendshipController = require("../controllers/friendshipController");

router.get("/friends", friendshipController.friends);
router.post("/unfriend",friendshipController.unfriend);

router.get("/more-people", friendshipController.morePeople);
router.post("/send-request",friendshipController.sendRequest);

router.get("/received-requests", friendshipController.receivedRequests);
router.post("/accept-request",friendshipController.acceptRequest);
router.post("/decline-request",friendshipController.declineRequest);

router.get("/sent-requests", friendshipController.sentRequests);
router.post("/unsend-request",friendshipController.unsendRequest);

module.exports = router;
