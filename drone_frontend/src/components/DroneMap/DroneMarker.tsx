import { Marker } from 'react-leaflet-marker'
import DroneMarkerIcon from './DroneMarkerIcon'

interface DroneMarkerProps {
	latitude: number
	longitude: number
}

const DroneMarker = ({ latitude, longitude }: DroneMarkerProps) => {
	return (
		<Marker position={[latitude, longitude]}>
			<DroneMarkerIcon />
		</Marker>
	)
}

export default DroneMarker
