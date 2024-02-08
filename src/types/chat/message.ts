interface IMessage {
  messageId: string;
  roomId: string;
  senderId: string;
  senderNickname: string;
  content: string;
  timestamp: string;
}
export default IMessage;
