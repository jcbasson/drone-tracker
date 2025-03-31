import { Polyline } from 'react-leaflet'

interface DroneTracer {
	pathCoordinates: [number, number][]
}
const DroneTracer = ({ pathCoordinates }: DroneTracer) => {
	return (
		<Polyline
			positions={pathCoordinates}
			pathOptions={{
				color: 'red',
				weight: 3,
				opacity: 0.8,
				dashArray: '8, 12',
				lineCap: 'round',
				lineJoin: 'round',
			}}
		/>
	)
}

export default DroneTracer
