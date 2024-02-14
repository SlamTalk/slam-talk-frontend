export interface IChatRoomListItem {
  roomId: string;
  roomType: string;
  partnerId: string | null;
  name: string;
  imgUrl: string | null;
  lastMessage: string;
  courtId: string | null;
}
