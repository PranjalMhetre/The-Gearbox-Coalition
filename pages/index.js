import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react'
import CustomMarker from "../components/marker"
import { createClient } from 'contentful'
import ColorSchemeToggle from '../components/ColorSchemeToggle/ColorSchemeToggle'
import { useMantineColorScheme } from '@mantine/core'

export async function getStaticProps(){
  const client = createClient({
    space: 'mcgbm1socg24', //process.env.CONTENTFUL_SPACE_ID,
    accessToken: 'L6zPnIjA2mGQDQnCnPHk2QGEB-SczBtYRTO2ZMbQxWM', //process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  const teamRes = await client.getEntries({
    content_type: 'team',
  })
  return {
    props: {
      teams: teamRes.items,
    },
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
        mapboxAccessToken="pk.eyJ1IjoibGF2YXdhZmZsZSIsImEiOiJjbDI4MnE2ZnMwNWZvM2xvMW96eDdndXc4In0.hpG9-aeBSEHWFmfwqYObkw"
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
