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

interface MedanMapProps {
  pins: MapPinData[];
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
  activePinId?: string;
  onPinClick?: (id: string) => void;
  language: 'id' | 'en';
}

export default function MedanMap({
  pins,
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

  // Helper to generate marker icon color & style
  const getMarkerIcon = (L: any, pin: MapPinData) => {
    let color = '#2A9D8F'; // Default Sage Green for Walks
    if (pin.category) {
      if (pin.category === 'iSee') color = '#1E6B65';
      if (pin.category === 'iEat') color = '#E76F51';
      if (pin.category === 'iDrink') color = '#F4A261';
      if (pin.category === 'iSurprise') color = '#457B9D';
    }

    const htmlContent = pin.order
      ? `
        <div class="relative flex items-center justify-center">
          <span class="absolute inline-flex h-7 w-7 rounded-full opacity-60 animate-ping" style="background-color: ${color};"></span>
          <div class="relative flex items-center justify-center w-7 h-7 rounded-full border-2 border-white shadow-md text-white font-bold text-xs" style="background-color: ${color};">
            ${pin.order}
          </div>
        </div>
      `
      : `
        <div class="relative flex items-center justify-center">
          <span class="absolute inline-flex h-8 w-8 rounded-full opacity-55 animate-ping" style="background-color: ${color};"></span>
          <div class="relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-white shadow-lg text-white" style="background-color: ${color};">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
        </div>
      `;

    return L.divIcon({
      html: htmlContent,
      className: 'custom-div-icon',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14],
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
