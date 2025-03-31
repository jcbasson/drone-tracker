import { useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { Map, MapController } from '../Map'
import DroneMarker from './DroneMarker'
import DroneTracer from './DroneTracer'
import type { Coordinate } from '../../types/map.types'

const DroneMap = () => {
	const droneCoordSocketUrl = import.meta.env.VITE_DRONE_COORD_SOCKET_URL
	const [pathCoords, setPathCoords] = useState<[number, number][]>([])

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

	useEffect(() => {
		if (coord?.latitude && coord?.longitude) {
			setPathCoords((prev: [number, number][]) => {
				const newPathCoord: [number, number] = [coord.latitude, coord.longitude]
				const updatedPathCoords: [number, number][] = [...prev, newPathCoord]

				// Limit path length to prevent performance issues
				if (updatedPathCoords.length > 100) {
					return updatedPathCoords.slice(-100)
				}
				return updatedPathCoords
			})
		}
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
			<DroneTracer pathCoordinates={pathCoords} />
			<MapController coord={debouncedCoord} />
		</Map>
	)
}

export default DroneMap
