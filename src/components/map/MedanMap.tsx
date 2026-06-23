'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CategoryType } from '@/types';
import 'leaflet/dist/leaflet.css';

export interface MapPinData {
  id: string;
  latitude: number;
  longitude: number;
  order?: number;
  category?: CategoryType;
  popupData: {
    title: string;
    subtitle?: string;
    imageUrl?: string;
    linkUrl: string;
    linkText: string;
  };
}

export interface RoutePath {
  coordinates: number[][];
  color?: string;
}

interface MedanMapProps {
  pins: MapPinData[];
  routes?: RoutePath[];
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
  activePinId?: string;
  onPinClick?: (id: string) => void;
  language: 'id' | 'en';
}

// Category color + lucide-style symbol per category (matches KMZ legend)
const CATEGORY_STYLE: Record<string, { color: string; svg: string }> = {
  iSee: {
    color: '#1E6B65',
    svg: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  },
  iEat: {
    color: '#E76F51',
    svg: '<path d="M3 2v7c0 1.1.9 2 2 2h.5C6.3 11 7 10.3 7 9.5V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  },
  iDrink: {
    color: '#F4A261',
    svg: '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>',
  },
  iSurprise: {
    color: '#457B9D',
    svg: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"/>',
  },
};

const WALK_SVG =
  '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>';

const ROUTE_COLOR = '#2A9D8F'; // Sage green (brand secondary)

export default function MedanMap({
  pins,
  routes,
  centerLat = 3.589882,
  centerLng = 98.677843,
  zoom = 15,
  activePinId,
  onPinClick,
  language,
}: MedanMapProps) {
  const router = useRouter();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const routeLayersRef = useRef<any[]>([]);

  // Helper to generate marker icon: colored circle + category symbol (+ order badge)
  const getMarkerIcon = (L: any, pin: MapPinData) => {
    const style = pin.category ? CATEGORY_STYLE[pin.category] : null;
    const color = style ? style.color : ROUTE_COLOR;
    const svg = style ? style.svg : WALK_SVG;

    const numberBadge = pin.order
      ? `<div class="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-white text-[9px] font-bold shadow-sm" style="color: ${color}; border: 1px solid ${color};">${pin.order}</div>`
      : '';

    const htmlContent = `
      <div class="relative flex items-center justify-center">
        <span class="absolute inline-flex h-8 w-8 rounded-full opacity-40 animate-ping" style="background-color: ${color};"></span>
        <div class="relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shadow-md text-white" style="background-color: ${color};">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${svg}</svg>
        </div>
        ${numberBadge}
      </div>
    `;

    return L.divIcon({
      html: htmlContent,
      className: 'custom-div-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  };

  // Map Initialization
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    const L = require('leaflet');

    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        scrollWheelZoom: false,
      }).setView([centerLat, centerLng], zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Sync zoom and center from props
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setView([centerLat, centerLng], zoom);
  }, [centerLat, centerLng, zoom]);

  // Intercept click on popup link to use Next.js SPA navigation
  useEffect(() => {
    const handlePopupClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('.map-popup-link');
      if (link) {
        e.preventDefault();
        const url = link.getAttribute('data-url');
        if (url) {
          router.push(url);
        }
      }
    };

    const container = mapContainerRef.current;
    if (container) {
      container.addEventListener('click', handlePopupClick);
    }
    return () => {
      if (container) {
        container.removeEventListener('click', handlePopupClick);
      }
    };
  }, [router]);

  // Update Markers when pins or language changes
  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined') return;

    const L = require('leaflet');

    // Remove old markers
    Object.values(markersRef.current).forEach((marker: any) => marker.remove());
    markersRef.current = {};

    // Add new markers
    pins.forEach((pin) => {
      const popupData = pin.popupData;
      
      const popupHtml = `
        <div class="w-48 font-sans" style="margin: -4px -4px;">
          ${popupData.imageUrl ? `
            <div style="height: 100px; width: 100%; overflow: hidden; border-radius: 8px 8px 0 0; background-color: #F4F1DE; margin-bottom: 8px;">
              <img src="${popupData.imageUrl}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
          ` : ''}
          <div style="padding: ${popupData.imageUrl ? '0 10px 10px 10px' : '10px'};">
            <h4 style="font-family: inherit; font-weight: 700; color: #264653; font-size: 13px; margin: 0; line-height: 1.3;">${popupData.title}</h4>
            ${popupData.subtitle ? `<p style="font-family: inherit; color: #4B5563; font-size: 11px; margin: 4px 0 0 0; line-height: 1.4; font-weight: 300;">${popupData.subtitle}</p>` : ''}
            <a href="${popupData.linkUrl}" class="map-popup-link" data-url="${popupData.linkUrl}" style="display: block; width: 100%; text-align: center; padding: 6px 0; background-color: #DDA15E; color: #264653; font-weight: 700; font-size: 10px; border-radius: 6px; text-decoration: none; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 10px; transition: background-color 0.2s;">
              ${popupData.linkText}
            </a>
          </div>
        </div>
      `;

      const marker = L.marker([pin.latitude, pin.longitude], {
        icon: getMarkerIcon(L, pin),
      })
        .addTo(mapRef.current)
        .bindPopup(popupHtml, {
          maxWidth: 240,
          minWidth: 200,
        });

      if (onPinClick) {
        marker.on('click', () => {
          onPinClick(pin.id);
        });
      }

      markersRef.current[pin.id] = marker;
    });

    // Auto fit bounds if center is not explicitly specified, or pins are active
    if (pins.length > 0 && !centerLat) {
      const group = L.featureGroup(Object.values(markersRef.current));
      mapRef.current.fitBounds(group.getBounds().pad(0.15));
    }
  }, [pins, language]);

  // Draw / update route polylines
  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined') return;
    const L = require('leaflet');

    // Clear previous routes
    routeLayersRef.current.forEach((layer: any) => layer.remove());
    routeLayersRef.current = [];

    (routes || []).forEach((route) => {
      if (!route.coordinates || route.coordinates.length < 2) return;
      const poly = L.polyline(route.coordinates, {
        color: route.color || ROUTE_COLOR,
        weight: 4,
        opacity: 0.85,
        lineJoin: 'round',
        lineCap: 'round',
      }).addTo(mapRef.current);
      routeLayersRef.current.push(poly);
    });
  }, [routes]);

  // Handle active pin highlight/open popup
  useEffect(() => {
    if (!mapRef.current || !activePinId) return;
    const activeMarker = markersRef.current[activePinId];
    if (activeMarker) {
      activeMarker.openPopup();
      // Center map slightly offset for mobile view
      const latlng = activeMarker.getLatLng();
      mapRef.current.panTo(latlng);
    }
  }, [activePinId]);

  return (
    <div className="relative w-full h-full min-h-[350px] md:min-h-full rounded-2xl overflow-hidden border border-bone/60 shadow-inner">
      <div ref={mapContainerRef} className="w-full h-full z-10" />
    </div>
  );
}
