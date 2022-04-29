import { useState } from 'react';
import { Modal, UnstyledButton } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import useGeo from "./hooks/useGeo"

export default function CustomMarker({ teamData }) {
  const team = teamData;

  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  // const init = {"lat": "40.3279", "lon": "-74.8049"}
  // const final = {"lat": team.fields.location.lat, "lon": team.fields.location.lon}

  // useGeo(init, final).then((res) => {
  //   console.log(res)
  // })

  const markerStyles = "transition-all duration-100 w-[2rem] aspect-square rounded-[50%] inline-flex justify-center items-center text-white"
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
        title={`Team: ${team.fields.teamName} (${team.fields.teamNumber})`}
      >
        <h1 className='text-2xl'>{`Address: ${team.fields.address}`}</h1>
        <h1 className='text-2xl'>{`Travel Time: ${team.fields.travelTime} minutes`}</h1>
        <h1 className='text-2xl'>{`Distance: ${team.fields.distance} miles`}</h1>
        <h1 className='text-2xl font-bold'>{`Field State: ${team.fields.hasField}`}</h1> 
        <h1 className='text-2xl'>{`Business Team Level: ${team.fields.hasBusinessPlan}`}</h1>
        <h1 className='text-2xl'>{`Do they want to join: ${team.fields.wantsToJoin}`}</h1>
        <h1 className='text-2xl text-center'>--- Competition Record ---</h1>
        <p className='text-xl'>{documentToReactComponents(team.fields.compRecord)}</p>
        {team.fields.otherInfo && (
          <h1 className='text-2xl text-center'>--- Other Information ---</h1>
        )}
        <p className='text-xl'>{documentToReactComponents(team.fields.otherInfo)}</p>
      </Modal>
{/* 
if (in coalition) {
  return "blue"
} else if(very likely){
  return dark green"
}else if(likely){
  return "light green"
} else {
  return "orange"
}
*/
}

      <UnstyledButton onClick={() => setOpened(true)} className={ 
        (team.fields.wantsToJoin.includes("in coalition")) ? 
          "bg-blue-300 hover:bg-blue-400 " + markerStyles 
        : (team.fields.wantsToJoin.includes("very")) ?
          "bg-green-400 hover:bg-green-500" + markerStyles 
        : (team.fields.wantsToJoin.includes("likely")) ?
          "bg-green-200 hover:bg-green-300 " + markerStyles 
        : 
          "bg-orange-300 hover:bg-orange-400 " + markerStyles

        // team.fields.wantsToJoin.includes("likely") ? team.fields.wantsToJoin.includes("very") ? 
        // "bg-green-400 hover:bg-green-500" + markerStyles : 
        // "bg-green-200 hover:bg-green-300 " + markerStyles : 
        // "bg-orange-300 hover:bg-orange-400 " + markerStyles
      }>
        {team.fields.teamNumber}
      </UnstyledButton>
    </>
  );
}
