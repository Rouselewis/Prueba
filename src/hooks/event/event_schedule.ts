import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  getEventsSchedules,
  createEventSchedule,
  readEventSchedule,
  updateEventSchedule,
  deleteEventSchedule,
} from '@/api/event/event_schedule';
import { EventSchedule } from '@/interfaces/event';
import { WithDocs } from '@/interfaces/serializers/commons';

const key = 'event_schedule';

export function useEventSchedules() {
  return useQuery<EventSchedule[]>([key], getEventsSchedules);
}

export function useInfiniteQueryEventSchedules(
  pagination: { [key: string]: any } = {}
) {
  return useInfiniteQuery<WithDocs<EventSchedule>>([key, pagination?.page], {
    queryFn: () => getEventsSchedules(pagination),
    keepPreviousData: true,
  });
}

export function useEventSchedule(event_schedule_id: string) {
  return useQuery<EventSchedule>([key, event_schedule_id], () =>
    readEventSchedule(event_schedule_id as any)
  );
}
