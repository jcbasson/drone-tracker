import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import type { Coordinate } from '../../types/map.types'

const MapController = ({ coord }: { coord: Coordinate }) => {
	const map = useMap()

	// Update map view when coordinates change
	useEffect(() => {
		if (coord?.latitude && coord?.longitude) {
			const position: [number, number] = [coord.latitude, coord.longitude]

			// Check if marker is visible in the current view
			const bounds = map.getBounds()
			if (!bounds.contains(position)) {
				// Marker is outside view, pan the map to include it
				map.panTo(position)
			}
		}
	}, [coord, map])

	return null
}

export default MapController
