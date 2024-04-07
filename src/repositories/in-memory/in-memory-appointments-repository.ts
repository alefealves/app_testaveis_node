import { areIntervalsOverlapping } from 'date-fns'

import { Appointment } from '../../entities/appointments'
import { AppointmentsRepository } from '../appointments-repositories'

export class inMemoryAppointmentsRepository implements AppointmentsRepository {
  public items: Appointment[] = []

  async create(appointment: Appointment): Promise<void> {
    
  }

  async findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null> {
    const overlappingAppointment = this.items.find(appointment => {
      return areIntervalsOverlapping(
        {start: startsAt, end: endsAt},
        {start: appointment.startsAt, end: appointment.endsAt},
        { inclusive: true }
      )
    })

    if(!overlappingAppointment){
      return null
    }

    return overlappingAppointment
  }
}