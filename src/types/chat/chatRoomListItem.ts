export interface IChatRoomListItem {
  roomId: string;
  roomType: string;
  participants: number[];
  name: string;
  imgUrl: string | null;
  lastMessage: string;
  basket_ball_id: number;
  together_id: number;
  teamMatching_id: number;
}
