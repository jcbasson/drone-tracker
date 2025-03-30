import { useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { Map, MapController } from '../Map'
import DroneMarker from './DroneMarker'
import type { Coordinate } from '../../types/map.types'
import { Polyline } from 'react-leaflet'

const DroneMap = () => {
	const droneCoordSocketUrl = import.meta.env.VITE_DRONE_COORD_SOCKET_URL
	const [pathPositions, setPathPositions] = useState<[number, number][]>([])

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
			setPathPositions((prev: [number, number][]) => {
				const newPosition: [number, number] = [coord.latitude, coord.longitude]
				const newPositions: [number, number][] = [...prev, newPosition]

				// Limit path length to prevent performance issues (optional)
				if (newPositions.length > 100) {
					return newPositions.slice(-100)
				}
				return newPositions
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
			<Polyline
				positions={pathPositions}
				pathOptions={{
					color: 'red',
					weight: 3,
					opacity: 0.8,
					dashArray: '8, 12',
					lineCap: 'round',
					lineJoin: 'round',
				}}
			/>
			<MapController coord={coord} />
		</Map>
	)
}

export default DroneMap
