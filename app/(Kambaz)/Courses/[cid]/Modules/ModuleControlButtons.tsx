import { IoEllipsisVertical } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa6';
import GreenCheckmark from './GreenCheckmark';

export default function ModuleControlButtons() {
  return (
    <div className='float-end'>
      <GreenCheckmark />
      <FaPlus className='me-2 fs-4 text-muted' />
      <IoEllipsisVertical className='ms-1 fs-4 text-muted' />
    </div>
  );
}
