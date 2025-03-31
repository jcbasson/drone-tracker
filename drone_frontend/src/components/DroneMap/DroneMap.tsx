import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import DroneMarker from './DroneMarker'
import { useDroneCoordWebSocket } from './useDroneCoordWebSocket'
import { ReadyState } from 'react-use-websocket'
import DroneTracer from './DroneTracer'

const DroneMap = () => {
	const { readyState, currentCoord, pathCoords } = useDroneCoordWebSocket()

	if (readyState === ReadyState.CONNECTING || !currentCoord) {
		return <div>Loading map...</div>
	}

	return (
		<MapContainer
			center={[currentCoord.latitude, currentCoord.longitude]}
			zoom={14}
			style={{ height: '100vh', width: '100%' }}
		>
			<TileLayer
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<DroneMarker currentCoord={currentCoord} />
			<DroneTracer pathCoords={pathCoords} />
		</MapContainer>
	)
}

export default DroneMap
