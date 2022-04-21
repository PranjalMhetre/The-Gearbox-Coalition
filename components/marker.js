import { useState } from 'react';
import { Modal, UnstyledButton } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function CustomMarker({ teamData }) {
  const team = teamData;

  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));
  return (
    <>
      <Modal 
        ref={ref}
        centered
        overlayColor='#f3f0ff'
        overlayOpacity={0.3}
        overflow="outside"
        size="lg"
        opened={opened} 
        onClose={() => setOpened(false)} 
        title={`Team Number: ${team.fields.teamNumber}`}
      >
        <h1 className='text-2xl'>{`Address: ${team.fields.address}`}</h1>
        <h1 className='text-2xl'>{`Travel Time: ${team.fields.travelTime} minutes`}</h1>
        <h1 className='text-2xl'>{`Distance: ${team.fields.distance} miles`}</h1>
        <h1 className='text-2xl font-bold'>{`Has Field: ${team.fields.hasField}`}</h1> 
        <h1 className='text-2xl'>{`Has Business: ${team.fields.hasBusinessPlan}`}</h1>
        <h1 className='text-2xl text-center'>--- Comp Record ---</h1>
        <p className='text-xl'>{documentToReactComponents(team.fields.compRecord)}</p>
      </Modal>

      <UnstyledButton onClick={() => setOpened(true)} className="bg-red-300 hover:bg-blue-300 dark:bg-blue-300 dark:hover:bg-red-300 transition-colors duration-300 w-[2rem] aspect-square rounded-[50%] inline-flex justify-center items-center text-white">
        {team.fields.teamNumber}
      </UnstyledButton>
    </>
  );
}
