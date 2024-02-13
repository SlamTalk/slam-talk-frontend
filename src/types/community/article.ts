export interface IArticle {
  title: string;
  // writerId: number | undefined;
  // writerNickname: string | undefined;
  // writerImageUrl: string | undefined;
  content: string;
  tag: string;
  images?: string[] | null;
  // comments: {
  //   id: number;
  //   writerId: number;
  //   writerNickaname: string;
  //   content: string;
  // }[];
}
