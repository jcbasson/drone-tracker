import { useEffect, useRef } from 'react'
import useWebSocket from 'react-use-websocket'
import type { ReadyState } from 'react-use-websocket'
import type { Coordinate } from '../../types/map.types'

export const useDroneCoordWebSocket = () => {
	const droneCoordSocketUrl = import.meta.env.VITE_DRONE_COORD_SOCKET_URL
	const pathCoordsRef = useRef<[number, number][]>([])

	const {
		lastJsonMessage: currentCoord,
		readyState,
	}: { lastJsonMessage: Coordinate; readyState: ReadyState } = useWebSocket(
		droneCoordSocketUrl,
		{
			onOpen: () => console.log('Drone Coordinate socket opened'),
			shouldReconnect: () => true,
		}
	)

	useEffect(() => {
		if (currentCoord?.latitude && currentCoord?.longitude) {
			const newPathCoord: [number, number] = [
				currentCoord.latitude,
				currentCoord.longitude,
			]

			// Update the ref without triggering re-renders
			const updatedPathCoords = [...pathCoordsRef.current, newPathCoord]

			pathCoordsRef.current =
				updatedPathCoords.length > 100
					? updatedPathCoords.slice(-100)
					: updatedPathCoords
		}
	}, [currentCoord])

	return { readyState, currentCoord, pathCoords: pathCoordsRef.current }
}
