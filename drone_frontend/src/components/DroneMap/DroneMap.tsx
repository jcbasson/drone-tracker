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

	if (
		readyState === ReadyState.CONNECTING ||
		!coord?.latitude ||
		!coord?.longitude
	) {
		// TODO: Implement spinner
		return <></>
	}

	return (
		<Map centerLatitude={coord.latitude} centerLongitude={coord.longitude}>
			{/* <DroneMarker latitude={-33.946765} longitude={151.1796423} /> */}
			<DroneMarker latitude={coord.latitude} longitude={coord.longitude} />
		</Map>
	)
}

export default DroneMap
