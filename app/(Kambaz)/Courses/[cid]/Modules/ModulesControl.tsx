import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import GreenCheckmark from './GreenCheckmark';
import { FaBan } from 'react-icons/fa';
import ModuleEditor from './ModuleEditor';
import { useState } from 'react';

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div
      id='wd-modules-controls'
      className='d-flex justify-content-end gap-1 flex-nowrap mb-3'
    >
      <Button
        variant='secondary'
        size='lg'
        className='text-nowrap'
        id='wd-collapse-all'
      >
        Collapse All
      </Button>

      <Button
        variant='secondary'
        size='lg'
        className='text-nowrap'
        id='wd-view-progress'
      >
        View Progress
      </Button>

      <Dropdown>
        <DropdownToggle
          variant='secondary'
          size='lg'
          id='wd-publish-all-btn'
          className='text-nowrap'
        >
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id='wd-publish-all-modules-and-items'>
            <GreenCheckmark /> Publish all modules and items
          </DropdownItem>
          <DropdownItem id='wd-publish-modules-only'>
            <GreenCheckmark /> Publish modules only
          </DropdownItem>
          <DropdownItem id='wd-unpublish-all-modules-and-items'>
            <FaBan className='me-2' /> Unpublish all modules and items
          </DropdownItem>
          <DropdownItem id='wd-unpublish-modules-only'>
            <FaBan className='me-2' /> Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Button
        variant='danger'
        onClick={handleShow}
        size='lg'
        className='text-nowrap d-flex align-items-center'
        id='wd-add-module-btn'
      >
        <FaPlus className='position-relative me-2' style={{ bottom: '1px' }} />
        Module
      </Button>
      <ModuleEditor
        show={show}
        handleClose={handleClose}
        dialogTitle='Add Module'
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}
