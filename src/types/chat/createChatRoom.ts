export interface ICreateChatRoom {
  creator_id: number;
  participants: string[];
  roomType: string;
  basket_ball_id: number;
  name: string;
}

export interface ICreateCourtChatRoom {
  basket_ball_id: number;
  name: string;
}
