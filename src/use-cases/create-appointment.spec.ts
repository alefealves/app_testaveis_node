import { describe, expect, it } from 'vitest'
import { CreateAppointment } from './create-appointments';
import { Appointment } from '../entities/appointments';
import { getFutureDate } from '../tests/utils/get-future-date';
import { inMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments-repository';

describe('Create Appointment', () => {
  it('should be able to create an appointment', () => {
    const startsAt = getFutureDate('2023-04-10')
    const endsAt = getFutureDate('2023-04-11')
    
    const appointmentsRepository = new inMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(
      appointmentsRepository
    )

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  })

  it('should not be able to create an appointment with overllaping dates', async () => {
    const startsAt = getFutureDate('2024-04-10')
    const endsAt = getFutureDate('2024-04-15')
    
    const appointmentsRepository = new inMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(
      appointmentsRepository
    )

    await createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2024-04-14'),
      endsAt: getFutureDate('2024-04-18')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2024-04-08'),
      endsAt: getFutureDate('2024-04-12')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2024-04-08'),
      endsAt: getFutureDate('2024-04-17')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2024-04-11'),
      endsAt: getFutureDate('2024-04-12')
    })).rejects.toBeInstanceOf(Error)
  })
})