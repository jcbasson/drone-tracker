import { MapContainer, TileLayer } from 'react-leaflet'
import { MarkerLayer } from 'react-leaflet-marker'
import 'leaflet/dist/leaflet.css'

const mapStyles = {
	height: 'calc(100vh)',
}

interface MapProps {
	centerLatitude: number
	centerLongitude: number
	children: React.ReactNode
}
const Map = ({ centerLatitude, centerLongitude, children }: MapProps) => {
	return (
		<MapContainer
			center={[centerLatitude, centerLongitude]}
			zoom={14}
			scrollWheelZoom={false}
			style={mapStyles}
		>
			<TileLayer
				attribution=''
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<MarkerLayer>{children}</MarkerLayer>
		</MapContainer>
	)
}

export default Map
