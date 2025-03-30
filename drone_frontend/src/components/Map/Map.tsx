import { MapContainer, TileLayer } from 'react-leaflet'
import { MarkerLayer } from 'react-leaflet-marker'
import 'leaflet/dist/leaflet.css'

const mapStyles = {
	height: 'calc(100vh)',
}

interface MapProps {
	children: JSX.Element
}
const Map = ({ children }: MapProps) => {
	return (
		<MapContainer
			center={[-33.946765, 151.1796423]}
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
