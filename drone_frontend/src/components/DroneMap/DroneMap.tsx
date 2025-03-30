import { useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import Map from '../Map'
import DroneMarker from './DroneMarker'
import type { Coordinate } from '../../types/map.types'

const DroneMap = () => {
	const droneCoordSocketUrl = import.meta.env.VITE_DRONE_COORD_SOCKET_URL

	const {
		lastJsonMessage: coord,
		readyState,
	}: { lastJsonMessage: Coordinate; readyState: ReadyState } = useWebSocket(
		droneCoordSocketUrl,
		{
			onOpen: () => console.log('Drone Coordinate socket opened'),
			shouldReconnect: () => true,
		}
	)

	const [debouncedCoord, setDebouncedCoord] = useState(coord)

	useEffect(() => {
		const timer = setTimeout(() => {
			if (coord?.latitude && coord?.longitude) {
				setDebouncedCoord(coord)
			}
		}, 0)

		return () => clearTimeout(timer)
	}, [coord])

	if (readyState === ReadyState.CONNECTING) {
		// TODO: Implement spinner
		return <></>
	}

	if (!debouncedCoord) {
		return <></>
	}

	return (
		<Map
			centerLatitude={debouncedCoord.latitude}
			centerLongitude={debouncedCoord.longitude}
		>
			<DroneMarker
				latitude={debouncedCoord.latitude}
				longitude={debouncedCoord.longitude}
			/>
		</Map>
	)
}

export default DroneMap
