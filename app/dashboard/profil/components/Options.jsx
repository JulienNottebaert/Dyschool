import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import {
  Switch, Button, ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'

export const ChevronDownIcon = () => {
  return (
    <svg fill='none' height='14' viewBox='0 0 24 24' width='14' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z'
        fill='currentColor'
      />
    </svg>
  )
}
function Options ({ userData }) {
  const [selectedOption, setSelectedOption] = React.useState(new Set(['merge']))
  const descriptionsMap = {
    merge:
      'All commits from the source branch are added to the destination branch via a merge commit.',
    squash:
      'All commits from the source branch are added to the destination branch as a single commit.',
    rebase: 'All commits from the source branch are added to the destination branch individually.'
  }

  const labelsMap = {
    merge: 'Poppins',
    squash: 'Roboto',
    rebase: 'Open Dyslexic'
  }

  // Convert the Set to an Array and get the first value.
  const selectedOptionValue = Array.from(selectedOption)[0]
  return (
    <div className='bg-white shadow-lg p-8 rounded-md col-span-3 flex flex-col items-center'>
      <h3 className='text-xl font-semibold text-secondary text-center'>Options <FontAwesomeIcon icon={faGear} className='ml-2 text-lg' />
      </h3>
      <div className='flex flex-col w-full mt-6 gap-4'>
        <div className='flex justify-between items-center'>
          <p className='text-sm'>Choix de la typographie</p>
          <ButtonGroup variant='flat'>
            <Button size='sm' color='primary' isDisabled>{labelsMap[selectedOptionValue]}</Button>
            <Dropdown placement='bottom-end'>
              <DropdownTrigger>
                <Button size='sm' color='primary' isDisabled isIconOnly>
                  <ChevronDownIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Merge options'
                className='max-w-[300px]'
                selectedKeys={selectedOption}
                selectionMode='single'
                onSelectionChange={setSelectedOption}
              >
                <DropdownItem key='merge' description={descriptionsMap.merge}>
                  {labelsMap.merge}
                </DropdownItem>
                <DropdownItem key='squash' description={descriptionsMap.squash}>
                  {labelsMap.squash}
                </DropdownItem>
                <DropdownItem key='rebase' description={descriptionsMap.rebase}>
                  {labelsMap.rebase}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
        </div>
        <div className='flex justify-between'>
          <p className='text-sm'>Contrôle parental</p>
          <Switch defaultSelected size='sm' isDisabled />
        </div>
        <div className='flex justify-between'>
          <p className='text-sm'>Jeux proposés adaptés</p>
          <Switch defaultSelected size='sm' isDisabled />
        </div>
      </div>
      <Button size='sm' className='mt-6' color='secondary'>
        Modifier
      </Button>
    </div>
  )
}

export default Options
