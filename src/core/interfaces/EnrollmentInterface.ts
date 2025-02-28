import IEnrollment from "../entities/IEnrollment";

interface EnrollmentInterface {
  add(enrollment: Partial<IEnrollment>): Promise<IEnrollment>;
  findById(enrollmentId: string): Promise<IEnrollment | null>;
  findByUserId(userId: string): Promise<IEnrollment | null>;
  getAll(): Promise<IEnrollment[]>;
  update(updates: Partial<IEnrollment>): Promise<IEnrollment | null>;
}

export default EnrollmentInterface;
