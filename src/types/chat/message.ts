interface IMessage {
  messageId: string;
  roomId: string;
  senderId: string;
  senderNickname: string;
  content: string;
  imgUrl: string;
  timestamp: string;
  senderImageUrl?: string;
}
export default IMessage;
