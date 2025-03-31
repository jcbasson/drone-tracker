import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import droneMarkerIconSVG from './droneMarkerIconSVG'
import type { Coordinate } from '../../types/map.types'

interface DroneMarkerProps {
	currentCoord: Coordinate | null
}

const DroneMarker = ({ currentCoord }: DroneMarkerProps) => {
	const map = useMap()
	const markerRef = useRef<L.Marker | null>(null)
	const iconUrlRef = useRef<string | null>(null)

	// Initialize marker with custom icon
	useEffect(() => {
		if (!currentCoord) return

		// Create the icon only once
		if (!iconUrlRef.current) {
			const svgString = droneMarkerIconSVG()
			const svgBlob = new Blob([svgString], { type: 'image/svg+xml' })
			iconUrlRef.current = URL.createObjectURL(svgBlob)
		}

		// Create custom icon
		const icon = L.icon({
			iconUrl: iconUrlRef.current,
			iconSize: [32, 32],
			iconAnchor: [16, 16],
			popupAnchor: [0, -16], // Add this for better popup positioning
		})

		// Create the marker if it doesn't exist
		if (!markerRef.current) {
			markerRef.current = L.marker(
				[currentCoord.latitude, currentCoord.longitude],
				{ icon }
			).addTo(map)
		} else {
			// Update existing marker position
			markerRef.current.setLatLng([
				currentCoord.latitude,
				currentCoord.longitude,
			])
		}

		// Clean up on unmount
		return () => {
			if (markerRef.current) {
				map.removeLayer(markerRef.current)
				markerRef.current = null
			}
			if (iconUrlRef.current) {
				URL.revokeObjectURL(iconUrlRef.current)
				iconUrlRef.current = null
			}
		}
	}, [map, currentCoord])

	return null
}

export default DroneMarker
