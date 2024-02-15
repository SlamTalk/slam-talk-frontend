// import { useParams } from 'next/navigation';
// import React from 'react';
// import CommentItem from './commentItem';

// interface ICommunityItem {
//   id: number;
//   title: string;
//   content: string;
//   tag: string;
//   comment?: [
//     {
//       id: string;
//       postId: string;
//       userId: string;
//       content: string;
//     },
//   ];
// }
// interface ICommentItemProps {
//   id: string;
//   postId: string;
//   userId: string;
//   content: string;

//   onEdit: (id: string, editedComment: string) => void;
//   onDelete: (id: string, editedComment: string) => void;
// }

// const CommentList = () => {
//   const params = useParams();

//   const handleEditComment = (id: string, editedComment: string) => {
//     const newComment = {
//       id: 2,
//       postId: params.id,
//       userId: 'user123',
//       content: editedComment,
//     };

//   const deleteCommentHandler = (id: string) => {
//     matchedData.comment = matchedData.comment?.filter(
//       (comment: any) => comment.id !== id
//     );
//     const updatedData = [...communityData];

//     const matchedIndex = updatedData.findIndex(
//       (item: ICommunityItem) => item.id === matchedData.id
//     );
//     if (matchedIndex !== -1) {
//       updatedData[matchedIndex] = matchedData;
//     }
//     localStorage.setItem('community', JSON.stringify(updatedData));
//   };
//   return (
//     <div>
//       {matchedData.comment?.map((i: ICommentItemProps) => (
//         <CommentItem
//           key={i.id}
//           comment={i}
//           onEdit={handleEditComment}
//           onDelete={deleteCommentHandler}
//         />
//       ))}
//     </div>
//   );
// };

// export default CommentList;
