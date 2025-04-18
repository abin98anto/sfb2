import IEnrollment from "../entities/IEnrollment";

interface EnrollmentInterface {
  add(enrollment: Partial<IEnrollment>): Promise<IEnrollment>;
  findById(enrollmentId: string): Promise<IEnrollment | null>;
  findByUserId(userId: string): Promise<IEnrollment[] | null>;
  findExisting(userId: string, courseId: string): Promise<IEnrollment | null>;
  getAll(): Promise<IEnrollment[]>;
  update(updates: Partial<IEnrollment>): Promise<IEnrollment | null>;

  getPaginated(params: {
    skip: number;
    limit: number;
    search: string;
  }): Promise<IEnrollment[]>;
  getCount(search: string): Promise<number>;
}

export default EnrollmentInterface;
