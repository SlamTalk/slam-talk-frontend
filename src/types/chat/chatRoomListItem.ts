export interface IChatRoomListItem {
  roomId: string;
  id: number;
  roomType: string;
  participants: number[];
  name: string;
  imgUrl: string | null;
  lastMessage: string;
  basket_ball_id: number | null;
  together_id: number | null;
  teamMatching_id: number | null;
  newMsg: boolean;
}
