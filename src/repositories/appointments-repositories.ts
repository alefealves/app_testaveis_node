import { Appointment } from "../entities/appointments";

export interface AppointmentsRepository {
  create(appointment: Appointment): Promise<void>;
  findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null>
  //save(appointment: Appointment): Promise<void>;
}