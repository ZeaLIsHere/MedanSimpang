'use client';

import { useSyncExternalStore } from 'react';

type NetworkInformation = EventTarget & {
  effectiveType?: string;
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
};

function getConnection() {
  if (typeof navigator === 'undefined') return undefined;
  const browserNavigator = navigator as NavigatorWithConnection;
  return browserNavigator.connection ?? browserNavigator.mozConnection ?? browserNavigator.webkitConnection;
}

function getSnapshot() {
  const connection = getConnection();
  return Boolean(
    connection?.saveData ||
      connection?.effectiveType === 'slow-2g' ||
      connection?.effectiveType === '2g'
  );
}

function subscribe(onStoreChange: () => void) {
  const connection = getConnection();
  connection?.addEventListener('change', onStoreChange);
  return () => connection?.removeEventListener('change', onStoreChange);
}

export default function useConstrainedNetwork() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
