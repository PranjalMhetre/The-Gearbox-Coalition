import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react'
import CustomMarker from "../components/marker"
import { createClient } from 'contentful'
import ColorSchemeToggle from '../components/ColorSchemeToggle/ColorSchemeToggle'
import { useMantineColorScheme } from '@mantine/core'

export async function getStaticProps(){
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  const teamRes = await client.getEntries({
    content_type: 'team',
  })
  return {
    props: {
      teams: teamRes.items,
    },
    revalidate: 5,
  }
}

export default function HomePage({ teams }) {
  const { colorScheme } = useMantineColorScheme();
  console.log(teams)

  return (
    <>
      <ColorSchemeToggle />
      <Map
        initialViewState={{
          longitude: -74.791030,
          latitude: 40.328070,
          zoom: 7
        }}
        style={{width: '100vw', height: '100vh'}}
        mapboxAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
        mapStyle={colorScheme === "dark" ? "mapbox://styles/mapbox/dark-v9" : "mapbox://styles/mapbox/streets-v9"}
      >
        {teams && teams.map(team => {
          return (
          <Marker key={team.sys.id} longitude={team.fields.location.lon} latitude={team.fields.location.lat} anchor="center" >
            <CustomMarker teamData={team} />
          </Marker>
          )
        })}

        {/* <Marker longitude={-74.4757} latitude={40.6520} anchor="center" >
          <CustomMarker />
        </Marker> */}
      </Map>
    </>
  );
}
