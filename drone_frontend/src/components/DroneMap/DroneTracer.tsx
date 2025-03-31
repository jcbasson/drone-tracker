import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

interface DroneTracerProps {
	pathCoords: [number, number][]
}

const DroneTracer = ({ pathCoords }: DroneTracerProps) => {
	const map = useMap()
	const polylineRef = useRef<L.Polyline | null>(null)
	const initializedRef = useRef<boolean>(false)

	// Create polyline - if it does not exist
	useEffect(() => {
		if (!initializedRef.current) {
			polylineRef.current = L.polyline([], {
				color: 'red',
				weight: 3,
				opacity: 0.8,
				dashArray: '8, 12',
				lineCap: 'round',
				lineJoin: 'round',
			}).addTo(map)

			initializedRef.current = true
		}

		// Clean up on unmount
		return () => {
			if (polylineRef.current) {
				map.removeLayer(polylineRef.current)
				polylineRef.current = null
				initializedRef.current = false
			}
		}
	}, [map])

	// Update polyline - runs when pathCoords changes
	useEffect(() => {
		if (polylineRef.current && pathCoords.length > 0) {
			polylineRef.current.setLatLngs(pathCoords)
		}
	}, [pathCoords])

	return null
}

export default DroneTracer
