import Link from 'next/link';
import { useTranslations } from 'next-intl';
// Table
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox, Options, Status } from './components';
// Helpers
import { CurrentColor } from '@/helpers';

export function ColumnsEventSubscriptionList() {
  const tcc = useTranslations('table_columns');
  const currentColor = CurrentColor();
  const columnHelper = createColumnHelper<any>();

  return [
    columnHelper.accessor('select', {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div>
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    }),
    columnHelper.accessor('event', {
      id: 'event',
      header: () => tcc('ticket.list.event'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => tcc('ticket.list.event'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('time', {
      id: 'time',
      header: () => tcc('ticket.list.event'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('options', {
      id: 'options',
      header: () => tcc('option'),
      cell: (props) => (
        <Options id={props.row.original.id} color={currentColor} />
      ),
    }),
  ];
}
