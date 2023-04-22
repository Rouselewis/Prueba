import Link from 'next/link';
import { useTranslations } from 'next-intl';
// Table
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox, Options, SwitchTable } from './components';
// Helpers
import { CurrentColor } from '@/helpers';

export function columnsTicketPhaseDashboard() {
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
    columnHelper.accessor('phase', {
      id: 'phase',
      header: () => tcc('dashboard.ticket.phase'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('start_at', {
      id: 'start_at',
      header: () => tcc('dashboard.ticket.start_at'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('end_at', {
      id: 'end_at',
      header: () => tcc('dashboard.ticket.end_at'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('available', {
      id: 'available',
      header: () => tcc('dashboard.ticket.available'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('sold', {
      id: 'sold',
      header: () => tcc('dashboard.ticket.sold'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('cost', {
      id: 'cost',
      header: () => tcc('dashboard.ticket.cost'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('earns', {
      id: 'earns',
      header: () => tcc('dashboard.ticket.earns'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => tcc('status'),
      cell: (props) => <SwitchTable color={currentColor} />,
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
