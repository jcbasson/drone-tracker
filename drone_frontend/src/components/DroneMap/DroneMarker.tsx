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
	const initializedRef = useRef<boolean>(false)
	const initialCoord = useRef<Coordinate>(currentCoord)

	// Initialize marker and icon - runs only once when map is ready
	useEffect(() => {
		// Create the icon only once
		if (!initializedRef.current) {
			const initCoord = initialCoord.current

			const svgString = droneMarkerIconSVG()
			const svgBlob = new Blob([svgString], { type: 'image/svg+xml' })
			iconUrlRef.current = URL.createObjectURL(svgBlob)

			const icon = L.icon({
				iconUrl: iconUrlRef.current,
				iconSize: [32, 32],
				iconAnchor: [16, 16],
				popupAnchor: [0, -16],
			})

			// Wait for initial coordinates before creating the marker
			if (initCoord) {
				markerRef.current = L.marker(
					[initCoord.latitude, initCoord.longitude],
					{ icon }
				).addTo(map)

				console.log('Marker created - this should happen only once')
				initializedRef.current = true
			}
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
			initializedRef.current = false
		}
	}, [map]) // Only depends on map, not currentCoord

	// Create marker when initial coordinates become available
	useEffect(() => {
		// Skip if already initialized or no coordinates available
		if (initializedRef.current || !currentCoord || !map) return

		// Create the marker now that we have coordinates
		if (iconUrlRef.current) {
			const icon = L.icon({
				iconUrl: iconUrlRef.current,
				iconSize: [32, 32],
				iconAnchor: [16, 16],
				popupAnchor: [0, -16],
			})

			markerRef.current = L.marker(
				[currentCoord.latitude, currentCoord.longitude],
				{ icon }
			).addTo(map)

			console.log('Marker created after coordinates became available')
			initializedRef.current = true
		}
	}, [map, currentCoord])

	// Update marker position when coordinates change
	useEffect(() => {
		if (markerRef.current && currentCoord) {
			markerRef.current.setLatLng([
				currentCoord.latitude,
				currentCoord.longitude,
			])
			map.setView([currentCoord.latitude, currentCoord.longitude])
		}
	}, [currentCoord, map])

	return null
}

export default DroneMarker
