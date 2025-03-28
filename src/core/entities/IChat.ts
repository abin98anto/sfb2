export default interface IChat {
  _id?: string;
  tutorId: string;
  studentId: string;
  courseId: string;
  lastMessage?: string | null;
  unreadMessageCount: number;
}
