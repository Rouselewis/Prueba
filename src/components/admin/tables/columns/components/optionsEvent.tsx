import Link from 'next/link';
// Icons
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

type Props = {

    id: number,
    color: string,
    edit?: boolean,
    deleteOpt?: boolean,
    pay?: boolean,
    deleteCategory:any,
    
}

export const OptionsEvent = ({id, color, edit = true, deleteOpt = true, pay = false, deleteCategory}: Props) => {
  const { asPath } = useRouter();
  return (
        <div className='flex justify-start'>
          { edit ? (
          <Link href={`${asPath}/edit/${id}`} className="px-1">
            <PencilIcon className={`w-4 h-4 hover:text-${color}`} />
          </Link>
          ) : ''}
         
          { pay ? (
          <Link href={`/panel/events/special/delete/${id}`} className={`px-1 bg-customGreen text-white rounded-md h-8 w-10 text-center pt-2`}>
            Pay
          </Link>
          ) : ''}
        </div>
    )
}