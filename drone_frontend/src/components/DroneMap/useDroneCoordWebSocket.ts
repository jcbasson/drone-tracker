// import { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import type { ReadyState } from 'react-use-websocket'
import type { Coordinate } from '../../types/map.types'

export const useDroneCoordWebSocket = () => {
	const droneCoordSocketUrl = import.meta.env.VITE_DRONE_COORD_SOCKET_URL
	// const [pathCoords, setPathCoords] = useState<[number, number][]>([])
	// const [currentCoord, setCurrentCoord] = useState<Coordinate | null>(null)

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

	// useEffect(() => {
	// 	if (coord?.latitude && coord?.longitude) {
	// 		setCurrentCoord(coord)

	// 		setPathCoords((prev) => {
	// 			const newPathCoord: [number, number] = [coord.latitude, coord.longitude]
	// 			const updatedPathCoords = [...prev, newPathCoord]
	// 			return updatedPathCoords.length > 100
	// 				? updatedPathCoords.slice(-100)
	// 				: updatedPathCoords
	// 		})
	// 	}
	// }, [coord])

	return { readyState, currentCoord }
}
