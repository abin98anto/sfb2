export default interface IChat {
  _id?: string;
  tutorId: string;
  studentId: string;
  courseId: string;
  messages: string[];
  // lastMessage: {
  //   content: string;
  //   senderId: string;
  //   timestamp: Date;
  //   contentType: string;
  // };
}
