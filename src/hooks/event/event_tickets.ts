import { getTickets } from '@/api/event/event_tickets';
import { useQuery } from '@tanstack/react-query';
import { Event } from '@/interfaces/event';
import { WithDocs } from '@/interfaces/serializers/commons';

const key = 'event_tickets';

export const useEventsTickets = (pagination = {}) => {
  return useQuery<WithDocs<Event>>([key], () => getTickets(pagination));
};
