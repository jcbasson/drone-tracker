import { useEffect } from 'react'
import Map from '../Map'
import DroneMarker from './DroneMarker'
import type { Coordinate } from '../../types/map.types'

const DroneMap = () => {
	const droneCoordSocketUrl = import.meta.env.VITE_DRONE_COORD_SOCKET_URL
	useEffect(() => {
		const websocket = new WebSocket(droneCoordSocketUrl)

		websocket.onopen = () => {
			console.log('Web Socket connected.')
		}

		websocket.onmessage = (event) => {
			const data = JSON.parse(event.data) as Coordinate
			console.log(data)
		}
	}, [droneCoordSocketUrl])

	return (
		<Map>
			<DroneMarker latitude={-33.946765} longitude={151.1796423} />
		</Map>
	)
}

export default DroneMap
